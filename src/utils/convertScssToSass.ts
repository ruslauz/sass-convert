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
    const tree = sast.parse(`${formatScss(scssStr.trim())}\n\n`, { syntax: 'scss' });

    traverseAst(tree, (node) => delete node.position);

    traverseAst(tree, removeSemicolon);
    traverseAst(tree, interpolationHack);
    traverseAst(tree, fixIdentation);
    traverseAst(tree, (node: any) => {
        node.type = node.type === 'block' ? '_block' : node.type;
    });
    traverseAst(tree, placeholderHack);
    traverseAst(tree, cssVariableHack);

    const stringifiedTree = removeTrailingSpacesForEachLine(sast.stringify(tree).trim());
    return stringifiedTree;
}