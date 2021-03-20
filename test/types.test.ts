import { str, Output, Parser, char, TypedArray, ErrorState, SuccessState, ResultOfParser, DataOfParser } from '..'
import { expectTypeOf } from 'expect-type'

test("Parser class", () => {
  // make sure parser is of correct type:
  const parser = str("abc")
  expectTypeOf(parser).toEqualTypeOf<Parser<"abc">>()
  expectTypeOf<ResultOfParser<typeof parser>>().toEqualTypeOf<"abc">()
  expectTypeOf<DataOfParser<typeof parser>>().toEqualTypeOf<null>()
})

test("Parser::run", () => {
  const parser = str(".run")

  // make sure target is a:
  parser.run(".run test") // string
  parser.run(new ArrayBuffer(16)) // array buffer
  parser.run(new DataView(new ArrayBuffer(16))) // data view
  parser.run(new Uint8Array([1, 2, 3, 4, 5])) // typed array
  
  // and not:
  // @ts-expect-error
  parser.run(1234) // a number
  // @ts-expect-error
  parser.run(true) // a bool
  // @ts-expect-error
  parser.run(null) // null
  // @ts-expect-error
  parser.run(undefined) // undefined
  // @ts-expect-error
  parser.run() // not passed in

  expectTypeOf(parser.run).returns.toEqualTypeOf<Output<".run", null>>()
})

test("Parser::fork", () => {
  const parser = char("A")

  // valid target
  expectTypeOf(parser.fork).parameter(0).toEqualTypeOf<string | DataView | ArrayBuffer | TypedArray>()

  const expectTypeOfErrorHandler = expectTypeOf(parser.fork).parameter(1);
  expectTypeOfErrorHandler.parameter(0).toEqualTypeOf<string>() // to be the actual error message
  expectTypeOfErrorHandler.parameter(1).toEqualTypeOf<ErrorState<null>>() // to be the error state object with no data

  const expectTypeOfSuccessHandler = expectTypeOf(parser.fork).parameter(2);
  expectTypeOfSuccessHandler.parameter(0).toEqualTypeOf<"A">() // to be the result of the parsing
  expectTypeOfSuccessHandler.parameter(1).toEqualTypeOf<SuccessState<"A", null>>() // to be the success state object with no data
})
