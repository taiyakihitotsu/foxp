import * as c from './const'
import type Cion from '@taiyakihitotsu/cion'
import * as u from './util'
import * as bb from './builtins-bodies'
import type * as ut from './type-util'
import * as pre from './pre'

// ----------------
// -- util part
// ----------------

export type ForceStr<S> = S extends string ? S : never
export type FS<S>  = ForceStr<S>
export type FN4<S> = S extends ut.N4 ? S : never
export type Add<N extends string, M extends string> = `(+ ${N} ${M})`

export type FoxTypeExt = {[c.SexprKey]: string, [c.ContKey]: string, [c.FnFlagKey]: unknown, [c.ValueKey]: unknown, [c.HofFlag]: boolean}
export type FoxFnTypeExt = {[c.SexprKey]: string, [c.ContKey]: string, [c.FnFlagKey]: unknown, [c.ValueKey]: {[c.PreKey]: string, [c.FnKey]: LambdaReturnExt<unknown>}, [c.HofFlag]: boolean}
export type HofTypeExt = {[c.SexprKey]: string, [c.ContKey]: string, [c.FnFlagKey]: unknown, [c.ValueKey]: unknown, [c.HofFlag]: boolean, env: string}
export type HofFnTypeExt = {[c.SexprKey]: string, [c.ContKey]: string, [c.FnFlagKey]: unknown, [c.ValueKey]: {[c.PreKey]: string, [c.FnKey]: LambdaReturnExt<unknown>}, [c.HofFlag]: boolean, env: string}


export type LambdaReturnExt<ReturnT> = ReturnT | (() => LambdaReturnExt<ReturnT>) | ((w: ReturnT) => LambdaReturnExt<ReturnT>) | ((w: ReturnT, x: ReturnT) => LambdaReturnExt<ReturnT>) | ((w: ReturnT, x: ReturnT, y: ReturnT) => LambdaReturnExt<ReturnT>) | ((w: ReturnT, x: ReturnT, y: ReturnT, z: ReturnT) => LambdaReturnExt<ReturnT>)

export type AssignSym<
  Type
, Sym> =
  Sym extends FoxTypeExt
    ? { [c.SexprKey]: Sym[c.SexprKey]
      , [c.ContKey]: Sym[c.ContKey]
      , [c.FnFlagKey]: Sym[c.FnFlagKey]
      , [c.ValueKey]: Type
      , [c.HofFlag]: false }
  : never

// [note] Symbol may have (null | undefined) unintentionally.
export type IsSymbol<
  Data> =
  Data extends FoxTypeExt
    ? ut.Equal<Symbol, Data[c.ValueKey]> extends true
      ? ut.Equal<Data[c.SexprKey], 'nil'> extends true
        ? false
      : true
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

// [note]
// P can be unknown so we should use ut.Equal to detect a value of [c.FnFlagKey].
// 
// [note]
// [c.FnFlagKey]: ut.Equal<Symbol, P> <- this is buggy.
// This makes that updated object has {[c.FnFlagKey]: false} and object[c.FnFlayKey] is true at the same time on the type level, in TypeScript:v5.8.3.
// It should be considered more deeply.
export type FoxWith<
  P
, N> =
{ [c.SexprKey]: (N extends FoxTypeExt ? N : never)[c.SexprKey]
    , [c.ContKey]: (N extends FoxTypeExt ? N : never)[c.ContKey]
    , [c.FnFlagKey]: ut.Equal<(N extends FoxTypeExt ? N : never)[c.FnFlagKey], true> extends true ? true : ut.Equal<Symbol,P> extends true ? ut.Equal<(N extends FoxTypeExt ? N : never)[c.SexprKey], 'nil'> extends true ? false : true : false
    , [c.ValueKey]: P
    , [c.HofFlag]: false }

export const rfoxposs = <RetS, RetV, Cont, Flag extends boolean>(n: RetV): 
  { [c.SexprKey]: RetS
  , [c.ContKey]: Cont
  , [c.FnFlagKey]: Flag
  , [c.ValueKey]: RetV
  , [c.HofFlag]: false} => (
  { [c.SexprKey]: '' as RetS
  , [c.ContKey]: '' as Cont
  , [c.FnFlagKey]: null as unknown as Flag
  , [c.ValueKey]: n
  , [c.HofFlag]: false})

// ----------------
// -- Gen Cont
// ----------------
//
// [note]
// - This is for def `fn`
// - Args should be string like 'x y z'
export type GenCont<
  M extends {pre: string, sexpr: string, args: string, cont: string}> =
`(if (and (every? some? [${M['args']}]) (${M['pre']} ${M['cont']})) (${M['sexpr']} ${M['args']}) nil)`

// [note]
// This type-level function provides a fixed-length argument list Arguments for a variadic function type fn, making its arguments fixed-length instead of variadic.
export type UnrollArgsStr<
  narg extends ut.N4
, Key  extends c.SexprKey | c.ContKey
, Arg0
, Arg1
, Arg2
, Arg3> =
  [Arg0, Arg1, Arg2, Arg3] extends infer MA extends [{[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}, {[c.SexprKey]: string, [c.ContKey]: string}]
    ? `${narg extends ut.N0 ? '' : `${FS<MA[0][Key]>}`}${narg extends ut.N1 ? '' :  ` ${FS<MA[1][Key]>}`}${narg extends ut.N2 ? '' :  ` ${FS<MA[2][Key]>}`}${narg extends ut.N3 ? '' :  ` ${FS<MA[3][Key]>}`}`
  : never

export type ExpandPre<narg extends ut.N4> = (narg extends ut.N0 ? '' : narg extends ut.N1 ? ([string] | readonly [string]) : narg extends ut.N2 ? ([string, string] | readonly [string, string]) : ([string, string, string] | readonly [string, string, string])) | string

// [note] `IsSymbol<A>` returns true even if it's null | undefined.
export type GetFlag<A> = A extends FoxTypeExt ? ut.Equal<A[c.FnFlagKey], true> extends true ? true : IsSymbol<A> extends true ? true : false : false

const runFn = <
  narg extends ut.N4
, a0
, a1
, a2
, a3
, ret>() => 
<
  W extends FoxWith<a0, W>
, X extends FoxWith<a1, X>
, Y extends FoxWith<a2, Y>
, Z extends FoxWith<a3, Z>
>(
  n: narg
, fn: ( narg extends ut.N0
          ? (() => ret)
        : narg extends ut.N1
          ? ((w: a0) => ret)
        : narg extends ut.N2
          ? ((w: a0, x:a1) => ret)
        : narg extends ut.N3
          ? ((w: a0, x:a1, y:a2) => ret)
        : ((w: a0, x:a1, y:a2, z:a3) => ret))
, w?: W
, x?: X
, y?: Y
, z?: Z) => (
  n === 0
    ? (fn as () => ret)()
  : n === 1
    ? (fn as (w: a0) => ret)(w![c.ValueKey])
  : n === 2
    ? (fn as (w: a0, x: a1) => ret)(w![c.ValueKey], x![c.ValueKey])
  : n === 3
    ? (fn as (w: a0, x: a1, y: a2) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey])
  : (fn as (w: a0, x: a1, y: a2, z: a3) => ret)(w![c.ValueKey], x![c.ValueKey], y![c.ValueKey], z![c.ValueKey]))

// [note]
// this is from v0.4.0
// if you want to check the unroll version, see there.
//
// [note]
// ArgN are assigned again.
// If some value of an original ArgN and a processed ArgN is contradictory, it's too difficult to debug.
// For example, it occured that `Arg0` has `{fnflag: true}` but `Arg0['fnflag']` is false -- the latter is wrong in that case.
// This depends on the timing of evaluation.
export const fn = <
  SexprFunction extends string
, DefaultPre extends string
, narg extends ut.N4 = pre.countArgs<DefaultPre>
>(num: narg) =>
<a0, a1, a2, a3, ret>
(f: (narg extends ut.N0 ? () => ret : narg extends ut.N1 ? (w: a0) => ret : narg extends ut.N2 ? (w: a0, x:a1) => ret : narg extends ut.N3 ? (w: a0, x:a1, y:a2) => ret : (w: a0, x:a1, y:a2, z:a3) => ret)) => <
Pre extends string = DefaultPre
>() =>
< Arg0 extends FoxWith<true extends IsSymbol<Arg0> ? Symbol : narg extends ut.N0 ? never : a0, Arg0>
, Arg1 extends FoxWith<true extends IsSymbol<Arg1> ? Symbol : narg extends ut.N1 ? never : a1, Arg1>
, Arg2 extends FoxWith<true extends IsSymbol<Arg2> ? Symbol : narg extends ut.N2 ? never : a2, Arg2>
, Arg3 extends FoxWith<true extends IsSymbol<Arg3> ? Symbol : narg extends ut.N3 ? never : a3, Arg3>
, IsQuote extends [GetFlag<Arg0>, GetFlag<Arg1>, GetFlag<Arg2>, GetFlag<Arg3>] extends [false, false, false, false] ? false : true
, UnrollArgsStrResult extends UnrollArgsStr<FN4<narg>, c.SexprKey, Arg0, Arg1, Arg2, Arg3>
, UnrollContStrResult extends UnrollArgsStr<FN4<narg>, c.ContKey, Arg0, Arg1, Arg2, Arg3>
, PreCountCheck extends narg extends pre.countArgs<Pre> ? true : false
, _SexprR extends `(${SexprFunction}${narg extends ut.N0 ? '' : ` ${UnrollArgsStrResult}`})`
, SexprR extends PreCountCheck extends false ? {error: 'PreCountFailure'} : IsQuote extends true ? _SexprR : Cion.Lisp<_SexprR>
, PreResult extends `(${Pre} ${UnrollArgsStrResult})`
, ContResult extends GenCont<{args: UnrollArgsStrResult, cont: UnrollContStrResult, sexpr: SexprFunction, pre: Pre}>
, Ret0 = narg extends ut.N0 ? never : true extends IsQuote ? Arg0 : (Cion.Lisp<PreResult> extends ut.LispFalsy ? never : Arg0)
, Ret1 = Arg1
, Ret2 = Arg2
, Ret3 = Arg3
> ( w?: Arg0 extends Ret0 ? Arg0 : never
  , x?: Arg1
  , y?: Arg2
  , z?: Arg3)
: { [c.SexprKey]: SexprR
  , [c.ContKey]: ContResult
  , [c.ValueKey]: ret
  , [c.FnFlagKey]: IsQuote
  , [c.HofFlag]: false} => rfoxposs<SexprR, ret, ContResult, IsQuote>
( runFn
    <narg, a0, a1, a2, a3, ret>
    ()
    ( num
    , f
    , w as FoxWith<a0, Arg0>
    , x as FoxWith<a1, Arg1>
    , y as FoxWith<a2, Arg2>
    , z as FoxWith<a3, Arg3>))

export const lambda = <
  Args extends string
, DefaultPre extends string
, narg extends ut.N4 = pre.countArgs<`(fn [${Args}])`>>(
  n: narg) => <
  Cont
, a0, a1, a2, a3
, quotedFn extends FoxTypeExt
> (
anonfn: narg extends ut.N0 ? () => quotedFn : narg extends ut.N1 ? (w: a0) => quotedFn : narg extends ut.N2 ? (w: a0, x:a1) => quotedFn : narg extends ut.N3 ? (w: a0, x:a1, y:a2) => quotedFn : (w: a0, x:a1, y:a2, z:a3) => quotedFn
  ) => <
  Pre extends string = DefaultPre
  >() => <
  FutureArg0 extends FoxWith<true extends IsSymbol<FutureArg0> ? Symbol : narg extends ut.N0 ? never : a0, FutureArg0>
, FutureArg1 extends FoxWith<true extends IsSymbol<FutureArg1> ? Symbol : narg extends ut.N1 ? never : a1, FutureArg1>
, FutureArg2 extends FoxWith<true extends IsSymbol<FutureArg2> ? Symbol : narg extends ut.N2 ? never : a2, FutureArg2>
, FutureArg3 extends FoxWith<true extends IsSymbol<FutureArg3> ? Symbol : narg extends ut.N3 ? never : a3, FutureArg3>
, IsQuote extends [GetFlag<FutureArg0>, GetFlag<FutureArg1>, GetFlag<FutureArg2>, GetFlag<FutureArg3>] extends [false, false, false, false] ? false : true

, UnrollContStrResult extends UnrollArgsStr<FN4<narg>, c.ContKey, FutureArg0, FutureArg1, FutureArg2, FutureArg3>
, _SexprR extends `((fn [${Args}] ${FS<quotedFn[c.SexprKey]>}) ${UnrollContStrResult})`
, SexprR extends IsQuote extends true ? _SexprR : Cion.Lisp<_SexprR>

, FnCont extends `((fn [${Args}] (and (${Pre} ${Args}) ${FS<quotedFn[c.ContKey]>})) ${UnrollContStrResult})`

, PreCheck extends Cion.Lisp<FnCont> extends ut.LispFalsy ? false : true
>
(
  futurearg0?: true extends IsQuote ? FutureArg0 : FutureArg0 extends (PreCheck extends true ? FutureArg0 : never) ? FutureArg0 : FnCont
, futurearg1?: FutureArg1
, futurearg2?: FutureArg2
, futurearg3?: FutureArg3)
: { [c.SexprKey]: SexprR
  , [c.ContKey]:  FnCont
  , [c.ValueKey]: quotedFn
  , [c.FnFlagKey]: IsQuote
  , [c.HofFlag]: false} =>
( runFn
    <narg, a0, a1, a2, a3, quotedFn>
    ()
    (n, anonfn, futurearg0 as FoxWith<a0, FutureArg0>, futurearg1 as FoxWith<a1, FutureArg1>, futurearg2 as FoxWith<a2, FutureArg2>, futurearg3 as FoxWith<a3, FutureArg3>) as unknown as
 { [c.SexprKey]: SexprR
  , [c.ContKey]:  FnCont
  , [c.ValueKey]: quotedFn
  , [c.HofFlag]: false
  , [c.FnFlagKey]: IsQuote})


export const hof = <
  Args extends string
, DefaultPre extends string
, narg extends ut.N4 = pre.countArgs<`(fn [${Args}])`>>(
  n: narg) =>
  < Cont, a0, a1, a2, a3, quotedFn extends FoxFnTypeExt | FoxTypeExt >
  (anonfn:
    narg extends ut.N0
      ? () => quotedFn
    : narg extends ut.N1
      ? (w: a0) => quotedFn
    : narg extends ut.N2
      ? (w: a0, x:a1) => quotedFn
    : narg extends ut.N3
      ? (w: a0, x:a1, y:a2) => quotedFn
    : (w: a0, x:a1, y:a2, z:a3) => quotedFn
  ) => (
 { [c.SexprKey]: '' as `(fn [${Args}] ${quotedFn[c.SexprKey]})`
, [c.ContKey]:'' as unknown as quotedFn[c.ContKey]
, [c.FnFlagKey]: '' as unknown as quotedFn[c.FnFlagKey]
, [c.HofFlag]: true as true
, [c.ValueKey]:
    { [c.PreKey]: '' as DefaultPre
    , [c.FnKey]:
      < FutureArg0 extends FoxWith<true extends IsSymbol<FutureArg0> ? Symbol : narg extends ut.N0 ? never : a0, FutureArg0>
      , FutureArg1 extends FoxWith<true extends IsSymbol<FutureArg1> ? Symbol : narg extends ut.N1 ? never : a1, FutureArg1>
      , FutureArg2 extends FoxWith<true extends IsSymbol<FutureArg2> ? Symbol : narg extends ut.N2 ? never : a2, FutureArg2>
      , FutureArg3 extends FoxWith<true extends IsSymbol<FutureArg3> ? Symbol : narg extends ut.N3 ? never : a3, FutureArg3>
      , IsQuote extends [GetFlag<FutureArg0>, GetFlag<FutureArg1>, GetFlag<FutureArg2>, GetFlag<FutureArg3>] extends [false, false, false, false] ? false : true
      , PreCheckSexpr extends `(${DefaultPre} ${FS<FutureArg0[c.SexprKey]>})`
>( futurearg0?: true extends IsQuote ? FutureArg0 : FutureArg0 extends (Cion.Lisp<PreCheckSexpr> extends ut.LispFalsy ? never : FutureArg0) ? FutureArg0 : {error: PreCheckSexpr}
 , futurearg1?: FutureArg1
 , futurearg2?: FutureArg2
 , futurearg3?: FutureArg3): ut.FlatRec<{env: `${Args} ${FS<FutureArg0[c.SexprKey]>}`} & quotedFn> =>
      ({ env:'' as unknown as `${Args} ${FS<FutureArg0[c.SexprKey]>}`
       , ...( runFn
        <narg, a0, a1, a2, a3, quotedFn>
        ()
        (n, anonfn, futurearg0 as FoxWith<a0, FutureArg0>, futurearg1 as FoxWith<a1, FutureArg1>, futurearg2 as FoxWith<a2, FutureArg2>, futurearg3 as FoxWith<a3, FutureArg3>))})
    }})

type ConcatEnv<Prev extends string, Now extends string> = `${Prev}${Prev extends '' ? '' : ' '}${Now}`
type LetEnv<Env extends string, Cont extends string> = `(let [${Env}] ${Cont})`

type WhenContError<
  S extends string
, SS extends string
, Cont extends string> =
never
// `(let [${`${S}${S extends '' ? '' : ' '}${SS}`}] ${Cont})`

type RunHof<
  S extends string = ''> =
<SS extends string
, B extends boolean
, FF extends boolean
, Cont extends string
, Sexpr extends string
, V>
  ( s: { [c.FnFlagKey]: FF
       , [c.ContKey]: Cont
       , [c.SexprKey]: Sexpr
       , [c.ValueKey]: V
       , [c.HofFlag]: B
       , [c.EnvKey]: SS} extends ContCheck<B,FF,S,SS,Cont,Sexpr,V>
          ? { [c.FnFlagKey]: FF
            , [c.ContKey]: Cont
            , [c.SexprKey]: Sexpr
            , [c.ValueKey]: V
            , [c.HofFlag]: B
            , [c.EnvKey]: SS} 
       : WhenContError<S,SS,Cont>
 ) => B extends true ? RunHof<ConcatEnv<S, SS>> : typeof s

export const runHof =
  < S extends string = ''>() =>
    < SS extends string
     , B extends boolean
     , FF extends boolean
     , Cont extends string
     , Sexpr extends string
     , V>
    ( s: { [c.FnFlagKey]: FF
         , [c.ContKey]: Cont
         , [c.SexprKey]: Sexpr
         , [c.ValueKey]: V
         , [c.HofFlag]: B
         , [c.EnvKey]: SS} extends ContCheck<B,FF,S,SS,Cont,Sexpr,V>
           ? { [c.FnFlagKey]: FF
             , [c.ContKey]: Cont
             , [c.SexprKey]: Sexpr
             , [c.ValueKey]: V
             , [c.HofFlag]: B
             , [c.EnvKey]: SS}
       : WhenContError<S,SS,Cont>)
      : B extends true ? RunHof<ConcatEnv<S, SS>> : typeof s =>
      ((s[c.HofFlag] === true)
       ? (runHof<ConcatEnv<S, SS>>() as RunHof<ConcatEnv<S, SS>> as (B extends true ? RunHof<ConcatEnv<S, SS>> : typeof s))
       : (s as (B extends true ? RunHof<ConcatEnv<S, SS>> : typeof s)))

type ContCheck<
  B extends boolean
, FF extends boolean
, S extends string
, SS extends string
, Cont extends string
, Sexpr extends string
, V> =
(
  B extends false
    ? Cion.Lisp<`(let [${`${S}${S extends '' ? '' : ' '}${SS}`}] ${Cont})`> extends ut.LispFalsy
      ? WhenContError<S,SS,Cont>
    : { [c.FnFlagKey]: FF
      , [c.ContKey]: Cont
      , [c.SexprKey]: Sexpr
      , [c.ValueKey]: V
      , [c.HofFlag]: B
      , [c.EnvKey]: SS}
  : { [c.FnFlagKey]: FF
      , [c.ContKey]: Cont
      , [c.SexprKey]: Sexpr
      , [c.ValueKey]: V
      , [c.HofFlag]: B
      , [c.EnvKey]: SS})

// -----------------------------
// -- builtins: arithmetic
// -----------------------------

export const add = fn<'+', pre.bi.add>(2)((n: number, m:number) => n + m)
export const sub = fn<'-', pre.bi.sub>(2)((n: number, m:number) => n - m)
export const mul = fn<'*', pre.bi.mul>(2)((n: number, m:number) => n * m)
export const div = fn<'/', pre.bi.div>(2)((n: number, m:number) => n / m)
export const inc = fn<'inc', pre.bi.inc>(1)((n: number) => n + 1)
export const dec = fn<'dec', pre.bi.dec>(1)((n: number) => n - 1)

// ---------------------
// -- builtins: coll fn
// ---------------------

export const assoc = fn<'assoc', pre.bi.assoc, 3>(3)((m,k,v) => u.assoc([m,k,v]))

export const update = fn<'update', pre.bi.update>(3)((m,k,f: {fn: unknown}) => u.update([m,k,f![c.FnKey]]))
export const assocIn = fn<'assoc-in', pre.bi.assocIn>(3)((m,k,v) => u.assocIn([m,k,v]))

export const updateIn = fn<'update-in', pre.bi.updateIn>(3)((m,k,f: {fn: unknown}) => u.updateIn([m,k,f![c.FnKey]]))
export const get = fn<'get', pre.bi.get>(2)((m,k) => u.get([m,k]))
export const getIn = fn<'get-in', pre.bi.getIn>(2)((m,k) => u.getIn([m,k]))

// -- do tests belows

export const first  = fn<'first', pre.bi.first>(1)((m) => u.get([m,0]))
export const second = fn<'second', pre.bi.second>(1)((m) => u.get([m,1]))
export const third = fn<'third', pre.bi.third>(1)((m) => u.get([m,2]))
export const last = fn<'last', pre.bi.last>(1)((m: (unknown[] | readonly unknown[])) => u.get([m, (m.length - 1)]))

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
export const trunc = fn<'trunc', pre.bi.trunc>(1)(bb.trunc) 
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

// -----------------------
// -- builtins: fmap
// -----------------------

// [note]
// This is an easy way to fix `44ea12d9b72c6953fb4faeef432a5d4f1b840bd2`.
// See Editor section in `DEV.md` .
export const map =
  fn<'map', pre.bi.map>
    (2)
    (bb.map)

export const filter = 
  fn<'filter', pre.bi.filter>
    (2)
    (bb.filter)

export const remove = 
  fn<'remove', pre.bi.remove>
    (2)
    (bb.remove)

export const reduce =
  fn<'reduce', pre.bi.reduce>
    (3)
    (bb.reduce)

export const some     = fn<'some', pre.bi.some>(2)(bb.some)

export const apply =
  fn<'apply', pre.bi.apply>
    (2)
    (bb.apply)

export const zipmap =
  fn<'zipmap', pre.bi.zipmap>
    (2)
    (bb.zipmap)

// -----------------------
// -- check
// -----------------------

export const isnum    = fn<'number?', pre.bi.isnum>(1)(bb.isnum)
export const isint    = fn<'int?', pre.bi.isint>(1)(bb.isint)
export const isstr    = fn<'string?', pre.bi.isstr>(1)(bb.isstr)
export const isvec    = fn<'vector?', pre.bi.isvec>(1)(bb.isvec)
export const ismap    = fn<'map?', pre.bi.ismap>(1)(bb.ismap)
export const isfn     = fn<'fn?', pre.bi.isfn>(1)(bb.isfn)
export const isnat = fn<'nat?', pre.bi.isnat>(1)(bb.isnat)
export const isposint = fn<'pos-int?', pre.bi.isposint>(1)(bb.isposint)
export const isnegint = fn<'neg-int?', pre.bi.isnegint>(1)(bb.isnegint)
export const ispos    = fn<'pos?', pre.bi.ispos>(1)(bb.ispos) 
export const isneg    = fn<'neg?', pre.bi.isneg>(1)(bb.isneg)
export const isodd    = fn<'odd?', pre.bi.isodd>(1)(bb.isodd)
export const iseven   = fn<'even?', pre.bi.iseven>(1)(bb.iseven)
export const iszero   = fn<'zero?', pre.bi.iszero>(1)(bb.iszero)
// [note] I think it's useless.
// export const iskey    = fn<'keyword?', pre.bi.iskey>(1)(bb.iskey)
export const isempty  = fn<'empty?', pre.bi.isempty>(1)(bb.isempty)
export const isbool   = fn<'boolean?', pre.bi.isbool>(1)(bb.isbool)
export const isevery  = fn<'every?', pre.bi.isevery>(2)(bb.isevery)
export const isnil    = fn<'nil?', pre.bi.isnil>(1)(bb.isnil)
export const issome   = fn<'some?', pre.bi.issome>(1)(bb.issome)

// ----------------------
// -- builtins: string
// -----------------------

export const str1    = fn<'str', pre.bi.str1>(1)(bb.str1)
export const str2    = fn<'str', pre.bi.str2>(2)(bb.str2)
export const str3    = fn<'str', pre.bi.str3>(3)(bb.str3)
export const refind  = fn<'re-find', pre.bi.refind>(2)(bb.refind)
export const rematch = fn<`(fn [a b] (let [x (re-find a b)] (if (not (= '' x)) x nil)))`, pre.bi.rematch>(2)(bb.rematch)
export const split   = fn<'split', pre.bi.split>(2)(bb.split)
export const subs    = fn<'subs', pre.bi.subs>(3)(bb.subs)
export const replace = fn<'replace', pre.bi.replace>(3)(bb.replace)
export const join    = fn<'join', pre.bi.join>(2)(bb.join)

// ----------------------
// -- builtins: data
// ----------------------

// export const keys
export const count   = fn<'count', pre.bi.count>(1)(bb.count)
export const drop    = fn<'drop', pre.bi.drop>(2)(bb.drop)
export const take    = fn<'take', pre.bi.take>(2)(bb.take)
export const reverse = fn<'reverse', pre.bi.reverse>(1)(bb.reverse)
export const conj    = fn<'conj', pre.bi.conj>(2)(bb.conj)
export const concat  = fn<'concat', pre.bi.concat>(2)(bb.concat)
export const interleave = fn<'interleave', pre.bi.interleave>(2)(bb.interleave)



export * as builtins from './builtins'
