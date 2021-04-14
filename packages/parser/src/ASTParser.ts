/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import * as glob from 'glob';
import * as _path from 'path';

import Attribute from './Builder/Attribute';
import Component from './Builder/Component';
import Import from './Builder/Import';
import JSXElement from './Builder/JSXElement';
import ParsedFile from './Builder/ParsedFile';
import Graph from './Graph/Graph';

class ASTParser {
  private path: string;
  private componentMap: Map<string, Component> = new Map();
  private static log = false;

  // Should be "path_to_project/src"
  // TODO: Being able to point at root component. Default App
  constructor(sourcePath: string, log: boolean) {
    this.path = sourcePath;
    ASTParser.log = log;
    ASTParser.logEntryToFile(
      `[Info] ASTParser initialized with path: ${this.path}`
    );
  }

  public compile(): void {
    ASTParser.logEntryToFile(`[INFO] Parsing project`);
    this.getFilesAndDirectories().then(async (files) => {
      ASTParser.logEntryToFile(
        `[Info] Traversing files: [${files.join(',\n')}]`
      );
      for (let i = 0; i < files.length; i++) {
        // TODO: Being able to exclude files in GLOB pattern
        if (!files[i].includes('stories')) {
          const parsedFile = await this.parseFile(files[i]);
          if (parsedFile.hasComponents()) {
            parsedFile.components.forEach((component) => {
              const componentName = component.getElementName();
              if (!this.componentMap.has(componentName)) {
                ASTParser.logEntryToFile(
                  `[Info] Adding component: ${componentName}`
                );
                this.componentMap.set(componentName, component);
              } else {
                ASTParser.logEntryToFile(
                  `[Warning] A duplicate component found which was not added: ${componentName}`
                );
              }
            });
          }
        }
      }
      const graph = new Graph(this.componentMap);
      ASTParser.logEntryToFile(`[Info] Traversal finished`);
      graph.build();

      this.writeDataToFile(graph.toString());
    });
  }
  private writeDataToFile(graphData: string): void {
    ASTParser.logEntryToFile(`[Info] Writing data to .react-bratus/data.json`);
    const dir = this.path + '/../.react-bratus';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '/data.json', graphData);
  }

  // TODO: Being able to exclude files in GLOB pattern
  public getFilesAndDirectories(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob.glob(this.path + '/**/*.{js,jsx,tsx}', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public static peek<T>(array: T[]): T {
    return array[array.length - 1];
  }

  private async parseFile(path: string): Promise<ParsedFile> {
    ASTParser.logEntryToFile(`[Info] Parsing file: ${path}`);
    return new Promise((resolve, reject) => {
      const parsedFile: ParsedFile = new ParsedFile(path);
      let component: Component = new Component(path);
      const elements: JSXElement[] = [new JSXElement(path)];
      const attributes: Attribute[] = [new Attribute()];
      let ifStatementLevel = 0;

      try {
        const fileContent: string = fs.readFileSync(path, 'utf8');
        const ast = parse(fileContent, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        });
        traverse(ast, {
          ImportDeclaration({ node }) {
            const modulePath = node.source.value;
            node.specifiers.forEach((specifier) => {
              const alias = specifier.local.name;
              let name;
              switch (specifier.type) {
                case 'ImportSpecifier':
                  name =
                    specifier.imported.type === 'Identifier'
                      ? specifier.imported.name
                      : 'No name';
                  break;
                case 'ImportDefaultSpecifier':
                  name = 'default';
                  break;
                case 'ImportNamespaceSpecifier':
                  name = '*';
                  break;
              }
              if (name) {
                ASTParser.logEntryToFile(
                  `[Info] Import added to component: ${name}`
                );
                component.addImport(new Import(alias, name, modulePath));
              }
            });
          },
          ClassDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntryToFile(
                `[Info] Open component by ClassDeclaration`
              );
              component.open(node);
            }
          },
          VariableDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntryToFile(
                `[Info] Open component by VariableDeclaration`
              );
              component.open(node);
            }
          },
          FunctionDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntryToFile(
                `[Info] Open component by FunctionDeclaration`
              );
              component.open(node);
            }
          },
          Identifier({ node }) {
            if (component.isOpen() && !component.isIdentified()) {
              ASTParser.logEntryToFile(`[Info] Identify component`);
              component.identify(node);
            }
          },
          IfStatement() {
            ASTParser.logEntryToFile(
              `[Info] Increment level of depth in if statement: ${ifStatementLevel}`
            );
            ifStatementLevel++;
          },
          JSXOpeningElement({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isUndefined()) {
              ASTParser.logEntryToFile(`[Info] Open jsxElement`);
              jsxElement.open(node);
            } else {
              if (
                jsxElement.isRoute() &&
                attribute.getElementName() == 'render'
              ) {
                ASTParser.logEntryToFile(
                  `[Info] Open jsxElement within render attribute. Resetting identifier`
                );
                jsxElement.open(node);
                jsxElement.isRouteElement = true;
                jsxElement.resetIdentifier();
              }
            }
          },
          JSXAttribute({ node }) {
            const attribute = ASTParser.peek(attributes);
            if (attribute.isUndefined()) {
              ASTParser.logEntryToFile(`[Info] Open Attribute`);
              attribute.open(node);
            } else {
              ASTParser.logEntryToFile(`[Info] Open Attribute`);
              const newAttribute = new Attribute();
              newAttribute.open(node);
              attributes.push(newAttribute);
            }
          },
          JSXIdentifier({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
              ASTParser.logEntryToFile(`[Info] Identify jsxElement`);
              jsxElement.identify(node);
            } else if (attribute.isOpen() && !attribute.isIdentified()) {
              ASTParser.logEntryToFile(`[Info] Identify Attribute`);
              attribute.identify(node);
            }
          },
          JSXExpressionContainer({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (attribute.isOpen() && attribute.isIdentified()) {
              if (node.expression.type === 'Identifier') {
                ASTParser.logEntryToFile(`[Info] Set value of Attribute`);
                attribute.setValue(node.expression.name);
                if (
                  jsxElement.isRoute() &&
                  attribute.getElementName() == 'component'
                ) {
                  ASTParser.logEntryToFile(`[Info] Set name of Route element`);
                  jsxElement.setName(attribute.getValue());
                  jsxElement.isRouteElement = true;
                }
              }
            }
          },
          StringLiteral({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (attribute.isOpen() && attribute.isIdentified()) {
              ASTParser.logEntryToFile(`[Info] Set value of Attribute`);
              attribute.setValue(node.value);
              if (
                jsxElement.isRoute() &&
                attribute.getElementName() == 'path'
              ) {
                ASTParser.logEntryToFile(`[Info] Set path of Route element`);
                jsxElement.routePath = attribute.getValue();
              }
            }
          },
          exit({ node }) {
            if (component.close(node)) {
              if (component.hasJSX()) {
                ASTParser.logEntryToFile(
                  `[Info] Close component: ${component.getElementName()}`
                );
                parsedFile.components.push(component);
              }
              component = new Component(path);
            }

            const jsxElement = ASTParser.peek(elements);
            if (jsxElement.close(node)) {
              ASTParser.logEntryToFile(
                `[Info] Close Element: ${jsxElement.getElementName()}`
              );
              jsxElement.setOptional(ifStatementLevel > 0);
              component.addJSXElement(jsxElement);
              elements.pop();
              if (elements.length === 0) elements.push(new JSXElement(path));
            }

            const attribute = ASTParser.peek(attributes);
            if (attribute.close(node)) {
              ASTParser.logEntryToFile(
                `[Info] Close Attribute: ${attribute.getElementName()}`
              );
              if (jsxElement.isOpen()) {
                jsxElement.addAttribute(attribute);
              }
              attributes.pop();
              if (attributes.length === 0) attributes.push(new Attribute());
            }

            if (node.type == 'IfStatement') {
              ASTParser.logEntryToFile(
                `[Info] Reduce level of depth in if statement: ${ifStatementLevel}`
              );
              ifStatementLevel--;
            }

            if (node.type == 'Program') {
              ASTParser.logEntryToFile(
                `[Info] Finish parsing file: ${parsedFile.path}`
              );
              resolve(parsedFile);
            }
          },
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  public static logEntryToFile(logEntry: string): void {
    if (ASTParser.log) {
      console.log(logEntry);
    }
  }
}

export default ASTParser;
