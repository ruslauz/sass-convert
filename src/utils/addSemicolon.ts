export function addSemicolon(child: any) {
    if (child.type === 'atrule') {
        child.children.push({
            type: 'declarationDelimiter',
            position: {},
            value: '\n',
        });
    }

    if (child.type === 'declarationDelimiter') {
        child.value = child.value.includes(';') ? child.value : `;${child.value}`;
    }
}