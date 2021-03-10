/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import * as glob from 'glob';
import * as _path from 'path';

class ReactComponent {
  public type: any = null;
  public identifier: any = null;
  public jsxElements: any[] = [];
  public path: string | null = null;

  public hasJSX(): boolean {
    return this.jsxElements.length > 0;
  }

  public printRelatedComponents(): void {
    this.jsxElements.forEach((element) => {
      console.log(element.name.name);
    });
  }

  public toString(): string {
    let objectString = `${this.identifier.name} = {\n`;

    objectString += `  path: ${this.path},\n`;
    objectString += `  definedBy: ${this.type.type},\n`;
    objectString += `  elements: [\n`;
    this.jsxElements.forEach((element) => {
      objectString += `    ${element.name.name},\n`;
    });
    objectString += `  ]\n`;
    objectString += `}\n`;
    return objectString;
  }
}

class ASTParser {
  private path: string;
  public parsedFiles: any[] = [];

  constructor(sourcePath: string) {
    this.path = sourcePath;
    this.getFilesAndDirectories().then(async (files) => {
      for (let i = 0; i < files.length; i++) {
        const parsedFile = await this.parseFile(files[i]);
        this.parsedFiles.push(parsedFile);
      }
      this.parsedFiles.forEach((parsedFile) => {
        parsedFile.components.forEach((component: ReactComponent) => {
          console.log(component.toString());
        });
      });
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

  private async parseFile(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const parsedFile: any = {
        path: file,
        imports: [],
        components: [],
        exports: [],
      };
      let currentObject: ReactComponent = new ReactComponent();
      try {
        const fileContent: any = fs.readFileSync(file, 'utf8');
        const ast: any = parse(fileContent, {
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
