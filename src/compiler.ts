import type Cion from '@taiyakihitotsu/cion'
import * as ut from './type-util'

// This compiles S-exprs to TS types, ignited in `tap1` & builtins fns.
//
// The process of Foxp fn is
// - 1. Call the pre-condition as type check
// - 2. Call the fn
// - 3. Call this compiler to earn the corresponding TS type
//
// Finally, we get both: S-exprs at the Cion context & TS types at the TS context.

// Default S would be key, map, vec.
// Not-builtin fn pattern is processed in ltCompiler.
export type PrimToTS<
  S> =
  S extends `${infer H}${infer _R}`
    ? S extends 'true' | 'false'
      ? boolean
    : H extends '-'|'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
      ? number
    : H extends '"' | `'`
      ? string
    : S extends Cion.Builtins
      ? Function
    : S
  : S

export type KeyName<S extends string> = S extends `:${infer N}` ? N : S

// This is used only in lsCompiler.
// This doesn't and shouldn't convert an array of array with PrimToTS.
// It's the role of compiler.
export type _VtoLispM<
  V extends unknown[]
, MapStack extends Record<PropertyKey, unknown> = {}
, Key extends string = ''> =
  V extends []
    ? MapStack
  : V extends [infer F, ...infer R extends unknown[]]
    ? Key extends ''
      ? F extends string
        ? _VtoLispM<R, MapStack, KeyName<F>>
      : never
    : _VtoLispM<R, MapStack & {[K in Key]: PrimToTS<F>}, ''>
  : never

export type VtoLispM<V extends unknown[]> = ut.Flatten<_VtoLispM<V>>



// ----------------------
// -- main : compiler
// ----------------------

export type State = 'map' | 'vec' | 'fn'
export type StackCon = {state: State, stack: unknown[]}
export type StackPush<
  Stack extends StackCon
, V> =
  Stack extends {state: infer state, stack: infer stack extends unknown[]}
    ? { state: state
      , stack: [...stack, V] }
  : never

export type ltcError0 = 'ltcError0'
export type ltcError1 = 'ltcError1'
export type ltcError2 = 'ltcError2'
export type ltcError3 = 'ltcError3'
export type ltcError4 = 'ltcError4'
export type Error<S extends string> = {error: S}
export type ltCompiler<
  Parsed  extends string[]
, Current extends StackCon = {state: 'vec', stack: []}
, Stack   extends StackCon[] = []> =
  Parsed extends []
    ? Current['stack'][0]
  : Parsed extends [infer F extends string, ...infer Rest extends string[]]
    ? F extends '[' | '{'
      ? Current['state'] extends 'fn'
        ? ltCompiler<Rest, StackPush<Current, F>, Stack>
      : ltCompiler<Rest, {state: (F extends '[' ? 'vec' : 'map'), stack: []}, [Current, ...Stack]>
    : F extends '('
      ? ltCompiler<Rest, {state: 'fn', stack: []}, [Current, ...Stack]>
    : F extends ')'
      ? Stack extends [ infer Last extends StackCon
                      , ...infer Tail extends StackCon[]]
        ? ltCompiler<Rest, StackPush<Last, Function>, Tail>
      : Error<ltcError1>
    : F extends ']' | '}'
      ? Current['state'] extends 'fn'
        ? ltCompiler<Rest, StackPush<Current, F>, Stack>
      : Stack extends [ infer Last extends StackCon
                      , ...infer Tail extends StackCon[]]
        ? Current['state'] extends 'map'
          ? ltCompiler<Rest, StackPush<Last, VtoLispM<Current['stack']>>, Tail>
        : Current['state'] extends 'vec'
          ? ltCompiler<Rest, StackPush<Last, Current['stack']>, Tail>
        : Error<ltcError2>
      : Error<ltcError3>
    : ltCompiler<Rest, StackPush<Current, PrimToTS<F>>, Stack>
  : Error<ltcError4>

export type BracketWrap<S extends string> = `[${S}]`
export type BracketUnwrap<S> = S extends [infer F, ...infer _] ? F : never


// ---------------
// -- rename fn args
// ---------------

export type RenameLet<
  S extends string[]
, Before extends string
, After extends string
, IsAdd extends boolean = false
, Stack extends string[] = []> =
  S extends []
    ? Stack
  : S extends [infer F extends string, ...infer Rest extends string[]]
    ? F extends Before
      ? RenameLet<Rest, Before, After, IsAdd, [...Stack, IsAdd extends true ? `${F}${After}` : After]>
    : RenameLet<Rest, Before, After, IsAdd, [...Stack, F]>
  : never

export type StrMarker = '"' | `'`
export type EndBracket = ')' | ']' | '}'
export type StartBracket = '(' | '[' | '{'

export type Str<
  S extends string[]
, Stack extends string = ''
, Next extends string = ''
, IsStr extends boolean = false> =
  S extends []
    ? Stack
  : S extends [infer F extends string, ...infer Rest extends string[]]
    ? Str<Rest, `${Stack}${F extends EndBracket ? '' : Next}${F}`, F extends StartBracket | StrMarker ? IsStr extends false ? '' : ' ' : ' ', F extends StrMarker ? IsStr extends false ? true : false : IsStr>
  : never


export type Ltc<S extends string> = BracketUnwrap<ltCompiler<Cion.CionParser<BracketWrap<S>>>>
export type Fgensym<s extends string, n extends string, m extends string> = Str<RenameLet<Cion.CionParser<s>, n, m, true>>

export * as compiler from './compiler'
