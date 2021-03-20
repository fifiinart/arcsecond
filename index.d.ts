// Type definitions for arcsecond 3.1 by Fifi Art <https://github.com/fifiinart>
// Based off work by Jeff Rose <http://github.com/jeffrose>
  interface Success<A, S> {
    isError: false;
    result: A;
    index: number;
    data: S;
  }

  interface Failure<S> {
    isError: true;
    error: string;
    index: number;
    data: S;
  }

  type Output<A, S> = Success<A, S> | Failure<S>

  interface InputState {
    dataView: DataView;
    inputType: "string" | "arrayBuffer" | "typedArray" | "dataView"
    isError: false;
    error: null;
    data: null;
    index: number;
    result: null;
  }
  interface SuccessState<A, S> {
    dataView: DataView;
    inputType: "string" | "arrayBuffer" | "typedArray" | "dataView"
    isError: false;
    error: unknown;
    data: S;
    index: number;
    result: A;
  }
  interface ErrorState<S> {
    dataView: DataView;
    inputType: "string" | "arrayBuffer" | "typedArray" | "dataView"
    isError: true;
    error: string;
    data: S;
    index: number;
    result: unknown;
  }
  type OutputState<A, S> = SuccessState<A, S> | ErrorState<S>;
  type State<A, S> = InputState | OutputState<A, S>

  type ParserStateTransformer<A, S, B, T> = (state: State<A, S>) => OutputState<B, T>

  interface StateData<A, S> {
    result: A;
    data: S;
  }

  interface ErrorData<S> {
    error: string;
    index: number;
    data: S;
  }

  type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

  type ValidTarget = string | DataView | ArrayBuffer | TypedArray;

  export class Parser<A = string, S = null> {
    constructor(p: ParserStateTransformer<any, any, A, S>);

    private p: ParserStateTransformer<any, any, A, S>

    ap<B>(parserOfFunction: Parser<(x: A) => B>): Parser<B, S>;

    chain<B>(fn: (result: A) => Parser<B>): Parser<B, S>;

    chainFromData<B>(fn: (state: StateData<A, S>) => Parser<B>): Parser<B, S>;

    errorChain<B>(fn: (errorData: ErrorData<S>) => Parser<B>): Parser<B, S>;

    errorMap(fn: (errorData: ErrorData<S>) => string): Parser<A, S>;

    ["fantasy-land/ap"]<B>(parserOfFunction: Parser<(x: A) => B>): Parser<B, S>;

    ["fantasy-land/chain"]<B>(fn: (result: A) => Parser<B>): Parser<B, S>;

    ["fantasy-land/map"]<B>(fn: (x: A) => B): Parser<B, S>;

    fork<F, B>(target: ValidTarget, errorFn: (error: string, errorState: ErrorState<S>) => F, successFn: (result: A, successState: SuccessState<A, S>) => B): F | B;

    map<B>(fn: (x: A) => B): Parser<B, S>;

    mapData<T>(fn: (data: S) => T): Parser<A, T>;

    mapFromData<B>(fn: (state: StateData<A, S>) => B): Parser<B, S>;

    run(target: ValidTarget): Output<A, S>;

    static of<A>(x: A): Parser<A>;

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

  export function str<T extends string>(s: T): Parser<T>;

  export function succeedWith(x: any): Parser;

  export function takeLeft(leftParser: Parser): (rightParser: Parser) => any;

  export function takeRight(leftParser: Parser): (rightParser: Parser) => any;

  export function tapParser(fn: any): any;

  export function toPromise(result: any): any;

  export function toValue<A>(result: Output<A, any>): A;

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
