import { ImageRun } from "../src/BasicMark.types";
import { imageLink, linktext, plaintext } from "../src/BasicMarkParser";
import { bracketed, lower, nat, parenthesised, upper, word } from "../src/CombinatorLib";
import { between, charp } from "../src/ParserCombinators";

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
    });

    it("between", () => {
        const source = "*bold*";
        const parser = between(charp("*"), word, charp("*"));

        const res = parser(source);
        expect(res.length).toEqual(1);
        expect(res[0].result).toEqual("bold");
        expect(res[0].rest).toEqual("");
    });

    it("plaintext", () => {
        const source = "royale with cheese";
        const parser = plaintext;

        const res = parser(source);

        expect(res.length).toEqual(19);
        expect(res[0].result).toEqual("royale with cheese");
        expect(res[0].rest).toEqual("");
    })

    it("bracketed", () => {
        const source = "[i love cheese]";
        const parser = bracketed(plaintext);

        const res = parser(source);

        expect(res.length).toEqual(1);
        expect(res[0].result).toEqual("i love cheese");
    });

    it("linktext", () => {
        const source = "https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png";
        const parser = linktext;
        const res = parser(source);

        expect(res.length).toEqual(80);
        expect(res[0].result).toEqual("https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png");
        expect(res[0].rest).toEqual("");
    });

    it("image", () => {
        const source = "![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)";
        const parser = imageLink;

        const res = parser(source);
        expect(res.length).toEqual(1);
        expect(res[0].rest).toEqual("");

        const img: ImageRun = res[0].result;
        expect(img.alt).toEqual("alt text");
        expect(img.href).toEqual("https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png");
    })
});