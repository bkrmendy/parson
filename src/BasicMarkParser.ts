import { link } from "fs";
import { BasicMark, ImageRun, MarkdownBlock, MarkdownFragment } from "./BasicMark.types";
import { BasicMarkBuilder } from "./BasicMarkBuilder";
import { bracketed, las, letter, linkLetter, parenthesised } from "./CombinatorLib";
import { bind, chr, many, Parser, plus, result } from "./ParserCombinators";
import { Result, ResultBuilder } from "./Result";

export function basicMark(source: String): Result<BasicMark, string> {
    let blocks: MarkdownBlock[] = [];

    while (source.length > 0) {
        const result = basicMarkBlock(source);
        blocks.push(result);
    }

    return ResultBuilder.ok(BasicMarkBuilder.basicmark(blocks));
}

export function basicMarkBlock(source: String): MarkdownBlock {
    throw new Error("Not implemented");
}

export const plaintext = bind(many(las), ls => result(ls.join("")));
export const linktext = bind(many(linkLetter), ls => result(ls.join("")));

export const imageLink: Parser<ImageRun> = bind(
    chr("!"), _ => (
        bind(bracketed(plaintext), alt =>
            bind(parenthesised(linktext),
                href => result(BasicMarkBuilder.image(alt, href)))
    )
));