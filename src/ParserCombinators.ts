import assert from "assert";

export interface ParserCombinatorResult<T> {
    result: T;
    rest: string;
}

export type Parser<T> = (src: string) => ParserCombinatorResult<T>[];

export const result = <T>(t: T): Parser<T> => (source) => [{ result: t, rest: source }];

export const zero = <T>(_: string): ParserCombinatorResult<T>[] => [];

export const bind = <A, B>(p: Parser<A>, f: (a: A) => Parser<B>): Parser<B> => (source) => {
    const res = p(source);
    if (res.length === 0) {
        return [];
    }

    return res.flatMap(({ result, rest }) => {
        const g = f(result)(rest);
        return g;
    });
}

export const seq = <A, B>(p: Parser<A>, q: Parser<B>): Parser<[A, B]> => (
    bind(p, x => (
        bind(q, y => result([x, y]))
    ))
);

export type char = string;

export const sat = (p: (c: char) => boolean): Parser<char> => {
    return bind(item, x => {
        if (p(x)) {
            return result(x);
        } else {
            return zero as Parser<char>;
        }
    });
}


export const item = (source: string): ParserCombinatorResult<char>[] => {
    if (source.length < 1) {
        return [];
    }
    return [{ result: source[0], rest: source.slice(1) }];
}

export const plus = <A>(p: Parser<A>, q: Parser<A>): Parser<A> => (source) => {
    const first = p(source);
    if (first.length > 0) {
        return first;
    }
    return q(source);
}

export const chr = (c: string) => sat(x => {
    assert(x.length === 1);
    return x === c;
});

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

export const many1 = <T>(p: Parser<T>): Parser<T[]> => bind(p, t => bind(many(p), ts => result([t, ...ts])));

export const many = <T>(p: Parser<T>): Parser<T[]> => plus(many1(p), result([]));

export const between = <A, B, C>(start: Parser<A>, p: Parser<B>, end: Parser<C>): Parser<B> => (
    bind(start, _ =>
        bind(p, res =>
            bind(end, _ => result(res))))
);