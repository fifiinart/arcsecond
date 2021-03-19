// Type definitions for arcsecond 3.1 by Fifi Art <https://github.com/fifiinart>

export class Parser {
  constructor(p: any);

  ap(parserOfFunction: any): Parser;

  chain(fn: any): Parser;

  chainFromData(fn: any): Parser;

  errorChain(fn: any): Parser;

  errorMap(fn: any): Parser;

  ["fantasy-land/ap"](parserOfFunction: any): Parser;

  ["fantasy-land/chain"](fn: any): Parser;

  ["fantasy-land/map"](fn: any): Parser;

  fork(target: any, errorFn: any, successFn: any): any;

  map(fn: any): Parser;

  mapData(fn: any): Parser;

  mapFromData(fn: any): Parser;

  run(target: any): any;

  static of(x: any): Parser;

}

export function anyCharExcept(parser: Parser): Parser;

export function anyOfString(s: any): Parser;

export function anythingExcept(parser: Parser): Parser;

export function between(leftParser: Parser): (rightParser: Parser) => (parser: Parser) => Parser;

export function choice(parsers: Parser[]): Parser;

export function composeParsers(parsers: Parser[]): Parser;

export function coroutine(g: any): Parser;

export function decide(fn: any): Parser;

export function either(parser: Parser): Parser;

export function errorMapTo(fn: any): Parser;

export function everyCharUntil(parser: Parser): Parser;

export function everythingUntil(parser: Parser): Parser;

export function exactly(n: any): Parser;

export function fail(errorMessage: any): Parser;

export function lookAhead(parser: Parser): Parser;

export function many(parser: Parser): Parser;

export function many1(parser: Parser): Parser;

export function mapData(fn: any): Parser;

export function mapTo(fn: any): Parser;

export function namedSequenceOf(pairedParsers: any): Parser;

export function parse(parser: Parser): any;

export function pipeParsers(parsers: Parser[]): Parser;

export function possibly(parser: Parser): Parser;

export function recursiveParser(parserThunk: () => Parser): Parser;

export function regex(re: any): Parser;

export function sepBy(sepParser: Parser): (valueParser: Parser) => Parser;

export function sepBy1(sepParser: Parser): (valueParser: Parser) => Parser;

export function sequenceOf(parsers: Parser[]): Parser;

export function setData(x: any): Parser;

export function skip(parser: Parser): Parser;

export function str(s: any): Parser;

export function succeedWith(x: any): Parser;

export function takeLeft(leftParser: Parser): (rightParser: Parser) => any;

export function takeRight(leftParser: Parser): (rightParser: Parser) => any;

export function tapParser(fn: any): any;

export function toPromise(result: any): any;

export function toValue(result: any): any;

export function withData(parser: Parser): any;

export const anyChar: Parser

export const digit: Parser

export const digits: Parser

export const endOfInput: Parser

export const getData: Parser

export const letter: Parser

export const letters: Parser

export const optionalWhitespace: Parser

export const peek: Parser

export const whitespace: Parser
