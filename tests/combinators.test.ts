import { Parser, plus } from "../src/CombinatorBase";
import { anyChar, bracketed, digit, letter, lower, nat, sepBy1, space, upper, word } from "../src/CombinatorLib";
import { between, chr, many1, seq, str } from "../src/ParserCombinators";

interface Case<T> {
    source: string;
    expected: T | null;
}

const suite = <T>(parser: Parser<T>, cases: Case<T>[]) => {
    for (const { source, expected } of cases) {
        const res = parser(source);
        if (expected == null) {
            expect(res.length).toEqual(0);
        } else {
            expect(res.length).toEqual(1);
            expect(res[0].result).toEqual(expected);
            expect(res[0].rest).toEqual("");
        }
    }
}

describe("combinator tests", () => {
    it("plus", () => suite(plus(upper, lower), [
        { source: "A", expected: "A" },
        { source: "a", expected: "a" },
        { source: "1", expected: null }
    ]));

    it("anychar", () => suite(anyChar, [
        { source: "a", expected: "a" },
        { source: "A", expected: "A" },
        { source: "1", expected: "1" }
    ]));

    it("lower", () => suite(lower, [
        { source: "a", expected: "a" },
        { source: "A", expected: null },
        { source: "2", expected: null },
    ]));

    it("upper", () => suite(upper, [
        { source: "A", expected: "A" },
        { source: "a", expected: null },
        { source: "2", expected: null },
    ]));

    it("nat", () => suite(nat, [
        { source: "aaaa", expected: null },
        { source: "123", expected: 123 },
    ]));

    it("between", () => suite(between(chr("*"), word, chr("*")), [
        { source: "*bold*", expected: "bold" },
        { source: "_bold*", expected: null },
        { source: "bold*", expected: null },
    ]));

    it("bracketed", () => suite(bracketed(nat), [
        { source: "[123]", expected: 123 },
        { source: "(123]", expected: null },
        { source: "[123)", expected: null },
        { source: "[123a]", expected: null },
        { source: "[aaa]", expected: null },
    ]));

    it("seq", () => suite(seq(letter, digit), [
        { source: "a1", expected: ["a", "1"] },
        { source: "T3", expected: ["T", "3"] },
        { source: "3", expected: null },
        { source: "G", expected: null },
    ]));

    it("str", () => suite(str("aaa"), [
        { source: "aaa", expected: "aaa" },
        { source: "aa", expected: null },
        { source: "123", expected: null }
    ]));
});
