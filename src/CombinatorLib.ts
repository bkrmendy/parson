import assert from "assert";
import { between, bind, char, charp, many, many1, Parser, plus, result, sat } from "./ParserCombinators";

const inCharRangeOf = (low: char, hi: char) => (c: char) => {
    assert(low.length === 1);
    assert(hi.length === 1);
    return low.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <= hi.charCodeAt(0);
};

export const digit = sat(x => {
    assert(x.length === 1);
    return inCharRangeOf('0', '9')(x);
});

export const lower = sat(x => {
    assert(x.length === 1);
    return inCharRangeOf('a', 'z')(x);
});

export const upper = sat(x => {
    assert(x.length === 1);
    return inCharRangeOf('A', 'Z')(x);
});

export const anyChar = sat(x => {
    assert(x.length === 1);
    return true;
});

export const letter = plus(lower, upper);
export const alphanum = plus(letter, digit);
export const space = charp(" ");
export const las /* alphanum, space */ = plus(alphanum, space);

export const linkLetter = plus(
    alphanum,
    sat(c => [":", "/", "-", "."].includes(c)));
export const urlSrc = many(linkLetter);

export const wordI: Parser<string> = bind(
    letter,
    (x: char) => bind(
        word,
        (xs: string) => result(x.concat(xs))
    )
);

export const word: Parser<string> = plus(wordI, result(""));

export const nat: Parser<number> = bind(many1(digit), x => result(parseFloat(x.join(''))));

export const parenthesised = <T>(p: Parser<T>) => between(charp("("), p, charp(")"));
export const bracketed = <T>(p: Parser<T>) => between(charp("["), p, charp("]"));

export const sepBy1 = <T, S>(p: Parser<T>, sep: Parser<S>): Parser<T[]> => many(bind(sep, _ => p));