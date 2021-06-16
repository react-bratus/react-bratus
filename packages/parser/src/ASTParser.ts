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
interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

class ASTParser {
  private componentMap: Map<string, Component> = new Map();
  private options: ParserOptions;
  private static log = false;

  constructor(options: ParserOptions) {
    this.options = options;
    ASTParser.log = options.log;
    console.log(
      `[Info] Parser initialized with path: ${this.options.rootFolderPath}`
    );
  }

  public parse(): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[Info] Parsing project`);
      this.getFilesAndDirectories().then(async (files) => {
        ASTParser.logEntry(`[Info] Traversing files: [${files.join(',\n')}]`);
        for (let i = 0; i < files.length; i++) {
          // Fix to avoid parsing Storybook files
          if (!files[i].includes('stories')) {
            if (fs.existsSync(files[i]) && fs.lstatSync(files[i]).isFile()) {
              const parsedFile = await this.parseFile(files[i]);
              if (parsedFile.hasComponents()) {
                parsedFile.components.forEach((component) => {
                  const componentName = component.getElementName();
                  if (!this.componentMap.has(componentName)) {
                    ASTParser.logEntry(
                      `[Info] Adding component: ${componentName}`
                    );
                    this.componentMap.set(componentName, component);
                  } else {
                    console.log(
                      `[Warning] A component with the name ${componentName} already exist. The component ${componentName} at ${files[
                        i
                      ].substr(
                        this.options.rootFolderPath.length,
                        files[i].length - this.options.rootFolderPath.length
                      )} is not included`
                    );
                  }
                });
              }
            }
          }
        }
        const graph = new Graph(this.componentMap);
        console.log(`[Info] Parsing finished`);
        graph.build(this.options.rootComponents);
        console.log(`[Info] Building graph finished`);

        await this.writeDataToFile(graph.toString());
        resolve();
      });
    });
  }
  private writeDataToFile(graphData: string): void {
    console.log(
      `[Info] Writing data to ${this.options.pathToSaveDir}/data.json`
    );
    const dir = this.options.pathToSaveDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '/data.json', graphData);
  }

  public getFilesAndDirectories(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob.glob(
        this.options.rootFolderPath + '/**/*.{js,jsx,tsx}',
        (err: any, res: any) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }

  public static peek<T>(array: T[]): T {
    return array[array.length - 1];
  }

  private async parseFile(path: string): Promise<ParsedFile> {
    ASTParser.logEntry(`[Info] Parsing file: ${path}`);
    return new Promise((resolve, reject) => {
      try {
        const fileContent: string = fs.readFileSync(path, 'utf8');
        const ast = parse(fileContent, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        });
        const parsedFile: ParsedFile = new ParsedFile(path);
        let component: Component = new Component(path, fileContent);
        const elements: JSXElement[] = [new JSXElement(path)];
        const attributes: Attribute[] = [new Attribute()];
        let ifStatementLevel = 0;
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
                ASTParser.logEntry(`[Info] Import added to component: ${name}`);
                component.addImport(new Import(alias, name, modulePath));
              }
            });
          },
          ClassDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntry(`[Info] Open component by ClassDeclaration`);
              component.open(node);
            }
          },
          VariableDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntry(
                `[Info] Open component by VariableDeclaration`
              );
              component.open(node);
            }
          },
          FunctionDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntry(
                `[Info] Open component by FunctionDeclaration`
              );
              component.open(node);
            }
          },
          Identifier({ node }) {
            if (component.isOpen() && !component.isIdentified()) {
              ASTParser.logEntry(`[Info] Identify component ${node.name}`);
              component.identify(node);
            }
          },
          IfStatement() {
            ASTParser.logEntry(
              `[Info] Increment level of depth in if statement: ${ifStatementLevel}`
            );
            ifStatementLevel++;
          },
          JSXOpeningElement({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isUndefined()) {
              ASTParser.logEntry(`[Info] Open jsxElement`);
              jsxElement.open(node);
            } else {
              if (
                jsxElement.isRoute() &&
                attribute.getElementName() == 'render'
              ) {
                ASTParser.logEntry(
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
              ASTParser.logEntry(`[Info] Open Attribute`);
              attribute.open(node);
            } else {
              ASTParser.logEntry(`[Info] Open Attribute`);
              const newAttribute = new Attribute();
              newAttribute.open(node);
              attributes.push(newAttribute);
            }
          },
          JSXIdentifier({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
              ASTParser.logEntry(`[Info] Identify jsxElement ${node.name}`);
              jsxElement.identify(node);
            } else if (attribute.isOpen() && !attribute.isIdentified()) {
              ASTParser.logEntry(`[Info] Identify Attribute ${node.name}`);
              attribute.identify(node);
            }
          },
          JSXExpressionContainer({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (attribute.isOpen() && attribute.isIdentified()) {
              if (node.expression.type === 'Identifier') {
                ASTParser.logEntry(`[Info] Set value of Attribute`);
                attribute.setValue(node.expression.name);
                if (
                  jsxElement.isRoute() &&
                  attribute.getElementName() == 'component'
                ) {
                  ASTParser.logEntry(`[Info] Set name of Route element`);
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
              ASTParser.logEntry(`[Info] Set value of Attribute`);
              attribute.setValue(node.value);
              if (
                jsxElement.isOpen() &&
                jsxElement.isRoute() &&
                attribute.getElementName() == 'path'
              ) {
                ASTParser.logEntry(`[Info] Set path of Route element`);
                jsxElement.routePath = attribute.getValue();
              }
            }
          },
          exit({ node }) {
            if (component.close(node)) {
              if (component.hasJSX()) {
                ASTParser.logEntry(
                  `[Info] Close component: ${component.getElementName()}`
                );
                parsedFile.components.push(component);
              }
              component = new Component(path, fileContent);
            }

            const jsxElement = ASTParser.peek(elements);
            if (jsxElement.close(node)) {
              ASTParser.logEntry(
                `[Info] Close Element: ${jsxElement.getElementName()}`
              );
              jsxElement.setOptional(ifStatementLevel > 0);
              component.addJSXElement(jsxElement);
              elements.pop();
              if (elements.length === 0) elements.push(new JSXElement(path));
            }

            const attribute = ASTParser.peek(attributes);
            if (attribute.close(node)) {
              ASTParser.logEntry(
                `[Info] Close Attribute: ${attribute.getElementName()}`
              );
              if (jsxElement.isOpen()) {
                jsxElement.addAttribute(attribute);
              }
              attributes.pop();
              if (attributes.length === 0) attributes.push(new Attribute());
            }

            if (node.type == 'IfStatement') {
              ASTParser.logEntry(
                `[Info] Reduce level of depth in if statement: ${ifStatementLevel}`
              );
              ifStatementLevel--;
            }

            if (node.type == 'Program') {
              ASTParser.logEntry(
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
  public static logEntry(logEntry: string): void {
    if (ASTParser.log) {
      console.log(logEntry);
    }
  }
}

export default ASTParser;
