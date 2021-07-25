import { Parser } from "./CombinatorBase";

export interface Case<T> {
    source: string;
    expected: T | null;
}

export const suite = <T>(parser: Parser<T>, cases: Case<T>[]) => {
    for (const { source, expected } of cases) {
        const res = parser(source);
        if (expected == null) {
            expect(res.length).toEqual(0);
        } else {
            expect(res.length).toEqual(1);
            expect(res[0].result).toEqual(expected);
        }
    }
}