const operatorPlaceholders: any = {
    '+': 'MrtPyipTydnmjdcDLXdpxJjJeYrZSokL',
    '-': 'EcSBYTlVJGmwAPuKxNvzTiUxWBhxreEY',
    '*': 'KsuHvGEtnLHzspHzGCYwMLVYXqzgwImf',
    '/': 'DeLpZOMdooUfCxXMqMHJLqQACFGyQmjC',
    '%': 'uOkBVVmetuaspgkCnyBpcPdEJMBDMzWd',
};

export function operatorInArgumentsHack(child: any) {
    if (child.type === 'arguments') {
        child.children.forEach((c: any) => {
            if (operatorPlaceholders[c.value]) {
                c.value = operatorPlaceholders[c.value];
            }
        });
    }
}

export function operatorInArgumentsHackPostFormat(scssString: string): string {
    for (const operator in operatorPlaceholders) {
        const placeholder = operatorPlaceholders[operator];
        scssString = scssString.replaceAll(placeholder, operator);
    }
    return scssString;
}