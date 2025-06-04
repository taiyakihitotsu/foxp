import * as compiler from './compiler'
import * as gt from './gensym'
import type * as foxpT from './foxp'
import type Cion from '@taiyakihitotsu/cion'
import * as c from './const'
import * as ut from './type-util'

// ----------------
// -- merge pre
// ----------------

export type MergePreStr<
  SPre extends string
, TPre extends string
, ArgName extends string = 'n'> =
  SPre extends ''
    ? TPre
  : TPre extends ''
    ? SPre
  : `(fn [${ArgName}] (and (${SPre} ${ArgName}) (${TPre} ${ArgName})))`

export type MergePreTuple<
  SPre extends string[]
, TPre extends string[]
, ArgNames extends string[] = ['mpt_w', 'mpt_x', 'mpt_y', 'mpt_z']
, Ret extends string[] = []> =
  [SPre, TPre] extends [[], []]
    ? Ret
  : SPre['length'] extends TPre['length']
    ? [SPre, TPre, ArgNames] extends [[infer hspre extends string, ...infer tspre extends string[]], [infer htpre extends string, ...infer ttpre extends string[]], [infer harg extends string, ...infer targ extends string[]]]
      ? MergePreTuple<tspre, ttpre, targ, [...Ret, MergePreStr<hspre, htpre, harg>]>
    : never
  : never

// [note]
// `GensymEnvs extends string[]` part don't use yArg
//   because names to use are passed with the 2nd of Env.
// 
// the return type is the same of Env.
export type MergePreRaw<
  xPre extends string
, Env extends gt.GensymEnvType
, xArg extends string = 'n'
, yArg extends string = 'n'
, rArg extends string = 'rn'
, xApp extends string = 'xp'
, yApp extends string = 'yp'> =
  Env extends [ infer yPre extends string
                , infer GensymEnvs extends string[]]
    ? GensymEnvs extends []
      ? [MergePreStr<
           compiler.Fgensym<xPre, xArg, xApp>
         , compiler.Fgensym<yPre, yArg, yApp>
         , rArg>
         , [rArg, `${xArg}${xApp}`, `${yArg}${yApp}`]]
    : GensymEnvs extends string[]
      ? [MergePreStr<
           compiler.Fgensym<xPre, xArg, xApp>
         , gt.LoopGensym<yPre, GensymEnvs, yApp>
         , rArg>
         , [rArg, `${xArg}${xApp}`, ...gt.LoopAppend<GensymEnvs, yApp>]]
    : never
  : never

export type Merge<
  xPre extends string
, yPre extends string | gt.GensymEnvType> =
  yPre extends string
    ? MergePreRaw<xPre, [yPre, []]>
  : MergePreRaw<xPre, yPre extends gt.GensymEnvType ? yPre : never>

export const anyPres = `(fn [pres] (fn [v] (let [result (reduce (fn [r i] (if (and (second r) (i (first r))) [(first r) true] [(first r) false])) [v true] pres)] (if (second result) (first result) false))))` as const
export type anyPres = typeof anyPres

export type MergeFoxPre<
  F extends foxpT.Foxfn
, G extends foxpT.Foxfn> =
  [foxpT.GetPre<F>, foxpT.GetPre<G>] extends [infer fpre extends (string | string[]), infer gpre extends (string | string[])]
    ? Cion.Lisp<`(${typeof anyPres} ${ArrToVec<[...ForceVec<fpre>, ...ForceVec<gpre>]>})`>
  : never

export type MergeFoxFn<
  F extends foxpT.Foxfn
, G extends foxpT.Foxfn> =
`(fn [n] (-> n ${foxpT.GetFn<F>} ${foxpT.GetFn<G>}))`

export type MergeFox<
  F extends foxpT.Foxfn
, G extends foxpT.Foxfn> =
{ sexpr: MergeFoxFn<F,G>
    , value: { pre: MergeFoxPre<F,G>
         , fn: Function } }

export const MergeFox = <
  F extends foxpT.Foxfn
, G extends foxpT.Foxfn
, X
, Y>
(f: F, g: G): MergeFox<F,G> => (
  { sexpr: '' as MergeFoxFn<F, G>
  , value: { pre: '' as MergeFoxPre<F,G>
           , fn: (n: X): Y => (g[c.ValueKey][c.FnKey]((f[c.ValueKey][c.FnKey], n)))}} as MergeFox<F,G>)

export type ArrToVec<
  V extends string[]
, RS extends string = ''> =
  V extends []
    ? RS extends ''
      ? ''
    : `${RS}]`
  : V extends [infer F extends string, ...infer Rest extends string[]]
    ? RS extends ''
      ? ArrToVec<Rest, `[${F}`>
    : ArrToVec<Rest, `${RS} ${F}`>
  : never

export type ForceVec<V extends string | string[]> = V extends string[] ? V : [V]
export const ForceVec = <
  S
, SS = ut.ForceTuple<S> extends never ? string : S
, R  = S extends string ? [S] : S>
(s: S extends SS ? S : never): R => (typeof s === 'string' ? [s] : s) as R

export * as merge from './merge'
