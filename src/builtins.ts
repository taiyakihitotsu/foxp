import * as c from './const'
import * as foxp from './foxp'
import type Cion from '@taiyakihitotsu/cion'
import * as u from './util'
import * as ut from './type-util'
import * as compiler from './compiler'
import * as pre from './pre'

export type DivF<N extends string|number> = `(fn [n] (/ n ${N}))`
export const DivF = (n:number) => (m: number): number => m / n

// ----------------
// -- util part
// ----------------
export type ForceStr<S> = S extends string ? S : never
export type FS<S> = ForceStr<S>
export type Add<N extends string, M extends string> = `(+ ${N} ${M})`
export type FoxWith<
  P
, N> =
{ [c.SexprKey]: (N extends {[c.SexprKey]: string} ? N : never)[c.SexprKey]
    , [c.ValueKey]: P }
export const rfoxposs = <RetS, RetV>(n: RetV): {[c.SexprKey]: RetS, [c.ValueKey]: RetV} => ({[c.SexprKey]: '' as RetS, [c.ValueKey]: n})

type sep<n extends number> = `${n}` extends `${infer n0}${infer n1}${infer n2}` ? [n0, n1, n2] : []
type aaa = sep<123>


// --------------------
// -- builtins : culc
// --------------------

export type N0 = 0
export type N1 = N0 | 1
export type N2 = N1 | 2
export type N3 = N2 | 3
export type N4 = N3 | 4

export type ExpandPre<narg extends N4> = (narg extends N0 ? '' : narg extends N1 ? ([string] | readonly [string]) : narg extends N2 ? ([string, string] | readonly [string, string]) : ([string, string, string] | readonly [string, string, string])) | string

export type t4 = string | [string] | readonly [string] |
[string, string] | readonly [string, string] |
[string, string, string] | readonly [string, string, string] |
[string, string, string, string] | readonly [string, string, string, string]

// [note]
// this is from v0.3.0
// if you want to check the unroll version, see there.
// [note]
// this is named `fn` currently but I'll be changed.
export const fn = <
  SexprFunction extends string
, DefaultPre extends t4
, narg extends N4
>(num: narg) =>
<a0, a1, a2, a3, ret>
(f: narg extends N0 ? () => ret : narg extends N1 ? (w: a0) => ret : narg extends N2 ? (w: a0, x:a1) => ret : narg extends N3 ? (w: a0, x:a1, y:a2) => ret : (w: a0, x:a1, y:a2, z:a3) => ret) => <
Pre extends t4 = DefaultPre
>() =>
< Arg0 extends FoxWith<a0, Arg0>
, Arg1 extends FoxWith<a1, Arg1>
, Arg2 extends FoxWith<a2, Arg2>
, Arg3 extends FoxWith<a3, Arg3>
, UnrollArgsStr extends `${narg extends N0 ? '' : `${FS<Arg0[c.SexprKey]>}`}${narg extends N1 ? '' :  ` ${FS<Arg1[c.SexprKey]>}`}${narg extends N2 ? '' :  ` ${FS<Arg2[c.SexprKey]>}`}${narg extends N3 ? '' :  ` ${FS<Arg3[c.SexprKey]>}`}`
, SexprR extends Cion.Lisp<`(${SexprFunction}${narg extends N0 ? '' : ` ${UnrollArgsStr}`})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${UnrollArgsStr}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${UnrollArgsStr}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Pre2 extends string = Pre extends string ? `(${Pre} [${UnrollArgsStr}])` : `(${Pre[2]} ${ForceStr<Arg2[c.SexprKey]>})`
, Pre3 extends string = Pre extends string ? `(${Pre} [${UnrollArgsStr}])` : `(${Pre[3]} ${ForceStr<Arg3[c.SexprKey]>})`
, Ret0 = narg extends N0 ? never : Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = narg extends N0 ? never : Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)
, Ret2 = narg extends N0 ? never : Pre[2] extends '' ? Arg2 : (Cion.Lisp<Pre2> extends ('nil' | 'false') ? never : Arg2)
, Ret3 = narg extends N0 ? never : Pre[3] extends '' ? Arg3 : (Cion.Lisp<Pre3> extends ('nil' | 'false') ? never : Arg3)>
( w?: Arg0 extends Ret0 ? Arg0 : never
, x?: Arg1 extends Ret1 ? Arg1 : never
, y?: Arg2 extends Ret2 ? Arg2 : never
, z?: Arg3 extends Ret3 ? Arg3 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ret} => rfoxposs<SexprR, ret>(
  num === 0
    ? ((f as () => ret)())
  : num === 1
    ? ((f as (w: a0) => ret)(w![c.ValueKey]))
  : num === 2
    ? ((f as (w: a0, x: a1) => ret)(w![c.ValueKey], x![c.ValueKey]))
  : num === 3
    ? ((f as (w: a0, x: a1, y: a2) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey]))
  : ((f as (w: a0, x: a1, y: a2, z: a3) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey], z![c.ValueKey])))

export const add = fn<'+', pre.add, 2>(2)((n: number, m:number) => n + m)
export const sub = fn<'-', pre.sub, 2>(2)((n: number, m:number) => n - m)
export const mul = fn<'*', pre.mul, 2>(2)((n: number, m:number) => n * m)
export const div = fn<'/', pre.div, 2>(2)((n: number, m:number) => n / m)

// ---------------------
// -- builtins: coll fn
// ---------------------

export const assoc = fn<'assoc', pre.assoc, 3>(3)((m,k,v) => u.assoc([m,k,v]))
// [todo]
export const update = fn<'update', pre.update, 3>(3)((m,k,f: {fn: unknown}) => u.update([m,k,f![c.FnKey]]))
export const assocIn = fn<'assoc-in', pre.assocIn, 3>(3)((m,k,v) => u.assocIn([m,k,v]))
// [todo]
export const updateIn = fn<'update-in', pre.updateIn, 3>(3)((m,k,f: {fn: unknown}) => u.updateIn([m,k,f![c.FnKey]]))
export const get = fn<'get', pre.get, 2>(2)((m,k) => u.get([m,k]))
export const getIn = fn<'get-in', pre.getIn, 2>(2)((m,k) => u.getIn([m,k]))
// export const first  = fn<'first', pre.first, 1>(1)((m) => u.get([m,0]))
// export const second = fn<'second', pre.second, 1>(1)((m) => u.get([m,1]))
// export const last = fn<'last', pre.last, 1>(1)((m: unknown[]) => u.get([m,m.length]))

// ---------------------------
// -- builtins: comparation
// ---------------------------

export const gt  = fn<'>',  pre.gt,  2>(2)((x:number,y:number) => x > y)
export const lt  = fn<'<',  pre.lt,  2>(2)((x:number,y:number) => x < y)
export const eq  = fn<'=',  pre.eq,  2>(2)((x:unknown, y:unknown) => x === y)
export const gte = fn<'>=', pre.gte, 2>(2)((x:number,y:number) => x >= y)
export const lte = fn<'<=', pre.lte, 2>(2)((x:number,y:number) => x <= y)

// -----------------------
// -- builtins: logical
// -----------------------
// and, or, not

// -----------------------
// -- builtins: fmap
// -----------------------
// map, filter, remove, reduce



export * as builtins from './builtins'
