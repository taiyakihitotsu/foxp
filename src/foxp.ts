import type Cion from '@taiyakihitotsu/cion'
import * as typeUtil from './type-util'
import type { LispFalsy, N0, N1, N2, N3, N4 } from './type-util'
import * as compiler from './compiler'
import { const as c } from './const'
import * as ut from './type-util'
import * as fraction from './fraction'



export type IsFnForm<P> = [P, Symbol] extends [string, compiler.PrimToTS<P>] ? true : false

// -------------
// -- LispWrap
// -------------
//
// value -> singleton type -> Cion Lisp Sexpr
export type _LispString<S extends string> = `'${S}'`
export type ToLispString<
  T extends ut.Primitive> =
  T extends `:${infer K}`
    ? `:${K}`
  : T extends string
    ? [fraction.isRational<T>, _LispString<T>] extends [true, `'${infer N}'`]
      ? N
    : _LispString<T>
  : `${T}`

type SymSig = {[c.FnFlagKey]: true}
type Rec = Record<PropertyKey, unknown> | Readonly<Record<PropertyKey, unknown>>
type Arr = unknown[] | readonly unknown[]

export type DeeplySymSearch<
  Data> =
  Data extends SymSig
    ? true
  : Data extends [infer F, ...infer T]
    ? F extends SymSig
      ? true
    : F extends Rec | Arr
      ? false extends DeeplySymSearch<F>
        ? DeeplySymSearch<T>
      : true
    : T extends []
      ? false
    : DeeplySymSearch<T>
  : Data extends Rec
    ? DeeplySymSearch<{[K in keyof Data]: Data[K]}[keyof Data]> extends false
      ? false
    : true
  : false

export type LispWrapedMapWith<
  T> =
{ [c.SexprKey]: typeUtil.RtoS<T>
    , [c.ContKey]: typeUtil.RtoS<T>
    , [c.FnFlagKey]: DeeplySymSearch<T>
    , [c.ValueKey]: T
    , [c.HofFlag]: false }
export const putRecord = <
 V extends Record<PropertyKey, unknown>
> (v: V extends (ut.ForceReadRecord<V> extends never ? never : V) ? V : never): LispWrapedMapWith<V> => (
  { [c.SexprKey]: '' as typeUtil.RtoS<V>
  , [c.ValueKey]: v
  , [c.ContKey] : '' as typeUtil.RtoS<V> 
  , [c.FnFlagKey]: null as unknown as DeeplySymSearch<V>
  , [c.HofFlag]: false})

// [note]
// see `ForceTuple` in `type-util.ts`.
// it's the different that this accept emptys `[]`.
export type LispWrapedVecWith<
  T extends ut.Tuple> =
{ [c.SexprKey]: typeUtil.VtoS<T>
    , [c.ContKey]: typeUtil.VtoS<T>
    , [c.FnFlagKey]: DeeplySymSearch<T>
    , [c.ValueKey]: T
    , [c.HofFlag]: false }
export const putVec = <
  V extends unknown[] | readonly unknown[]
, Vpre extends (ut.ForceTuple<V> extends never ? V['length'] extends 0 ? V : never : V)
, Vpass extends (V extends ut.Tuple ? V : never)>
  (v: V extends Vpre ? V : never): LispWrapedVecWith<Vpass> => (
  { [c.SexprKey]: '' as typeUtil.VtoS<Vpass>
  , [c.ContKey] : '' as typeUtil.VtoS<Vpass>
  , [c.FnFlagKey]: null as unknown as DeeplySymSearch<V>
  , [c.ValueKey]: v as unknown as Vpass
  , [c.HofFlag]: false})

// [todo]
// maybe legacy
export type LispWrapedFnValue<Pre, T> = {fn : T, pre : Pre}
export type LispWrapedFnWith<
  Pre
, F
, T> =
{ [c.SexprKey]: F
    , [c.ContKey]: F
    , [c.FnFlagKey]: false
    , [c.ValueKey]: LispWrapedFnValue<Pre, T>
    , [c.HofFlag]: false }
const _putFn1 = <Pre, F, T>(f:T): LispWrapedFnWith<Pre,F,T> => (
  { [c.SexprKey]: '' as F
  , [c.ContKey]: '' as F
  , [c.FnFlagKey]: false
  , [c.ValueKey]: {[c.FnKey]: f as T, [c.PreKey]: '' as Pre}
  , [c.HofFlag]: false})
export const putFn1 = <Pre,F>() => <T>(f:T): LispWrapedFnWith<Pre,F,T> => _putFn1<Pre,F,T>(f)

// -- primitive
// [note]
// Fraction is not supported with TypeScript in default.
// See `ToLispString` as well.
export type LispWrapedPrimWith<
  T extends ut.Primitive
, R extends ut.Primitive> =
{ [c.SexprKey]: ToLispString<T>
    , [c.ContKey]: ToLispString<T>
    , [c.ValueKey]: R
    , [c.FnFlagKey]: IsFnForm<T>
    , [c.HofFlag]: false }
export const putPrim = <
  V extends ut.Primitive
, R extends ut.Primitive = (fraction.isRational<V> extends true ? number : V)>
(v: V): LispWrapedPrimWith<V,R> =>
({[c.SexprKey] : '' as ToLispString<V>
, [c.ContKey]  : '' as ToLispString<V>
, [c.FnFlagKey]: null as unknown as IsFnForm<V>
, [c.ValueKey] : fraction.someFraction(v) as R
  , [c.HofFlag]: false})

export const putSym = <
  Sym extends string
, V>(
  s: Sym
, v: V):
{ [c.SexprKey]: Sym
, [c.ContKey] : Sym
, [c.FnFlagKey]: true
, [c.ValueKey]: Symbol
  , [c.HofFlag]: false} => (
{ [c.SexprKey]: '' as Sym
, [c.ContKey] : '' as Sym
, [c.FnFlagKey]: true
, [c.ValueKey]: v as Symbol
  , [c.HofFlag]: false})



// --------------------------
// -- type check id
// --------------------------

export const tid = <
  T extends string
>() =>
< U extends {[c.SexprKey]: U[c.SexprKey]}>
( value: U extends (Cion.Lisp<`(${T} ${U[c.SexprKey] extends string ? U[c.SexprKey] : never})`> extends LispFalsy ? never : U) ? U : never): U => value

// readonly 
export const ro: <U extends unknown[] | Record<PropertyKey, unknown>>(u: U) => ut.DeepReadonly<U> = (u) => u



// ----------------------
// -- typed apply fn
// ----------------------
//
// The 1st arg is a function, the 2nd is a taple of args for the 1st.
// The 2nd must be a tuple -- it must be `string[]` or similar.
//
// This extracts the S-exprs of both, to interpret them as Cion Lisp.
// If the 2nd arg fully satisfies the pre-condition of the 1st,
//   the 1st fn is executed with the 2nd as args. 
// The evaluation of that are done at the type level.,
//   
// If not all params are not passed,
//   the type of the 2nd arg is infered as `never`,
//   so this function `tap1` must fail in that case.
//
// `compiler.Ltc` translates TS types to the Cion S-exprs string.
// The result is the S-exprs value of the return type.
export const tap1 = <
  S extends { [c.SexprKey]: string
            , [c.ContKey] : string
            , [c.ValueKey]: S[c.ValueKey]}
, F extends { [c.SexprKey]: string
            , [c.ContKey] : string
	    , [c.ValueKey]: { [c.PreKey] : string | string[]
                            , [c.FnKey]: Function}}
, _RetType extends compiler.Ltc<BPost extends string ? BPost : ''>
, RetType extends (_RetType extends Function ? {[c.PreKey]: F[c.ValueKey][c.PreKey][1], [c.FnKey]: _RetType} : _RetType)
, BPre extends `(${F[c.ValueKey][c.PreKey] extends string ? F[c.ValueKey][c.PreKey] : F[c.ValueKey][c.PreKey][0]} ${S[c.SexprKey]})`
, BCont extends `(${F[c.SexprKey]} ${S[c.SexprKey]})`
, BPost extends Cion.Lisp<BCont>>
  ( lf: F
  , a: S extends (Cion.Lisp<BPre> extends LispFalsy ? never : S) ? S : never)
  : { [c.SexprKey]: BPost
    , [c.ValueKey]: RetType} =>
{ return {
    [c.SexprKey]: '' as unknown as BPost
  , [c.ValueKey]: (lf[c.ValueKey][c.FnKey] as unknown as F[c.ValueKey][c.FnKey])(a[c.ValueKey]) as unknown as RetType
}}



// ----------------
// -- getter
// ----------------
export type Foxelement =
{
  [c.SexprKey]: string
, [c.ValueKey]: ut.Primitive | unknown[] | Record<PropertyKey, unknown> | Function
} | Foxfn

export type Foxfn =
{ [c.SexprKey]: string
    , [c.ValueKey]: { [c.PreKey]: string | string[]
                , [c.FnKey]: Function } }

export type GetPre<S extends Foxfn> = S[c.ValueKey][c.PreKey]
export type GetFn<S extends Foxfn>  = S[c.SexprKey]

export * as foxp from './foxp'
