//@ts-expect-error
import scssfmt from 'scssfmt';
import { SassFormatter } from 'sass-formatter';

export function formatScss(rawStr: string, tabSize = 2): string {
    return SassFormatter.Format(
        rawStr,
        {
            insertSpaces: true,
            tabSize,
        },
    );
    // return scssfmt(rawStr);
}