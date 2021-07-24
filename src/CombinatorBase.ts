export interface ParserCombinatorResult<T> {
    result: T;
    rest: string;
}

export type Parser<T> = (src: string) => ParserCombinatorResult<T>[];

export const result = <T>(t: T): Parser<T> => (source) => [{ result: t, rest: source }];

export const zero = <T>(_: string): ParserCombinatorResult<T>[] => [];

export const bind = <A, B>(p: Parser<A>, f: (a: A) => Parser<B>): Parser<B> => (source) => {
    return p(source).flatMap(({ result, rest }) => f(result)(rest));
}

export const plus = <A>(p: Parser<A>, q: Parser<A>): Parser<A> => (source) => {
    const first = p(source);
    if (first.length > 0) {
        return first;
    }
    return q(source);
}