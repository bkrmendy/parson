import { URL } from "url";

export type BasicMark = MarkdownBlock[];

export interface MarkdownBlock {
    decorators: BlockDecorator[];
    content: MarkdownFragment[];
}

export interface HeadingDecorator {
    type: "heading";
    level: number;
}

export interface QuotationBlock {
    type: "quotationBlock";
}

export interface CodeBlock {
    type: "codeBlock";
}

export interface BulletListItem {
    type: "bulletListItem";
}

export interface NumberedListItem {
    type: "numberedListItem";
    ordinal: number;
}

export enum CheckedState {
    CHECKED,
    UNCHECKED,
    CANCELED
}

export interface TodoListItem {
    type: "todoListItem";
    checked: CheckedState
}

export type BlockDecorator
    = HeadingDecorator
    | QuotationBlock
    | CodeBlock
    | BulletListItem
    | NumberedListItem
    | TodoListItem
    ;

export interface BoldTextRun {
    type: "bold";
    content: MarkdownFragment[];
}

export interface ItalicTextRun {
    type: "italic";
    content: MarkdownFragment[];
}

export interface LinkRun {
    type: "link";
    content: MarkdownFragment[];
    href: URL;
}

export interface ImageRun {
    type: "image";
    alt: string;
    href: string;
}

export type MarkdownFragment
    = BoldTextRun
    | ItalicTextRun
    | LinkRun
    | ImageRun
    ;