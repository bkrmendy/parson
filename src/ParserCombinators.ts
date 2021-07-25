import assert from "assert";
import { bind, Parser, ParserCombinatorResult, plus, result, zero } from "./CombinatorBase";

export type char = string;

export const item = (source: string): ParserCombinatorResult<char>[] => {
    if (source.length < 1) {
        return [];
    }
    return [{ result: source[0], rest: source.slice(1) }];
}

export const chr = (c: string) => sat(x => {
    assert(x.length === 1);
    return x === c;
});

const inCharRangeOf = (low: char, hi: char) => (c: char) => {
    assert(low.length === 1);
    assert(hi.length === 1);
    return low.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <= hi.charCodeAt(0);
};

export const sat = (p: (c: char) => boolean): Parser<char> => {
    return bind(item, x => {
        if (p(x)) {
            return result(x);
        } else {
            return zero as Parser<char>;
        }
    });
}

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

export const many1 = <T>(p: Parser<T>): Parser<T[]> => bind(p, t => bind(many(p), ts => result([t, ...ts])));

export const many = <T>(p: Parser<T>): Parser<T[]> => plus(many1(p), result([]));

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

export const seq = <A, B>(p: Parser<A>, q: Parser<B>): Parser<[A, B]> => (
    bind(p, x => (
        bind(q, y => result([x, y]))
    ))
);

export const str = (s: string) => (source: string): ParserCombinatorResult<string>[] => {
    assert(str.length !== 0);
    if (source.length < s.length) {
        return [];
    }
    const prefix = source.slice(0, s.length);
    if (prefix === s) {
        return [{ result: s, rest: source.slice(s.length) }]
    }
    return [];
};

export const between = <A, B, C>(start: Parser<A>, p: Parser<B>, end: Parser<C>): Parser<B> => (
    bind(start, _ =>
        bind(p, res =>
            bind(end, _ => result(res))))
);

export const alternative = <T>(ps: Parser<T>[]): Parser<T> => {
    assert(ps.length > 0);
    const [p, ...rest] = ps;
    return rest.reduce(plus, p);
}

export const option = <T>(p: Parser<T>, otherwise: T): Parser<T> => plus(p, result(otherwise));

export const stringOf = (p: Parser<string>): Parser<string> => bind(many1(p), ps => result(ps.join("")));