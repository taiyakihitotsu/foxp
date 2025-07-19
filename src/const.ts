export const ValueKey = 'value' as const
export const SexprKey = 'sexpr' as const
export const PreKey   = 'pre' as const
export const FnKey    = 'fn' as const
export const ContKey = 'cont' as const
export const FnFlagKey = 'fnflag' as const
export const HofFlag = 'hofflag' as const
export const EnvKey  = 'env' as const

export type ValueKey = 'value'
export type SexprKey = 'sexpr'
export type PreKey   = 'pre'
export type FnKey    = 'fn'
export type _FnKey    = 'fn'
export type ContKey = 'cont'
export type FnFlagKey = 'fnflag'
export type HofFlag = 'hofflag'
export type EnvKey  = 'env'

export * as const from './const'
