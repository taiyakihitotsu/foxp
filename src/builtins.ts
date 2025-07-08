import * as c from './const'
import * as foxp from './foxp'
import type Cion from '@taiyakihitotsu/cion'
import * as u from './util'
import * as ut from './type-util'
import * as pre from './pre'
import * as merge from './merge'
import * as compiler from './compiler'

// export type DivF<N extends string|number> = `(fn [n] (/ n ${N}))`
// export const DivF = (n:number) => (m: number): number => m / n

// ----------------
// -- util part
// ----------------

export type N0 = 0
export type N1 = N0 | 1
export type N2 = N1 | 2
export type N3 = N2 | 3
export type N4 = N3 | 4

export type ForceStr<S> = S extends string ? S : never
export type FS<S>  = ForceStr<S>
export type FN4<S> = S extends N4 ? S : never
export type Add<N extends string, M extends string> = `(+ ${N} ${M})`
// [todo] move to foxp.ts
export type FoxTypeExt = {[c.SexprKey]: string, [c.ContKey]: string, [c.FnFlagKey]: boolean, [c.ValueKey]: unknown}

export type AssignSym<
  Type
, Sym> = 
  Sym extends FoxTypeExt
    ? { [c.SexprKey]: Sym[c.SexprKey]
      , [c.ContKey]: Sym[c.ContKey]
      , [c.FnFlagKey]: Sym[c.FnFlagKey]
      , [c.ValueKey]: Type}
  : never

export type IsSymbol<
  Data> =
  Data extends FoxTypeExt
    ? Symbol extends Data[c.ValueKey]
      ? true
    : false
  : never

export type ForceAssign<
  Type
, Data> =
  Data extends FoxTypeExt
    ? true extends IsSymbol<Data>
      ? AssignSym<Type, Data>
    : Data
  : never

export type FoxWith<
  P
, N> =
  { [c.SexprKey]: (N extends FoxTypeExt ? N : never)[c.SexprKey]
  , [c.ContKey] : (N extends FoxTypeExt ? N : never)[c.ContKey]
  , [c.FnFlagKey]: Symbol extends P ? true : false
//  , [c.FnFlagKey]: (N extends FoxTypeExt ? N : never)[c.FnFlagKey] extends true ? true : Symbol extends P ? true : false
  , [c.ValueKey]: P }

export const rfoxposs = <RetS, RetV, Cont, Flag>(n: RetV): 
  { [c.SexprKey]: RetS
  , [c.ContKey]: Cont
  , [c.FnFlagKey]: Flag
  , [c.ValueKey]: RetV} => (
  { [c.SexprKey]: '' as RetS
  , [c.ContKey]: '' as Cont
  , [c.FnFlagKey]: '' as Flag
  , [c.ValueKey]: n})

// ----------------
// -- Gen Cont
// ----------------
//
// [note]
// - This is for def `fn`
// - Args should be string like 'x y z'
export type GenCont<
  M extends {pre: string, sexpr: string, args: string}> = 
  `(if (and (every? some? [${M['args']}]) (${M['pre']} ${M['args']})) (${M['sexpr']} ${M['args']}) nil)`
// [note]
// This type-level function provides a fixed-length argument list Arguments for a variadic function type fn, making its arguments fixed-length instead of variadic.
export type UnrollArgsStr<
  narg extends N4
, Key  extends c.SexprKey | c.ContKey
, Arg0
, Arg1
, Arg2
, Arg3> =
  [Arg0, Arg1, Arg2, Arg3] extends infer MA extends [{[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}]
    ? `${narg extends N0 ? '' : `${FS<MA[0][Key]>}`}${narg extends N1 ? '' :  ` ${FS<MA[1][Key]>}`}${narg extends N2 ? '' :  ` ${FS<MA[2][Key]>}`}${narg extends N3 ? '' :  ` ${FS<MA[3][Key]>}`}`
  : never

export type ExpandPre<narg extends N4> = (narg extends N0 ? '' : narg extends N1 ? ([string] | readonly [string]) : narg extends N2 ? ([string, string] | readonly [string, string]) : ([string, string, string] | readonly [string, string, string])) | string

export type GetFlag<A> = A extends FoxTypeExt ? ut.Equal<A[c.FnFlagKey], true> extends true ? true : IsSymbol<A> extends true ? true : false : false

// [note]
// this is from v0.3.0
// if you want to check the unroll version, see there.
// [note]
// this is named `fn` currently but I'll be changed.
export const fn = <
  SexprFunction extends string
, DefaultPre extends string
, narg = pre.countArgs<DefaultPre>
>(num: narg) =>
<a0, a1, a2, a3, ret>
(f: narg extends N0 ? () => ret : narg extends N1 ? (w: a0) => ret : narg extends N2 ? (w: a0, x:a1) => ret : narg extends N3 ? (w: a0, x:a1, y:a2) => ret : (w: a0, x:a1, y:a2, z:a3) => ret) => <
Pre extends string = DefaultPre
>() =>
< Arg0 extends FoxWith<true extends IsSymbol<Arg0> ? Symbol : narg extends N0 ? never : a0, Arg0>
, Arg1 extends FoxWith<true extends IsSymbol<Arg1> ? Symbol : narg extends N1 ? never : a1, Arg1>
, Arg2 extends FoxWith<true extends IsSymbol<Arg2> ? Symbol : narg extends N2 ? never : a2, Arg2>
, Arg3 extends FoxWith<true extends IsSymbol<Arg3> ? Symbol : narg extends N3 ? never : a3, Arg3>
// < Arg0 extends FoxWith<a0, Arg0>
// , Arg1 extends FoxWith<a1, Arg1>
// , Arg2 extends FoxWith<a2, Arg2>
// , Arg3 extends FoxWith<a3, Arg3>
//, IsQuote extends (ut.Equal<(GetFlag<Arg0> | GetFlag<Arg1> | GetFlag<Arg2> | GetFlag<Arg3>), false>) extends true ? false : true
, IsQuote extends [GetFlag<Arg0>, GetFlag<Arg1>, GetFlag<Arg2>, GetFlag<Arg3>] extends [false, false, false, false] ? false : true
, UnrollArgsStrResult extends UnrollArgsStr<FN4<narg>, c.SexprKey, Arg0, Arg1, Arg2, Arg3>
, UnrollContStrResult extends UnrollArgsStr<FN4<narg>, c.ContKey, Arg0, Arg1, Arg2, Arg3>
, PreCountCheck extends narg extends pre.countArgs<Pre> ? true : false
// , SexprR extends PreCountCheck extends false ? {error: 'PreCountFailure'} : Cion.Lisp<`(${SexprFunction}${narg extends N0 ? '' : ` ${UnrollArgsStrResult}`})`>
, _SexprR extends `(${SexprFunction}${narg extends N0 ? '' : ` ${UnrollArgsStrResult}`})`
, SexprR extends PreCountCheck extends false ? {error: 'PreCountFailure'} : IsQuote extends true ? _SexprR : Cion.Lisp<_SexprR>
, PreResult extends `(${Pre} ${UnrollArgsStrResult})`
, ContResult extends GenCont<{args: UnrollArgsStrResult, sexpr: SexprFunction, pre: Pre}>
, Ret0 = narg extends N0 ? never : true extends IsQuote ? Arg0 : (Cion.Lisp<PreResult> extends ('nil' | 'false' | {error: string} ) ? never : Arg0)
, Ret1 = Arg1
, Ret2 = Arg2
, Ret3 = Arg3
> ( w?: Arg0 extends Ret0 ? Arg0 : never
  , x?: Arg1 extends Ret1 ? Arg1 : never
  , y?: Arg2 extends Ret2 ? Arg2 : never
  , z?: Arg3 extends Ret3 ? Arg3 : never)
: { [c.SexprKey]: SexprR
  , [c.ContKey]: ContResult
  , [c.ValueKey]: ret
//  , [c.ValueKey]: [GetFlag<Arg0>, GetFlag<Arg1>, GetFlag<Arg2>, GetFlag<Arg3>, IsQuote]
  , [c.FnFlagKey]: IsQuote} => rfoxposs<SexprR, ret, ContResult, IsQuote>(
  num === 0
    ? ((f as () => ret)())
  : num === 1
    ? ((f as (w: a0) => ret)(w![c.ValueKey] as a0))
  : num === 2
    ? ((f as (w: a0, x: a1) => ret)(w![c.ValueKey] as a0, x![c.ValueKey] as a1))
  : num === 3
    ? ((f as (w: a0, x: a1, y: a2) => ret)
       ( w![c.ValueKey] as a0
       , x![c.ValueKey] as a1
       , y![c.ValueKey] as a2))
  : ((f as (w: a0, x: a1, y: a2, z: a3) => ret)
     ( w![c.ValueKey] as a0
     , x![c.ValueKey] as a1
     , y![c.ValueKey] as a2
     , z![c.ValueKey] as a3)))

const aa: ut.Equal<false | false, false> = true


// -----------------------------
// -- builtins: arithmetic
// -----------------------------

export const add = fn<'+', pre.bi.add>(2)((n: number, m:number) => n + m)
export const sub = fn<'-', pre.bi.sub>(2)((n: number, m:number) => n - m)
export const mul = fn<'*', pre.bi.mul>(2)((n: number, m:number) => n * m)
export const div = fn<'/', pre.bi.div>(2)((n: number, m:number) => n / m)

// [todo]
const lambdatest0 = <N>(n: N) => add()(foxp.putPrim(1), foxp.putSym('n', n))
const lambdatest1 = <N>(n: N) => add()(foxp.putPrim(1), foxp.putPrim(1))

// ---------------------
// -- builtins: coll fn
// ---------------------

export const assoc = fn<'assoc', pre.bi.assoc, 3>(3)((m,k,v) => u.assoc([m,k,v]))
// [todo]
export const update = fn<'update', pre.bi.update>(3)((m,k,f: {fn: unknown}) => u.update([m,k,f![c.FnKey]]))
export const assocIn = fn<'assoc-in', pre.bi.assocIn>(3)((m,k,v) => u.assocIn([m,k,v]))
// [todo]
export const updateIn = fn<'update-in', pre.bi.updateIn>(3)((m,k,f: {fn: unknown}) => u.updateIn([m,k,f![c.FnKey]]))
export const get = fn<'get', pre.bi.get>(2)((m,k) => u.get([m,k]))
export const getIn = fn<'get-in', pre.bi.getIn>(2)((m,k) => u.getIn([m,k]))

// -- do tests belows

export const first  = fn<'first', pre.bi.first>(1)((m) => u.get([m,0]))
export const second = fn<'second', pre.bi.second>(1)((m) => u.get([m,1]))
export const third = fn<'third', pre.bi.third>(1)((m) => u.get([m,2]))
export const last = fn<'last', pre.bi.last>(1)((m: unknown[]) => u.get([m,m.length]))

// ---------------------------
// -- builtins: comparation
// ---------------------------

export const gt  = fn<'>',  pre.bi.gt>(2)((x:number,y:number) => x > y)
export const lt  = fn<'<',  pre.bi.lt>(2)((x:number,y:number) => x < y)
export const eq  = fn<'=',  pre.bi.eq>(2)((x:unknown, y:unknown) => x === y)
export const gte = fn<'>=', pre.bi.gte>(2)((x:number,y:number) => x >= y)
export const lte = fn<'<=', pre.bi.lte>(2)((x:number,y:number) => x <= y)
export const mod = fn<'mod', pre.bi.mod>(2)(u.mod)
export const rem = fn<'rem', pre.bi.rem>(2)((x:number,y:number) => x % y)
export const trunc = fn<'trunc', pre.bi.trunc>(1)(Math.trunc) 
export const floor = fn<'floor', pre.bi.floor>(1)(Math.floor)
export const abs = fn<'abs', pre.bi.abs>(1)(Math.abs)



// -----------------------
// -- builtins: logical
// -----------------------

export const and = fn<'and', pre.bi.and>(2)((x:boolean,y:boolean) => x && y)
export const or  = fn<'or',  pre.bi.or>(2)((x:boolean,y:boolean) => x || y)
export const not = fn<'not', pre.bi.not>(1)((x:boolean) => !x)

// -------------------
// -- builtins: cond
// -------------------

export const If  = fn<'if', pre.bi.If>(3)((x,y,z) => x ? y : z)
// export const loop

// -----------------------
// -- builtins: fmap
// -----------------------
export const map = fn<'map', pre.bi.map>(2)((f: {fn: (x:unknown) => unknown}, m:unknown[]) => m.map(f![c.FnKey]))
export const filter = fn<'filter', pre.bi.filter>(2)((f: {fn: (x:unknown) => unknown}, m:unknown[]) => m.filter(f![c.FnKey]))
export const remove = fn<'remove', pre.bi.remove>(2)((f: {fn: (x:unknown) => unknown}, m:unknown[]) => m.filter((a) => !(f![c.FnKey](a))))
// reduce
export const reduce = fn<'reduce', pre.bi.reduce>(3)((f: {fn: (x:unknown) => unknown}, i: unknown, m:unknown[]) => m.reduce(f![c.FnKey], i))

// -----------------------
// -- check
// -----------------------

// number?, string?, vector?, map?, fn?, ifn?, nat-int?, pos-int?, neg-int?, odd?, even?, zero?, keyword?, empty?, boolean?, type, every?, some, nil?, some?

// ----------------------
// -- string
// -----------------------

// ----------------------
// -- builtins: data
// ----------------------

// export const keys
// export const count
// export const drop
// export const take
// export const reverse
// export const conj
// export const concat
// export const interleave





export * as builtins from './builtins'













