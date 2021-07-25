import * as CombinatorBase from "./CombinatorBase";
import { result, zero, bind, plus } from "./CombinatorBase";
import { seq, sat, item, chr, str, many1, many, between, digit, lower, upper, anyChar, alphanum, letter, space, word, nat, parenthesised, bracketed, sepBy, sepBy1, alternative } from "./ParserCombinators";

export import Parser = CombinatorBase.Parser;
export import ParserCombinatorResult = CombinatorBase.ParserCombinatorResult;

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
    alternative
};

export default Parson;