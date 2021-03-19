// Type definitions for arcsecond 3.1 by Fifi Art <https://github.com/fifiinart>

export class Parser {
  constructor(p: any);

  ap(parserOfFunction: any): any;

  chain(fn: any): any;

  chainFromData(fn: any): any;

  errorChain(fn: any): any;

  errorMap(fn: any): any;

  ["fantasy-land/ap"](parserOfFunction: any): any;

  ["fantasy-land/chain"](fn: any): any;

  ["fantasy-land/map"](fn: any): any;

  fork(target: any, errorFn: any, successFn: any): any;

  map(fn: any): any;

  mapData(fn: any): any;

  mapFromData(fn: any): any;

  run(target: any): any;

  static of(x: any): any;

}

export function anyCharExcept(parser: any): any;

export function anyOfString(s: any): any;

export function anythingExcept(parser: any): any;

export function between(leftParser: any): any;

export function choice(parsers: any): any;

export function composeParsers(parsers: any): any;

export function coroutine(g: any): any;

export function decide(fn: any): any;

export function either(parser: any): any;

export function errorMapTo(fn: any): any;

export function everyCharUntil(parser: any): void;

export function everythingUntil(parser: any): any;

export function exactly(n: any): any;

export function fail(errorMessage: any): any;

export function lookAhead(parser: any): any;

export function many(parser: any): any;

export function many1(parser: any): any;

export function mapData(fn: any): any;

export function mapTo(fn: any): any;

export function namedSequenceOf(pairedParsers: any): any;

export function parse(parser: any): any;

export function pipeParsers(parsers: any): any;

export function possibly(parser: any): any;

export function recursiveParser(parserThunk: any): any;

export function regex(re: any): any;

export function sepBy(sepParser: any): any;

export function sepBy1(sepParser: any): any;

export function sequenceOf(parsers: any): any;

export function setData(x: any): any;

export function skip(parser: any): any;

export function str(s: any): any;

export function succeedWith(x: any): any;

export function takeLeft(leftParser: any): any;

export function takeRight(leftParser: any): any;

export function tapParser(fn: any): any;

export function toPromise(result: any): any;

export function toValue(result: any): any;

export function withData(parser: any): any;

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