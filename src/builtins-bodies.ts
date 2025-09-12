import * as c from './const'

// arithmetic
export const trunc = (i: number) => {
  const r = Math.trunc(i)
  return r === -0 ? 0 : r}

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
  return m ? m[0] : ''
}

export const split = (s: string, re: string) => s.split(new RegExp(re)).filter((p) => p !== '')
export const subs  = (s: string, start: number, end: number) => s.substring(start, end)
export const replace = (s: string, re: string, rep: string) => s.replace(new RegExp(re), rep)
export const join = (s: string, v: Prim[] | readonly Prim[]) => v.join(s)

// export const keys

export const count   = (v: unknown[] | readonly unknown []) => isvec(v) ? v.length : undefined
export const drop    = (n: number, v: unknown[] | readonly unknown []) => v.slice(n, v.length + 1)
export const take    = (n: number, v: unknown[] | readonly unknown []) => v.slice(0, n)
export const reverse = (v: unknown[] | readonly unknown[]) => Array.from(v).reverse()
export const conj    = (v: unknown[] | readonly unknown [], e: unknown) => [...v, e]
export const concat  = (v: unknown[] | readonly unknown [], vv: unknown[] | readonly unknown []) => [...v, ...vv]
export const interleave = (v: unknown[] | readonly unknown [], vv: unknown[] | readonly unknown []) => v.map((e, idx) => idx < vv.length && idx < v.length ? [e, vv[idx]] : []).flat()

// ----------------------
// -- builtins: fmap
// ----------------------

// [todo]
// This is not typed properly.
// I'm slacking off because of type-checks will be replaced with Cion context.
//
// This is incovenient for defining new builtins because of lacking a type check of its body.
// I'll rewrite them.

const _pure = (i: unknown) => ({value: i})
const _concat = (i: {value: unknown}) => i.value
type _FmapF = {[c.FnKey]: (i: {value: unknown}) => {value: unknown}}

export const map =
  (f: unknown, m: unknown) =>
    (m as unknown[])
    .map(_pure)
    .map((f as _FmapF)![c.FnKey])
    .map(_concat)

const _filterf = (f: _FmapF) => (a: unknown) => ((f as _FmapF)![c.FnKey](a as {value: unknown}).value === true)

export const filter =
  (f: unknown, m: unknown[] | readonly unknown[]) => 
    (m as unknown[])
    .map(_pure)
    .filter(_filterf(f as _FmapF))
    .map(_concat)

export const remove =
  (f: unknown, m: unknown | unknown[]) => 
    (m as unknown[])
    .map(_pure)
    .filter((a) => !(_filterf(f as _FmapF))(a))
    .map(_concat)

export const reduce =
  ((f: unknown, i: unknown, m:unknown[] | readonly unknown[]) => (_concat( m.map(_pure).reduce((f as {fn: (x:unknown, y: unknown) => unknown})![c.FnKey], _pure(i)) as {value: unknown})))

export const some     = (f: unknown, v: unknown[] | readonly unknown []) => isvec(v) && !(v.map(_pure).every((y) => !(_concat((f as _FmapF)![c.FnKey](y)))))

export const apply =
  (f: unknown, v: unknown[] | readonly unknown[]) => _concat(((f as _FmapF)![c.FnKey] as (...args: {[c.ValueKey]: unknown}[]) => {[c.ValueKey]: unknown})(...((v).map(_pure))))

const _pickkey = (s: unknown) => typeof s === 'string' && s.startsWith(':') ? s.slice(1) : s
const _nil = undefined

export const zipmap = (ks: unknown[] | readonly unknown[], vs: unknown[] | readonly unknown[]) => (0 === ks.length) && (0 === vs.length) ? _nil : (Object.fromEntries((ks as string[]).map(_pickkey).slice(0, vs.length).map((k, i) => [k, vs[i]])))

export * as util from './builtins-bodies'
