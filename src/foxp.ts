import type Cion from '@taiyakihitotsu/cion'
import type { typeUtil } from './type-util'
import * as compiler from './compiler'
import { const as c } from './const'
import * as ut from './type-util'

// -------------
// -- LispWrap
// -------------
//
// value -> singleton type -> Cion Lisp Sexpr

export type _LispString<S extends string> = `'${S}'`
export type ToLispString<T extends ut.Primitive> = T extends `:${infer K}` ? `:${K}` : T extends string ? _LispString<T> : `${T}`

export type LispWrapedMapWith<T> = {[c.SexprKey]: typeUtil.RtoS<T>, [c.ValueKey]: T}
export type LispWrapedVecWith<T extends ut.Tuple> = {[c.SexprKey]: typeUtil.VtoS<T>, value: T}
// type LispWrapedVecWith<T extends ut.Tuple> = {[c.SexprKey]: typeUtil.VtoS<ut.ForceTuple<T>>, value: ut.ForceTuple<T>}
export type LispWrapedFnValue<Pre, T> = {fn : T, pre : Pre}
export type LispWrapedFnWith<Pre, F, T> = {[c.SexprKey]: F, [c.ValueKey]: LispWrapedFnValue<Pre, T>}
export type LispWrapedPrimWith<T extends ut.Primitive> = {[c.SexprKey]: ToLispString<T>, [c.ValueKey]: T}

export const putRecord = <
 V extends Record<PropertyKey, unknown>
> (v: V extends (ut.ForceReadRecord<V> extends never ? never : V) ? V : never): LispWrapedMapWith<V> => ({[c.SexprKey]: '' as typeUtil.RtoS<V>, [c.ValueKey]: v})

// [note]
// see `ForceTuple` in `type-util.ts`.
// it's the different that this accept emptys `[]`.
export const putVec = <
  V extends unknown[] | readonly unknown[]
, Vpre extends (ut.ForceTuple<V> extends never ? V['length'] extends 0 ? V : never : V)
, Vpass extends (V extends ut.Tuple ? V : never)>
  (v: V extends Vpre ? V : never): LispWrapedVecWith<Vpass> => ({[c.SexprKey]: '' as typeUtil.VtoS<Vpass>, [c.ValueKey]: v as unknown as Vpass})

const _putFn1 = <Pre, F, T>(f:T): LispWrapedFnWith<Pre,F,T> => ({[c.SexprKey]: '' as F, [c.ValueKey]: {[c.FnKey]: f as T, [c.PreKey]: '' as Pre}})
export const putFn1 = <Pre,F>() => <T>(f:T): LispWrapedFnWith<Pre,F,T> => _putFn1<Pre,F,T>(f)

export const putPrim = <V extends ut.Primitive>(v: V): LispWrapedPrimWith<V> => ({[c.SexprKey]: '' as ToLispString<V>, [c.ValueKey]: v})

// --------------------------
// -- type check id
// --------------------------

export const tid = <
  T extends string
>() =>
< U extends {[c.SexprKey]: U[c.SexprKey]}>
( value: U extends (Cion.Lisp<`(${T} ${U[c.SexprKey] extends string ? U[c.SexprKey] : never})`> extends ('false' | 'nil' | {error: string}) ? never : U) ? U : never): U => value

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
            , [c.ValueKey]: S[c.ValueKey]}
, F extends { [c.SexprKey]: string
	    , [c.ValueKey]: { [c.PreKey] : string | string[]
                            , [c.FnKey]: Function}}
, _RetType extends compiler.Ltc<BPost extends string ? BPost : ''>
, RetType extends (_RetType extends Function ? {[c.PreKey]: F[c.ValueKey][c.PreKey][1], [c.FnKey]: _RetType} : _RetType)
, BPre extends `(${F[c.ValueKey][c.PreKey] extends string ? F[c.ValueKey][c.PreKey] : F[c.ValueKey][c.PreKey][0]} ${S[c.SexprKey]})`
, BPost extends Cion.Lisp<`(${F[c.SexprKey]} ${S[c.SexprKey]})`>>
  ( lf: F
  , a: S extends (Cion.Lisp<BPre> extends ('false' | 'nil' | {error: string}) ? never : S) ? S : never)
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
