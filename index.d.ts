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

type Either<A> = {
  isError: true; value: string;
} | {
  isError: false; value: A;
}

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

export type ResultOfParser<T> = T extends Parser<infer A, any> ? A : never

export type DataOfParser<T> = T extends Parser<any, infer S> ? S : never

type NTupleOf<N extends number, T, S extends T[] = []> = S["length"] extends N ? S : NTupleOf<N, T, [T, ...S]>;

export class Parser<A = string, S = null> {

  constructor(p: ParserStateTransformer<any, any, A, S>);

  private p: ParserStateTransformer<any, any, A, S>

  run(target: ValidTarget): Output<A, S>;

  fork<F, B>(target: ValidTarget, errorFn: (error: string, errorState: ErrorState<S>) => F, successFn: (result: A, successState: SuccessState<A, S>) => B): F | B;

  ["fantasy-land/map"]<B>(fn: (x: A) => B): Parser<B, S>;

  ["fantasy-land/chain"]<B>(fn: (result: A) => Parser<B>): Parser<B, S>;

  ["fantasy-land/ap"]<B>(parserOfFunction: Parser<(x: A) => B>): Parser<B, S>;

  errorMap(fn: (errorData: ErrorData<S>) => string): Parser<A, S>;

  errorChain<B>(fn: (errorData: ErrorData<S>) => Parser<B>): Parser<B, S>;

  mapFromData<B>(fn: (state: StateData<A, S>) => B): Parser<B, S>;

  chainFromData<B>(fn: (state: StateData<A, S>) => Parser<B>): Parser<B, S>;

  mapData<T>(fn: (data: S) => T): Parser<A, T>;

  static ["fantasy-land/of"]<A>(x: A): Parser<A>

  map<B>(fn: (x: A) => B): Parser<B, S>;

  chain<B>(fn: (result: A) => Parser<B>): Parser<B, S>;

  ap<B>(parserOfFunction: Parser<(x: A) => B>): Parser<B, S>;

  static of<A>(x: A): Parser<A>;

}

type GetDataParser<T> = T extends Parser<any, infer S> ? Parser<S, S> : never;

export const getData: GetDataParser<Parser>

export function setData<A, T>(x: T): Parser<A, T>;

export function mapData<A, S>(fn: (x: S) => S): Parser<A, S>;

export function withData<A, S>(parser: Parser<A, S>): (stateData: S) => Parser<A, S>;

export function pipeParsers<A, S = null>(parsers: [...Parser<any, any>[], Parser<A, S>]): Parser<A, S>;

export function composeParsers<A, S = null>(parsers: [Parser<A, S>, ...Parser<any, any>[]]): Parser<A, S>;

export function tapParser<A, S = null>(fn: (x: A) => void): Parser<A, S>;

export function parse<A, S>(parser: Parser<A, S>): (target: ValidTarget) => Output<A, S>;

export function decide<A, B, S>(fn: (result: A) => Parser<B, S>): Parser<B, S>;

export function fail(errorMessage: string): Parser;

export function succeedWith<A>(x: A): Parser<A>;

export function either<A, S>(parser: Parser<A, S>): Parser<Either<A>, S>;

export function coroutine<P extends Parser<any, any>, A>(g: () => Generator<P, A, ResultOfParser<P>>): Parser<A>;

export function exactly<N extends number, A, S>(n: N): Parser<NTupleOf<N, A>, S>;

export function many<A, S>(parser: Parser<A, S>): Parser<A[], S>;

export function many1<A, S>(parser: Parser<A, S>): Parser<A[], S>;

export function mapTo<A, B, S>(fn: (x: A) => B): Parser<B, S>;

export function errorMapTo<A, S>(fn: (error: string, index: number, data: S) => string): Parser<A, S>;

export function char<T extends string>(s: T): Parser<T>;

export const anyChar: Parser

export const peek: Parser

export function str<T extends string>(s: T): Parser<T>;

export function regex(re: RegExp): Parser;

export const digit: Parser

export const digits: Parser

export const letter: Parser

export const letters: Parser

export function anyOfString<T extends string>(s: T): Parser<T[number]>;

export function namedSequenceOf<O extends object, S = null>(pairedParsers: { [K in keyof O]: [K, Parser<O[K], any>] }[keyof O][]): Parser<O, S>

export function sequenceOf<A extends any[], S = null>(parsers: { [I in keyof A]: Parser<A[I], any> }): Parser<A, S>

export function sepBy<A, S = null>(sepParser: Parser<any, any>): (valueParser: Parser<A>) => Parser<A[], S>;

export function sepBy1<A, S = null>(sepParser: Parser<any, any>): (valueParser: Parser<A>) => Parser<A[], S>;

export function choice<A extends any[], S = null>(parsers: { [I in keyof A]: Parser<A[I], any> }): Parser<A[number], S>;

export function between(leftParser: Parser<any, any>): (rightParser: Parser<any, any>) => <A, S>(parser: Parser<A, S>) => Parser<A, S>;

export function everythingUntil(parser: Parser): Parser;

export function everyCharUntil(parser: Parser): Parser;

export function anyCharExcept(parser: Parser): Parser;

export function lookAhead<A, S>(parser: Parser<A, S>): Parser<A, S>;

export function possibly<A, S>(parser: Parser<A, S>): Parser<A | null, S>;

export function skip<A, S>(parser: Parser<A, S>): Parser<A, S>;

export const endOfInput: Parser

export const whitespace: Parser

export const optionalWhitespace: Parser

export function recursiveParser<A, S>(parserThunk: () => Parser<A, S>): Parser<A, S>;

export function takeLeft<A, S>(leftParser: Parser<A, S>): (rightParser: Parser<any, any>) => Parser<A, S>;

export function takeRight<A, S>(leftParser: Parser<any, any>): (rightParser: Parser<A, S>) => Parser<A, S>;

export function toPromise<A>(result: Output<A, any>): Promise<A>;

export function toValue<A>(result: Output<A, any>): A;

export function anythingExcept<A, S>(parser: Parser<A, S>): Parser;
