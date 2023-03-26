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
import { ParserOptions } from '../api/ParserConfiguration';

class ASTParser {
  private componentMap: Map<string, Component> = new Map();
  private options: ParserOptions;
  private static log = false;

  constructor(options: ParserOptions) {
    this.options = options;
    ASTParser.log = options.log;
    console.log(
      `[ASTParser] Parser initialized with path: ${this.options.rootFolderPath}`
    );
  }

  public async parse(): Promise<void> {
    const isNextProject = await this.identifyIfIsNextProject();

    return new Promise((resolve) => {
      console.log(`[ASTParser] Parsing project`);

      isNextProject &&
        console.log(
          `[ASTParser] I can see it is a Next.js project. If not, please submit an issue under the Repo`
        );

      this.getFilesAndDirectories().then(async (files) => {
        // console.log('logging everything', files);
        ASTParser.logEntry(
          `[ASTParser] Traversing files: [${files.join(',\n')}]`
        );
        for (let i = 0; i < files.length; i++) {
          // Fix to avoid parsing Storybook files
          if (!files[i].includes('stories')) {
            if (fs.existsSync(files[i]) && fs.lstatSync(files[i]).isFile()) {
              const parsedFile = await this.parseFile(files[i]);
              // console.log('parsedFile', parsedFile);
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

        const componentRootsArray = this.getApplicationRoots(
          isNextProject,
          this.componentMap
        );

        const graph = new Graph(this.componentMap);

        console.log(`[ASTParser] Parsing finished`);

        graph.build(componentRootsArray);

        console.log(`[Graph Builder] Building graph finished`);

        this.writeDataToFile(graph.toString());
        resolve();
      });
    });
  }

  /**
   * The function responsible for saving the graph data to the data.json file.
   * @param graphData Graph data represented by a string
   */
  private writeDataToFile(graphData: string): void {
    const path = this.options.pathToSaveDir;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      console.log('[ASTParser] Creating the .react-bratus folder.');
    }
    fs.writeFileSync(`${path}/data.json`, graphData);
    console.log(
      `[ASTParser] Writing data to ${this.options.pathToSaveDir}/data.json`
    );
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

  public getPackageJsonPath(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob.glob(
        `${process.cwd()}` + '/**/package.json',
        (err: any, res: any) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }

  public async identifyIfIsNextProject(): Promise<boolean> {
    /**
     * Get the path of the package.json file, pass it as an argument in order to read the file.
     * Returns a boolean, to use as a condition checker and evaluate if next exists in the dependencies.
     */
    const readPackageContent = this.getPackageJsonPath().then(
      async (path: string[]) => {
        // const isNextFramework = false;

        const packageJsonFile = await JSON.parse(
          fs.readFileSync(path[0], 'utf8')
        );

        return packageJsonFile;
      }
    );

    const identifyIfNextIsInPackageJSON: Promise<boolean> =
      readPackageContent.then((packageContent) => {
        let isNextFramework = false;

        const dependencies =
          packageContent.dependencies || packageContent.devDependencies;

        if (packageContent) {
          if (dependencies) {
            Object.keys(dependencies).forEach((dependency) => {
              if (dependency.match(/^next$/)) {
                isNextFramework = true;
              }
            });
          }
        }

        return isNextFramework;
      });

    return identifyIfNextIsInPackageJSON;
  }

  /**
   * The characteristic of Next.JS applications is that they don't have a single entrypoint (App),
   * but multiple ones. Thus, we need to identify the pages, which is the convention, and identify the
   * roots that are the entrypoints of the application. If @param {isNextProject} is false, and therefore
   * it is not a Next.JS application, then we search for a single entry point like in every React app.
   */
  public getApplicationRoots(
    isNextProject: boolean,
    componentMap: Map<string, Component>
  ): string[] {
    const nextJSPagesArray: string[] = [];
    let nextJsProjectHasPages = false;

    if (isNextProject) {
      const componentIterators = componentMap[Symbol.iterator]();

      // For every file, get its path and identify if it is a page or not.
      for (const iterator of componentIterators) {
        // We use [1], as we need to access the 2nd key from the iterator object.
        const path = iterator[1].getPath();

        // Get component names of NextJS pages.
        if (path.includes('pages/')) {
          nextJSPagesArray.push(iterator[1].getElementName());
        }
      }

      if (nextJSPagesArray.length > 0) {
        nextJsProjectHasPages = true;
      }
    }

    if (isNextProject && nextJsProjectHasPages) {
      return nextJSPagesArray;
    } else {
      const mappedComponentNamesToArray = [...this.componentMap.keys()];
      const rootComponents = this.options.rootComponents;
      rootComponents.push(mappedComponentNamesToArray[0]);
      return rootComponents;
    }
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
        const ifStatementLevel = 0;
        let isConditional = false;
        let conditionKind = '';
        let conditionIdentifier = '';

        // Beginning of the traverse function:

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
              ASTParser.logEntry('[Info] Open component by ClassDeclaration');
              component.open(node);
            }
          },
          VariableDeclaration({ node }) {
            if (component.isUndefined()) {
              ASTParser.logEntry(
                '[Info] Open component by VariableDeclaration'
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
            if (isConditional && conditionIdentifier == '') {
              conditionIdentifier = conditionIdentifier + '.' + node.name;
              ASTParser.logEntry(
                `[Parser] Found first condition identifier: ${node.name}`
              );
            }
          },
          IfStatement() {
            ASTParser.logEntry(
              `[Info] Increment level of depth in if statement: ${ifStatementLevel}`
            );
            isConditional = true;
            conditionKind = '[IF]';
          },
          LogicalExpression() {
            ASTParser.logEntry(
              `[Info] Conditional rendering by '&&' found for this componenet.`
            );
            isConditional = true;
            conditionKind = '[&&]';
          },
          ConditionalExpression() {
            ASTParser.logEntry(
              `[Info] Conditional rendering by a ternary operator found for this componenet.`
            );
            isConditional = true;
            conditionKind = '[?:]';
          },
          JSXOpeningElement({ node }) {
            const jsxElement = ASTParser.peek(elements);
            const attribute = ASTParser.peek(attributes);
            if (jsxElement.isUndefined()) {
              ASTParser.logEntry(`[Info] Open jsxElement`);
              jsxElement.open(node);
            } else {
              if (node.name.type === 'JSXIdentifier') {
                if (
                  jsxElement.isRoute() &&
                  attribute.getElementName() === 'element'
                ) {
                  jsxElement.isRouteElement = true;
                  jsxElement.setName(node.name.name);
                }
              }
              if (
                (jsxElement.isRoute() &&
                  attribute.getElementName() === 'render') ||
                attribute.getElementName() === 'element'
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
              if (conditionIdentifier) {
                jsxElement.setConditional();
                jsxElement.conditionalOperator =
                  conditionKind + conditionIdentifier;
              }
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

            if (
              node.type == 'LogicalExpression' ||
              node.type == 'ConditionalExpression' ||
              node.type == 'IfStatement'
            ) {
              ASTParser.logEntry(
                `[Info] Resetting the conditional parser state (3 types)`
              );
              isConditional = false;
              conditionIdentifier = '';
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
