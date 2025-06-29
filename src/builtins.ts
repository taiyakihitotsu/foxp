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

// --------------------
// -- builtins : culc
// --------------------

export type N0 = 0
export type N1 = N0 | 1
export type N2 = N1 | 2
export type N3 = N2 | 3
export type N4 = N3 | 4

// [note]
// this is from v0.3.0
// if you want to check the unroll version, see there.
export const _macro = <
  SexprFunction extends string
, DefaultPre extends [string, string] | readonly [string, string] | string
, narg extends N4
>(num: narg) =>
<a0, a1, a2, a3, ret>
(f: narg extends N0 ? () => ret : narg extends N1 ? (w: a0) => ret : narg extends N2 ? (w: a0, x:a1) => ret : narg extends N3 ? (w: a0, x:a1, y:a2) => ret : (w: a0, x:a1, y:a2, z:a3) => ret) =>
<
  Pre extends [string, string] | readonly [string, string] | string = pre.add
>() =>
< Arg0 extends FoxWith<a0, Arg0>
, Arg1 extends FoxWith<a1, Arg1>
, Arg2 extends FoxWith<a2, Arg2>
, Arg3 extends FoxWith<a3, Arg3>
, UnrollArgsStr extends `${narg extends N0 ? '' : ` ${FS<Arg0[c.SexprKey]>}`}${narg extends N1 ? '' :  ` ${FS<Arg1[c.SexprKey]>}`}${narg extends N2 ? '' :  ` ${FS<Arg2[c.SexprKey]>}`}${narg extends N3 ? '' :  ` ${FS<Arg3[c.SexprKey]>}`}`
, SexprR extends Cion.Lisp<`(${SexprFunction}${narg extends N0 ? '' : ` ${FS<Arg0[c.SexprKey]>}`}${narg extends N1 ? '' :  ` ${FS<Arg1[c.SexprKey]>}`}${narg extends N2 ? '' :  ` ${FS<Arg2[c.SexprKey]>}`}${narg extends N3 ? '' :  ` ${FS<Arg3[c.SexprKey]>}`})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Pre2 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg2[c.SexprKey]>}])` : `(${Pre[2]} ${ForceStr<Arg2[c.SexprKey]>})`
, Pre3 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg3[c.SexprKey]>}])` : `(${Pre[3]} ${ForceStr<Arg3[c.SexprKey]>})`
, Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1), Ret2 = Pre[2] extends '' ? Arg2 : (Cion.Lisp<Pre2> extends ('nil' | 'false') ? never : Arg2)
, Ret3 = Pre[3] extends '' ? Arg3 : (Cion.Lisp<Pre3> extends ('nil' | 'false') ? never : Arg3)>
( w?: Arg0 extends Ret0 ? Arg0 : never
, x?: Arg1 extends Ret1 ? Arg1 : never
, y?: Arg2 extends Ret2 ? Arg2 : never
, z?: Arg3 extends Ret3 ? Arg3 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ret} => rfoxposs<SexprR, ret>(num === 0 ? (f as () => ret)() : num === 1 ? (f as (w: a0) => ret)(w![c.ValueKey]) : num === 2 ? (f as (w: a0, x: a1) => ret)(w![c.ValueKey], x![c.ValueKey]) : num === 3 ? (f as (w: a0, x: a1, y: a2) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey]) : (f as (w: a0, x: a1, y: a2, z: a3) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey], z![c.ValueKey]))

export const add = _macro<'+', pre.add, 2>(2)((n: number, m:number) => n + m)

// export const add = <
//   Pre extends [string, string] | readonly [string, string] | string = pre.add
// >() =>
// < Arg0 extends FoxWith<number, Arg0>
// , Arg1 extends FoxWith<number, Arg1>
// , SexprR extends Cion.Lisp<`(+ ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
// , Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
// , Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
// , Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
// , Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)>
// ( n: Arg0 extends Ret0 ? Arg0 : never
// , m: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: number} => rfoxposs<SexprR, number>(n[c.ValueKey] + m[c.ValueKey])

export const sub = <
  Pre extends [string, string] | readonly [string, string] | string = pre.sub
>() =>
< Arg0 extends FoxWith<number, Arg0>
, Arg1 extends FoxWith<number, Arg1>
, SexprR extends Cion.Lisp<`(- ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)>
( n: Arg0 extends Ret0 ? Arg0 : never
, m: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: number} => rfoxposs<SexprR, number>(n[c.ValueKey] - m[c.ValueKey])

export const mul = <
  Pre extends [string, string] | readonly [string, string] | string = pre.mul
>() =>
< Arg0 extends FoxWith<number, Arg0>
, Arg1 extends FoxWith<number, Arg1>
, SexprR extends Cion.Lisp<`(* ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)>
( n: Arg0 extends Ret0 ? Arg0 : never
, m: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: number} => rfoxposs<SexprR, number>(n[c.ValueKey] * m[c.ValueKey])

export const div = <
  Pre extends [string, string] | readonly [string, string] | string = pre.div
>() =>
< Arg0 extends FoxWith<number, Arg0>
, Arg1 extends FoxWith<number, Arg1>
, SexprR extends Cion.Lisp<`(/ ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
// , Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)>
( n: Arg0 extends Ret0 ? Arg0 : never
, m: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: number} => rfoxposs<SexprR, number>(n[c.ValueKey] / m[c.ValueKey])


// ---------------------
// -- builtins: coll fn
// ---------------------

export const assoc = <
  Pre extends string = pre.assoc
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<string|number, Arg1>
, Arg2 extends FoxWith<unknown, Arg2>
, SexprR extends Cion.Lisp<`(assoc ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>} ${FS<Arg2[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>} ${ForceStr<Arg2[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, Ret2 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg2
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never
, v: Arg2 extends Ret2 ? Arg2 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.assoc([m[c.ValueKey], k[c.ValueKey], v[c.ValueKey]]))

export const update = <
  Pre extends string = pre.update
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<string|number, Arg1>
, Arg2 extends foxp.Foxfn
, SexprR extends Cion.Lisp<`(update ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>} ${FS<Arg2[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>} ${ForceStr<Arg2[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, Ret2 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg2
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never
, v: Arg2 extends Ret2 ? Arg2 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.update([m[c.ValueKey], k[c.ValueKey], v[c.ValueKey][c.FnKey]]))

export const assocIn = <
  Pre extends string = pre.assocIn
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<(string|number)[] | readonly (string|number)[], Arg1>
, Arg2 extends FoxWith<unknown, Arg2>
, SexprR extends Cion.Lisp<`(assoc-in ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>} ${FS<Arg2[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>} ${ForceStr<Arg2[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, Ret2 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg2
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never
, v: Arg2 extends Ret2 ? Arg2 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.assocIn([m[c.ValueKey], k[c.ValueKey], v[c.ValueKey]]))

export const updateIn = <
  Pre extends string = pre.updateIn
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<(string|number)[] | readonly (string|number)[], Arg1>
, Arg2 extends foxp.Foxfn
, SexprR extends Cion.Lisp<`(update-in ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>} ${FS<Arg2[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>} ${ForceStr<Arg2[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, Ret2 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg2
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never
, v: Arg2 extends Ret2 ? Arg2 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.updateIn([m[c.ValueKey], k[c.ValueKey], v[c.ValueKey][c.FnKey]]))

export const get = <
  Pre extends string = pre.get
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<string|number, Arg1>
, SexprR extends Cion.Lisp<`(get ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.get([m[c.ValueKey], k[c.ValueKey]]))

export const getIn = <
  Pre extends string = pre.getIn
>() =>
< Arg0 extends FoxWith<Record<PropertyKey, unknown> | ut.Tuple, Arg0>
, Arg1 extends FoxWith<(string|number)[] | readonly (string|number)[], Arg1>
, SexprR extends Cion.Lisp<`(get-in ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Check extends string = `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])`
, Ret0 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg0
, Ret1 = Cion.Lisp<Check> extends ('nil' | 'false' | {error: string}) ? never : Arg1
, ReturnValue = compiler.Ltc<SexprR extends string ? SexprR : ''>>
( m: Arg0 extends Ret0 ? Arg0 : never
, k: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: ReturnValue} => rfoxposs<SexprR, ReturnValue>(u.getIn([m[c.ValueKey], k[c.ValueKey]]))

export const compare = <
  Sig extends '>' | '<' | '=' | '>=' | '<=' = '>'
>(sig: Sig) => <
  Pre extends [string, string] | readonly [string, string] | string = pre.compare
>() =>
< Arg0 extends FoxWith<number, Arg0>
, Arg1 extends FoxWith<number, Arg1>
, SexprR extends Cion.Lisp<`(${Sig} ${FS<Arg0[c.SexprKey]>} ${FS<Arg1[c.SexprKey]>})`>
, Pre0 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg0[c.SexprKey]>}])` : `(${Pre[0]} ${ForceStr<Arg0[c.SexprKey]>})`
, Pre1 extends string = Pre extends string ? `(${Pre} [${ForceStr<Arg0[c.SexprKey]>} ${ForceStr<Arg1[c.SexprKey]>}])` : `(${Pre[1]} ${ForceStr<Arg1[c.SexprKey]>})`
, Ret0 = Pre[0] extends '' ? Arg0 : (Cion.Lisp<Pre0> extends ('nil' | 'false') ? never : Arg0)
, Ret1 = Pre[1] extends '' ? Arg1 : (Cion.Lisp<Pre1> extends ('nil' | 'false') ? never : Arg1)>
( n: Arg0 extends Ret0 ? Arg0 : never
, m: Arg1 extends Ret1 ? Arg1 : never): {[c.SexprKey]: SexprR, [c.ValueKey]: boolean} => rfoxposs<SexprR, boolean>(sig === '>' ? n[c.ValueKey] > m[c.ValueKey] : sig === '<' ?  n[c.ValueKey] < m[c.ValueKey] : sig === '=' ?  n[c.ValueKey] === m[c.ValueKey] : sig === '>=' ?  n[c.ValueKey] >= m[c.ValueKey] :  n[c.ValueKey] <= m[c.ValueKey])

export const gt = compare('>')
export const lt = compare('<')
export const eq = compare('=')
export const gte = compare('>=')
export const lte = compare('<=')

export * as builtins from './builtins'
