/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import * as glob from 'glob';
import * as _path from 'path';

import Attribute from './Models/Attribute';
import Component from './Models/Component';
import Graph from './Models/Graph';
import JSXElement from './Models/JSXElement';
import ParsedFile from './Models/ParsedFile';

class ASTParser {
  private path: string;
  public parsedFiles: ParsedFile[] = [];
  public components: Component[] = [];

  // Should be "path_to_project/src"
  // TODO: Being able to point at root component. Default App
  constructor(sourcePath: string) {
    this.path = sourcePath;

    this.getFilesAndDirectories().then(async (files) => {
      const graph = new Graph();
      for (let i = 0; i < files.length; i++) {
        // TODO: Being able to exclude files in GLOB pattern
        if (!files[i].includes('stories')) {
          const parsedFile = await this.parseFile(files[i]);
          if (parsedFile.hasComponents()) {
            this.parsedFiles.push(parsedFile);
            this.components.push(...parsedFile.components);
            graph.addNodes(parsedFile.components);
          }
        }
      }
      graph.createEdges();
      fs.writeFileSync(this.path + '/../graphData.json', graph.toString());
    });
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
    return new Promise((resolve, reject) => {
      const parsedFile: ParsedFile = new ParsedFile(path);
      let component: Component = new Component(path);
      const elements: JSXElement[] = [new JSXElement(path)];
      const attributes: Attribute[] = [new Attribute()];
      let inIfStatement = false;

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
                component.addImport({
                  alias,
                  name,
                  source: modulePath,
                });
              }
            });
          },
          ClassDeclaration({ node }) {
            if (component.isUndefined()) {
              console.log(`Open component: ${node.type}`);
              component.open(node);
            }
          },
          VariableDeclaration({ node }) {
            if (component.isUndefined()) {
              console.log(`Open component: ${node.type}`);
              component.open(node);
            }
          },
          FunctionDeclaration({ node }) {
            if (component.isUndefined()) {
              console.log(`Open component: ${node.type}`);
              component.open(node);
            }
          },
          Identifier({ node }) {
            if (component.isOpen() && !component.isIdentified()) {
              console.log(`Identify component: ${node.name}`);
              component.identify(node);
            }
          },
          IfStatement({ node }) {
            console.log('open if: ', node.type);
            inIfStatement = true;
          },
          JSXOpeningElement({ node }) {
            const jsxElement = ASTParser.peek(elements);
            if (jsxElement.isUndefined()) {
              console.log(`Open Element: ${node.type}`);
              jsxElement.open(node);
            } else {
              const newElement = new JSXElement(path);
              newElement.open(node);
              elements.push(newElement);
            }
          },
          JSXAttribute({ node }) {
            const attribute = ASTParser.peek(attributes);

            if (attribute.isUndefined()) {
              console.log(`Open Attribute: ${node.type}`);
              attribute.open(node);
            } else {
              const newAttribute = new Attribute();
              newAttribute.open(node);
              attributes.push(newAttribute);
            }
          },
          JSXIdentifier({ node }) {
            if (elements.length > 1) {
              console.log(elements);
            }
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
              console.log(`Identify Element: ${node.name}`);
              jsxElement.identify(node);
            } else if (attribute.isOpen() && !attribute.isIdentified()) {
              console.log(`Identify Attribute: ${node.name}`);
              attribute.identify(node);
            }
          },
          JSXExpressionContainer({ node }) {
            const attribute = ASTParser.peek(attributes);
            if (attribute.isOpen() && attribute.isIdentified()) {
              if (node.expression.type === 'Identifier') {
                console.log(`Set value of attribute: ${node.type}`);
                attribute.setValue(node.expression.name);
              }
            }
          },
          StringLiteral({ node }) {
            const attribute = ASTParser.peek(attributes);
            if (attribute.isOpen() && attribute.isIdentified()) {
              console.log(`Set value of attributet: ${node.type}`);
              attribute.setValue(node.value);
            }
          },
          exit({ node }) {
            if (component.close(node)) {
              console.log(`Close component: ${node.type}`);
              parsedFile.components.push(component);
              component = new Component(path);
            }
            const jsxElement = ASTParser.peek(elements);
            if (jsxElement.close(node)) {
              console.log(`Close element: ${node.type}`);
              jsxElement.setOptional(inIfStatement);
              component.addJSXElement(jsxElement);
              console.log(`Pop: ${jsxElement.getElementName()}`);
              elements.pop();
              if (elements.length === 0) elements.push(new JSXElement(path));
            }

            const attribute = ASTParser.peek(attributes);
            if (attribute.close(node)) {
              console.log(`Close attribute: ${node.type}`);
              jsxElement.addAttribute(attribute);
              attributes.pop();
              if (attributes.length === 0) attributes.push(new Attribute());
            }

            if (node.type == 'IfStatement') {
              console.log('Close if:');
              inIfStatement = false;
            }

            if (node.type == 'Program') {
              resolve(parsedFile);
            }
          },
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default ASTParser;
