import { BasicMark, BlockDecorator, MarkdownBlock, MarkdownFragment } from "./BasicMark.types";

export const BasicMarkBuilder = {
    basicmark: (blocks: MarkdownBlock[]): BasicMark => blocks,
    markdownBlock: (decorators: BlockDecorator[], content: MarkdownFragment[]): MarkdownBlock => ({
        decorators,
        content
    }),
}