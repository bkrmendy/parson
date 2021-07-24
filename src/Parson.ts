import { result, zero, bind, plus } from "./CombinatorBase";
import { seq, sat, item, chr, str, many1, many, between, digit, lower, upper, anyChar, alphanum, letter, space, word, nat, parenthesised, bracketed, sepBy, sepBy1 } from "./ParserCombinators";

const Base = {
    result,
    zero,
    bind,
    plus
};

const Lib = {
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
    between
};

const Parson = {
    Base,
    Lib
};

export default Parson;