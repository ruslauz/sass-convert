export function placeholderHack(child: any) {
    if (child.type === 'placeholder') {
        child.children[0].value = `%${child.children[0].value}`;
    }
}