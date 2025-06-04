// https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts
// https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type
export type UnionToIntersection<
  U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
    ? I
  : never

export type UtoI<U> = UnionToIntersection<U>

export type LastOf<
  T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R)
    ? R
  : never

export type Primitive = string|number|boolean

export type Equal<
  X
, Y> =
  (<T>() => T extends X & T | T ? 1 : 2) extends (<T>() => T extends Y & T | T ? 1 : 2)
    ? true
  : false

export type Flatten<O> = O extends infer T ? { [K in keyof T]: T[K] } : never

// --------------------------------
// -- to lisp map.
// --------------------------------
//
// This compiles TS string `key value` to Cion lisp's map `{:key_n value_n}`.
//
// The 1st arg must be Union type, use `RecordToUnion` at first when compiling TS record `{key_n: value_n}`.
export type UnionKVStrToString<
  T
, Start extends string = '{'
, L = LastOf<T>
, N = [T] extends [never] ? true : false> =
  true extends N
    ? "}"
  : `${Start}:${L extends Primitive ? L : ''}${UnionKVStrToString<Exclude<T,L>, ' '>}`

export type RecordToUnion<M> = {[K in keyof M]: `${K extends symbol ? '' : ''}${K extends symbol ? '' : K}${K extends symbol ? '' : ' '}${M[K] extends Primitive ? M[K] : M[K] extends unknown[] ? VectorString<M[K]> : M[K] extends Record<PropertyKey, unknown> ? UnionKVStrToString<RtoU<M[K]>> : ''}`}[keyof M]
export type RtoU<M> = RecordToUnion<M>

// TS Object Const -> Sexpr String.
export type RecordToString<R> = UnionKVStrToString<RtoU<R>>
export type RtoS<R> = RecordToString<R>



// -------------------------------
// -- to lisp's vector
// -------------------------------

export type PutSpace<B extends boolean> = B extends true ? ' ' : ''
export type _Tuple = [] | [unknown] | [unknown, unknown] | [unknown,unknown,unknown] | [unknown,unknown,unknown,unknown] | [unknown,unknown,unknown,unknown,unknown] | [unknown,unknown,unknown,unknown,unknown,unknown] | [unknown,unknown,unknown,unknown,unknown,unknown,unknown] | [unknown,unknown,unknown,unknown,unknown,unknown,unknown,unknown]
export type Tuple = _Tuple | Readonly<_Tuple>

// TS Array Const -> Sexpr String.
export type VectorString<
  T extends unknown[] | readonly unknown[]
, IsRest extends boolean = false
, S extends string = ''> =
  T extends []
    ? `[${S}]`
  : T extends [infer Fst, ...infer Rest] | readonly [infer Fst, ...infer Rest]
    ? Fst extends Primitive
      ? VectorString<Rest, true, `${S}${PutSpace<IsRest>}${Fst}`>
    : Fst extends Record<PropertyKey, unknown>
      ? VectorString<Rest, false, `${S}${PutSpace<IsRest>}${RtoS<Fst>}${Rest extends [] ? '' : ' '}`>
    : Fst extends unknown[]
      ? VectorString<Rest, false, `${S}${PutSpace<IsRest>}${VectorString<Fst>}${Rest extends [] ? '' : ' '}`>
    : Fst extends readonly [...infer R]
      ? VectorString<Rest, false, `${S}${PutSpace<IsRest>}${VectorString<R>}${Rest extends [] ? '' : ' '}`>
    : never
  : never

export type VectorToRecord<T extends [PropertyKey, Primitive][]> = {[K in T[number] as K[0]]: K[1]}
export type VtoR<T extends [PropertyKey, Primitive][]> = VectorToRecord<T>
export type VtoS<T extends Tuple> = VectorString<T>
export type VtoOpenStr<T extends unknown[]> = VectorString<T, true>



// -------------------
// -- Tuple
// -------------------
export type ForceTuple<
  S> =
  S extends readonly [infer a, infer b, infer c, infer d, infer e,infer f,infer g,infer h] | [infer a, infer b, infer c, infer d, infer e,infer f,infer g,infer h]
    ? [a,b,c,d,e,f,g,h] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b, infer c, infer d, infer e,infer f,infer g] | [infer a, infer b, infer c, infer d, infer e,infer f,infer g]
    ? [a,b,c,d,e,f,g] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b, infer c, infer d, infer e,infer f] | [infer a, infer b, infer c, infer d, infer e,infer f]
    ? [a,b,c,d,e,f] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b, infer c, infer d, infer e] | [infer a, infer b, infer c, infer d, infer e]
    ? [a,b,c,d,e] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b, infer c, infer d] | [infer a, infer b, infer c, infer d]
    ? [a,b,c,d] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b, infer c] | [infer a, infer b, infer c]
    ? [a,b,c] extends S
      ? S
    : never
  : S extends readonly [infer a, infer b] | [infer a, infer b]
    ? [a,b] extends S
      ? S
    : never
  : S extends readonly [infer a] | [infer a]
    ? [a] extends S
      ? S
    : never
  : never

export const ForceTuple = <S extends unknown[]>(s: (S extends (ForceTuple<S> extends never ? never : S) ? S : never)) => s

export type * as typeUtil from './type-util'
