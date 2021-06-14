import { BasicMark, MarkdownBlock, MarkdownFragment } from "./BasicMark.types";
import { BasicMarkBuilder } from "./BasicMarkBuilder";
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