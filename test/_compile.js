import { compile as sweet } from '@sweet-js/core';
import NodeLoader from '@sweet-js/core/dist/node-loader';
import { transform } from 'babel-core';
import { writeFileSync, readFileSync } from 'fs';
import { fileSync } from 'tmp';

export function compileAndEval(code) {
  return eval(compile(code));
}

export function compile(code) {
  code = `'lang sweet.js';
import { class, interface, implements } from '../src/index';
(function() { ${code} }());`;

  let output;
  let outFile = fileSync({ dir: __dirname });
  writeFileSync(outFile.fd, code);

  let loader = new NodeLoader(__dirname);
  return transform(sweet(outFile.name, loader).code, {"plugins": ["transform-es2015-modules-commonjs"]}).code;
}
