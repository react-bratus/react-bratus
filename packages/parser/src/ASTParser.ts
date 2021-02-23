import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';

class ASTParser {
  private path: string;

  constructor(_path: string) {
    this.path = _path;
  }

  public parsePath(): void {
    const content = fs.readFileSync(this.path, 'utf8');
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });
    traverse(ast, {
      enter(path) {
        if (path.isJSXElement()) {
          console.log(path);
        }
      },
    });
  }
}

export default ASTParser;
