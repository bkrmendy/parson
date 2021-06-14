import { lower, nat, upper } from "../src/CombinatorLib";

describe("combinator tests", () => {
    it("lower", () => {
        const source = "a";
        const res = lower(source);
        expect(res.length).toEqual(1);
        expect(res[0].result).toEqual("a");
        expect(res[0].rest).toEqual("");
    });

    it("upper", () => {
        const source = "A";
        const res = upper(source);
        expect(res.length).toEqual(1);
        expect(res[0].result).toEqual("A");
        expect(res[0].rest).toEqual("");
    });

    it("nat", () => {
        const source = "123";
        const res = nat(source);
        expect(res.length).toEqual(3);

        expect(res[0].result).toEqual(123);
        expect(res[0].rest).toEqual("");

        expect(res[1].result).toEqual(12);
        expect(res[1].rest).toEqual("3");


        const sourceX = "asd";
        const resX = nat(sourceX);
        expect(resX.length).toEqual(0);
    })
});