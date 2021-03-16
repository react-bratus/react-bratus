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
  constructor(sourcePath: string) {
    this.path = sourcePath;

    this.getFilesAndDirectories().then(async (files) => {
      const graph = new Graph();
      for (let i = 0; i < files.length; i++) {
        if (!files[i].includes('stories')) {
          const parsedFile = await this.parseFile(files[i]);
          if (parsedFile.hasComponents()) {
            this.parsedFiles.push(parsedFile);
            this.components.push(...parsedFile.components);
            graph.addNodes(parsedFile.components);
          }
        }
      }

      fs.writeFileSync(this.path + '/../graphData.json', graph.toString());
    });
  }

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

  private async parseFile(path: string): Promise<ParsedFile> {
    return new Promise((resolve, reject) => {
      const parsedFile: ParsedFile = new ParsedFile(path);
      let component: Component = new Component(path);
      let jsxElement: JSXElement = new JSXElement(path);
      let attribute: Attribute = new Attribute();
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
          JSXOpeningElement({ node }) {
            if (jsxElement.isUndefined()) {
              console.log(`Open Element: ${node.type}`);
              jsxElement.open(node);
            }
          },
          JSXAttribute({ node }) {
            if (attribute.isUndefined()) {
              console.log(`Open Attribute: ${node.type}`);
              attribute.open(node);
            }
          },
          JSXIdentifier({ node }) {
            if (jsxElement.isOpen() && !jsxElement.isIdentified()) {
              console.log(`Identify Element: ${node.name}`);
              jsxElement.identify(node);
            }
            if (attribute.isOpen() && !attribute.isIdentified()) {
              console.log(`Identify Attribute: ${node.name}`);
              attribute.identify(node);
            }
          },
          JSXExpressionContainer({ node }) {
            if (attribute.isOpen() && attribute.isIdentified()) {
              if (node.expression.type === 'Identifier') {
                console.log(`Set value of attribute: ${node.type}`);
                attribute.setValue(node.expression.name);
              }
            }
          },
          StringLiteral({ node }) {
            if (attribute.isOpen() && attribute.isIdentified()) {
              console.log(`Set value of attributet: ${node.type}`);
              attribute.setValue(node.value);
            }
          },
          exit({ node }) {
            if (
              (node.type == 'VariableDeclaration' ||
                node.type == 'FunctionDeclaration' ||
                node.type == 'ClassDeclaration') &&
              node == component.getNode()
            ) {
              console.log(`Close component: ${node.type}`);
              if (component.hasJSX()) {
                parsedFile.components.push(component);
              }

              component = new Component(path);
            }

            if (
              node.type == 'JSXOpeningElement' &&
              node == jsxElement.getNode()
            ) {
              console.log(`Close element: ${node.type}`);
              component.addJSXElement(jsxElement);
              jsxElement = new JSXElement(path);
            }

            if (node.type == 'JSXAttribute' && node == attribute.getNode()) {
              console.log(`Close attribute: ${node.type}`);
              jsxElement.addAttribute(attribute);
              attribute = new Attribute();
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
