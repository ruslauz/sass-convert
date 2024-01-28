import { globStream } from 'glob'
import fs from 'node:fs';

import { convertSassToScss } from "./utils/convertSassToScss";
import { convertScssToSass } from "./utils/convertScssToSass";

enum Syntax {
    Sass = 'sass',
    Scss = 'scss'
}

type Option = {
    syntax: Syntax;
}

const config = {
    [Syntax.Scss]: {
        converter: convertScssToSass,
        targetExtension: Syntax.Sass
    },
    [Syntax.Sass]: {
        converter: convertSassToScss,
        targetExtension: Syntax.Scss
    }
}

const isSupportedSyntax = (syntax: string): syntax is Syntax => syntax === Syntax.Scss || syntax === Syntax.Sass


export function convert(pattern: string | string[], options: Option) {
    const { syntax } = options ?? {}

    if (!isSupportedSyntax(syntax)) {
        console.log(`The ${syntax} property should be "sass" or "scss"`);
        return
    }

    globStream(pattern).on('data', file => {
        try {
            const content = fs.readFileSync(file).toString();
            const { converter, targetExtension } = config[syntax]

            const formattedContent = converter(content);

            fs.writeFileSync(file, formattedContent);
            fs.renameSync(file, file.replace(`.${syntax}`, targetExtension));
        } catch (error) {
            console.log(`Could not convert ${file}`);
            console.error(error);
        }
    });
}

