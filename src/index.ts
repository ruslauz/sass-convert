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
    [Syntax.Sass]: {
        converter: convertScssToSass,
        extension: Syntax.Scss
    },
    [Syntax.Scss]: {
        converter: convertSassToScss,
        extension: Syntax.Sass
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
            const { converter, extension } = config[syntax]

            const formattedContent = converter(content);

            fs.writeFileSync(file, formattedContent);
            fs.renameSync(file, file.replace(`.${extension}`, `.${syntax}`));
        } catch (error) {
            console.log(`Could not convert ${file}`);
            console.error(error);
        }
    });
}

