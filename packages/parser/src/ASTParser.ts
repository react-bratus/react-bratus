/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import * as glob from 'glob';
import * as _path from 'path';

import Graph from './Models/Graph';
import ParsedFile from './Models/ParsedFile';
import ReactComponent from './Models/ReactComponent';

class ASTParser {
  private path: string;
  public parsedFiles: ParsedFile[] = [];

  constructor(sourcePath: string) {
    this.path = sourcePath;
    this.getFilesAndDirectories().then(async (files) => {
      const allComponents: ReactComponent[] = [];
      for (let i = 0; i < files.length; i++) {
        const parsedFile = await this.parseFile(files[i]);
        console.log(parsedFile);
        if (parsedFile.hasComponents()) {
          this.parsedFiles.push(parsedFile);
          allComponents.push(...parsedFile.components);
        }
      }
      const graph: Graph = new Graph(allComponents);
      fs.writeFileSync(`${process.cwd()}/graphData.json`, graph.toString());
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

  private async parseFile(file: string): Promise<ParsedFile> {
    return new Promise((resolve, reject) => {
      const parsedFile: ParsedFile = new ParsedFile(file);
      let currentObject: ReactComponent = new ReactComponent();
      try {
        const fileContent: string = fs.readFileSync(file, 'utf8');
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
                parsedFile.imports.push({
                  alias,
                  name,
                  source: modulePath,
                });
              }
            });
          },
          ClassDeclaration({ node }) {
            if (!currentObject.type) {
              console.log('Open ClassDeclaration');
              currentObject.type = node;
            }
          },
          VariableDeclaration({ node }) {
            if (!currentObject.type) {
              console.log('Open VariableDeclaration');
              currentObject.type = node;
            }
          },
          FunctionDeclaration({ node }) {
            if (!currentObject.type) {
              console.log('Open FunctionDeclaration');
              currentObject.type = node;
            }
          },
          Identifier({ node }) {
            if (currentObject.type && !currentObject.identifier) {
              console.log('Identify currentObject: ', node.name);
              currentObject.identifier = node;
            }
          },
          JSXOpeningElement({ node }) {
            if (currentObject.type) {
              console.log('Add JSX Element');
              currentObject.jsxElements.push(node);
            }
          },
          exit({ node }) {
            if (
              (node.type == 'VariableDeclaration' ||
                node.type == 'FunctionDeclaration' ||
                node.type == 'ClassDeclaration') &&
              node == currentObject.type
            ) {
              console.log('Close' + node.type);
              currentObject.path = file;
              if (currentObject.hasJSX())
                parsedFile.components.push(currentObject);
              currentObject = new ReactComponent();
            }

            if (node.type == 'Program') {
              console.log('Close' + node.type);
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
