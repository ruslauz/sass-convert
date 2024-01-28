// = to @mixin hack:
export function sassMixinDefinitionHack(child: any) {
    if (child.type === 'mixin' && child.children) {
        const [firstChild, ...otherChildren] = child.children;
        if (firstChild.value === '=') {
            firstChild.type = 'atkeyword';
            delete firstChild.value;
            firstChild.children = [
                {
                    type: 'ident',
                    value: 'mixin',
                },
            ];

            child.children = [
                firstChild,
                {
                    type: 'space',
                    value: ' ',
                },
                ...otherChildren,
            ];
        }
    }
}