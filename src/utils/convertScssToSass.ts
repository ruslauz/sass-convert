import { traverseAst } from './traverseAst';
import { removeSemicolon } from './removeSemicolon';
import { interpolationHack } from './interpolationHack';
import { formatScss } from './formatScss';
import { removeTrailingSpacesForEachLine } from './removeTrailingSpacesForEachLine';
import { fixIdentation } from './fixIdentation';
import { placeholderHack } from './placeholderHack';
import { cssVariableHack } from './cssVariableHack';
//@ts-expect-error
import sast from 'sast';

export function convertScssToSass(scssStr: string): string {
    const ast = sast.parse(`${formatScss(scssStr.trim())}\n\n`, { syntax: 'scss' });

    traverseAst(ast, (node) => delete node.position);
    traverseAst(ast, removeSemicolon);
    traverseAst(ast, interpolationHack);
    traverseAst(ast, fixIdentation);
    traverseAst(ast, (node: any) => {
        node.type = node.type === 'block' ? '_block' : node.type;
    });
    traverseAst(ast, placeholderHack);
    traverseAst(ast, cssVariableHack);

    return removeTrailingSpacesForEachLine(sast.stringify(ast).trim());
}