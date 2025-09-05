import * as c from './const'

// builtins
export const isnum = (v: unknown) => typeof v === 'number' && isFinite(v)
export const isint = (v: unknown) => isnum(v) && Number.isInteger(v)
export const isstr = (v: unknown) => typeof v === 'string'
export const isvec = (v: unknown) => Array.isArray(v)

// [note] in foxp, all fns are wraped with {pre, fn}
export const ismap = (v: unknown) => typeof v === 'object' && v !== null && !isvec(v) && Object.prototype.toString.call(v) === '[object Object]' && !(c.FnKey in v)

// [note] in foxp, all fns are wraped with {pre, fn}
export const isfn  = (v: unknown) => typeof v === 'object' && v !== null && c.FnKey in v

export const isnat = (v: unknown) => isint(v) && (v as number) >= 0
export const isposint = (v: unknown) => isint(v) && (v as number) > 0
export const isnegint = (v: unknown) => isint(v) && (v as number) < 0
export const ispos    = (v: unknown) => isnum(v) && (v as number) > 0
export const isneg    = (v: unknown) => isnum(v) && (v as number) < 0

export const isodd    = (v: unknown) => isint(v) && (v as number) % 2 !== 0
export const iseven   = (v: unknown) => isint(v) && (v as number) % 2 === 0
export const iszero   = (v: unknown) => isnum(v) && (v as number) === 0

export const isempty  = (v: unknown) => isvec(v) && v.length === 0
export const isbool   = (v: unknown) => typeof v === 'boolean'
// [note] we don't need generics here.
export const isevery  = (f: (x: unknown) => boolean, v: unknown) => isvec(v) && v.every(f)
export const some     = (f: (x: unknown) => boolean, v: unknown) => isvec(v) && !v.every((y) => !f(y))
// [note] `nil` doesn't exist in TypeScript.
export const isnil    = (v: unknown) => v === null || v === undefined
export const issome   = (v: unknown) => !isnil(v)


// ----------------------
// -- builtins: string
// -----------------------

export const isprim = (v: unknown) => (typeof v === 'number') || (typeof v === 'string') || (typeof v === 'boolean')
export type Prim = number | string | boolean

export const str1 = (v: Prim) => isprim(v) ? `${v}` : ''
export const str2 = (v: Prim, vv: Prim) => `${str1(v)}${str1(vv)}` 
export const str3 = (v: Prim, vv: Prim, vvv: Prim) => `${str1(v)}${str1(vv)}${str1(vvv)}` 

export const refind = (re: string, s: string) => {
  const m = new RegExp(re).exec(s)
  return m ? m.slice(1) : undefined
}

export const split = (s: string, re: string) => s.split(new RegExp(re)).filter((p) => p !== '')
export const subs  = (s: string, start: number, end: number) => s.substring(start, end)
export const replace = (s: string, re: string, rep: string) => s.replace(new RegExp(re), rep)
export const join = (s: string, v: Prim[]) => v.join(s)

// export const keys

export const count   = (v: unknown[]) => isvec(v) ? v.length : undefined
export const drop    = (n: number, v: unknown[]) => v.slice(n, v.length + 1)
export const take    = (n: number, v: unknown[]) => v.slice(0, n)
export const reverse = (v: unknown[]) => v.reverse()
export const conj    = (v: unknown[], e: unknown) => [...v, e]
export const concat  = (v: unknown[], vv: unknown[]) => [...v, ...vv]
export const interleave = (v: unknown[], vv: unknown[]) => v.map((e, idx) => [e, vv[idx]]).flat()

 
export * as util from './builtins-bodies'
