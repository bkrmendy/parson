import assert from "assert";
import { bind, Parser, plus, result } from "./CombinatorBase";
import { between, char, chr, many, many1, sat } from "./ParserCombinators";

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

export const letter: Parser<string> = plus(lower, upper);
export const alphanum = plus(letter, digit);
export const space = chr(" ");
export const las = plus(alphanum, space);

export const wordI: Parser<string> = bind(
    letter,
    (x: char) => bind(
        word,
        (xs: string) => result(x.concat(xs))
    )
);

export const word: Parser<string> = plus(wordI, result(""));

export const nat: Parser<number> = bind(many1(digit), x => result(parseFloat(x.join(''))));

export const parenthesised = <T>(p: Parser<T>) => between(chr("("), p, chr(")"));
export const bracketed = <T>(p: Parser<T>) => between(chr("["), p, chr("]"));

export const sepBy = <T, S>(p: Parser<T>, sep: Parser<S>): Parser<T[]> => plus(sepBy1(p, sep), result([]));

export const sepBy1 = <T, S>(p: Parser<T>, sep: Parser<S>): Parser<T[]> => bind(
    p,
    (x: T) => bind(
        many(bind(sep, _ => p)),
        (xs: T[]) => result([x, ...xs])
    )
);