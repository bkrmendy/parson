import * as CombinatorBase from "./CombinatorBase";
import { result, zero, bind, plus, empty } from "./CombinatorBase";
import { seq, sat, item, chr, str, many1, many, between, digit, lower, upper, anyChar, alphanum, letter, space, word, nat, parenthesised, bracketed, sepBy, sepBy1, alternative, option, stringOf } from "./ParserCombinators";

export import Parser = CombinatorBase.Parser;
export import ParserCombinatorResult = CombinatorBase.ParserCombinatorResult;

const parse = <T>(source: string, parser: Parser<T>): T | null => {
    const result = parser(source);
    if (result.length === 0) {
        return null;
    }
    if (result[0].rest.length > 0) {
        // TODO: not fully sure about this
        return null;
    }
    return result[0].result;
}

const Parson = {
    result,
    zero,
    bind,
    plus,
    digit,
    lower,
    upper,
    anyChar,
    alphanum,
    letter,
    space,
    nat,
    word,
    parenthesised,
    bracketed,
    sepBy,
    sepBy1,
    seq,
    sat,
    item,
    chr,
    str,
    many,
    many1,
    between,
    alternative,
    parse,
    option,
    stringOf,
    empty
};

export default Parson;