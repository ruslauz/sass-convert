export function removeSemicolon(child: any) {
    if (child.type === 'declarationDelimiter') {
        child.value = '';
    }
}