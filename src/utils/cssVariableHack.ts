export function cssVariableHack(child: any) {
    if (child.type === 'customProperty') {
      child.children[0].value = `--${child.children[0].value}`;
    }
  }