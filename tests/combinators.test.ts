import { digit, lower } from "../src/ParserCombinators";
import Parson, { Parser } from "../src/Parson";

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
        }
    }
}

describe("combinator tests", () => {
    it("plus", () => suite(Parson.plus(Parson.upper, Parson.lower), [
        { source: "A", expected: "A" },
        { source: "a", expected: "a" },
        { source: "1", expected: null }
    ]));

    it("anychar", () => suite(Parson.anyChar, [
        { source: "a", expected: "a" },
        { source: "A", expected: "A" },
        { source: "1", expected: "1" }
    ]));

    it("lower", () => suite(Parson.lower, [
        { source: "a", expected: "a" },
        { source: "A", expected: null },
        { source: "2", expected: null },
    ]));

    it("upper", () => suite(Parson.upper, [
        { source: "A", expected: "A" },
        { source: "a", expected: null },
        { source: "2", expected: null },
    ]));

    it("nat", () => suite(Parson.nat, [
        { source: "aaaa", expected: null },
        { source: "123", expected: 123 },
    ]));

    it("between", () => suite(Parson.between(Parson.chr("*"), Parson.word, Parson.chr("*")), [
        { source: "*bold*", expected: "bold" },
        { source: "_bold*", expected: null },
        { source: "bold*", expected: null },
    ]));

    it("bracketed", () => suite(Parson.bracketed(Parson.nat), [
        { source: "[123]", expected: 123 },
        { source: "(123]", expected: null },
        { source: "[123)", expected: null },
        { source: "[123a]", expected: null },
        { source: "[aaa]", expected: null },
    ]));

    it("seq", () => suite(Parson.seq(Parson.letter, Parson.digit), [
        { source: "a1", expected: ["a", "1"] },
        { source: "T3", expected: ["T", "3"] },
        { source: "3", expected: null },
        { source: "G", expected: null },
    ]));

    it("str", () => suite(Parson.str("aaa"), [
        { source: "aaa", expected: "aaa" },
        { source: "aa", expected: null },
        { source: "123", expected: null }
    ]));

    it("sepBy1", () => suite(Parson.sepBy1(Parson.nat, Parson.space), [
        { source: "1 2 3", expected: [1, 2, 3] },
        { source: "", expected: null },
        { source: "a 3", expected: null },
    ]));

    it("sepBy", () => suite(Parson.sepBy(Parson.nat, Parson.space), [
        { source: "1 2 3", expected: [1, 2, 3] },
        { source: "", expected: [] },
        { source: "a 2, 3", expected: [] },
    ]));

    it("many1", () => suite(Parson.many1(Parson.digit), [
        { source: "111222", expected: ["1", "1", "1", "2", "2", "2"] },
        { source: "111a222", expected: ["1", "1", "1"] },
        { source: "a111222", expected: null },
        { source: "", expected: null },
    ]));

    it("many", () => suite(Parson.many(Parson.digit), [
        { source: "111222", expected: ["1", "1", "1", "2", "2", "2"] },
        { source: "111a222", expected: ["1", "1", "1"] },
        { source: "a111222", expected: [] },
        { source: "", expected: [] },
    ]));

    it("alternative", () => suite(Parson.alternative([Parson.upper, Parson.lower, Parson.digit]), [
        { source: "1", expected: "1" },
        { source: "a", expected: "a" },
        { source: "A", expected: "A" },
        { source: " ", expected: null }
    ]));
});
