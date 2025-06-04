import * as compiler from './compiler'

// --------------------
// -- gensym
// --------------------

export type LoopGensym<
  Pre extends string
, GensymEnvs extends string[]
, After extends string> =
  GensymEnvs extends []
    ? Pre
  : GensymEnvs extends [infer f extends string, ...infer rest extends string[]]
    ? LoopGensym<compiler.Fgensym<Pre, f, After>, rest, After>
  : never

export type _LoopAppend<
  S extends string[]
, ap extends string
, Stack extends string[] = []> =
  S extends [infer f extends string, ...infer rest extends string[]]
    ? rest extends []
      ? [...Stack, `${f}${ap}`]
    : _LoopAppend<rest, ap, [...Stack, `${f}${ap}`]>
  : never
export type LoopAppend<S extends string[], ap extends string> = _LoopAppend<S, ap>

export type GensymEnvType = [string, string[]]

export type Done<GensymEnv extends GensymEnvType> = GensymEnv[0]

export * as gensym from './gensym'
