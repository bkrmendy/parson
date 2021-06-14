import { BasicMark, BlockDecorator, ImageRun, MarkdownBlock, MarkdownFragment } from "./BasicMark.types";

export const BasicMarkBuilder = {
    basicmark: (blocks: MarkdownBlock[]): BasicMark => blocks,
    markdownBlock: (decorators: BlockDecorator[], content: MarkdownFragment[]): MarkdownBlock => ({
        decorators,
        content
    }),
    image: (alt: string, url: string): ImageRun => ({
        type: "image",
        alt,
        href: url
    }),
}