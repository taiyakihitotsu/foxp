import * as m from './merge'
import type Cion from '@taiyakihitotsu/cion'
import * as compiler from './compiler'

export type Eq<N extends boolean|number|string> = `(fn [n] (= ${N} n))`
export const Eq = (N: boolean|number|string) => `(fn [n] (= ${N} n))` // todo

export type Vect<N extends string> = `(fn [n] (= ${N} (count n)))`
export const VectN = (N: number) => `(fn [n] (= ${N} (count n)))`

export type NotZero = `(fn [n] (not (zero? n)))`
export const NotZero = `(fn [n] (not (zero? n)))`

export type Grater<N extends string> = `(fn [n] (< ${N} n))`
export const Grater = (N: number) => `(fn [n] (< ${N} n))`

export type Less<N extends string> = `(fn [n] (> ${N} n))`
export const Less = (N: number) => `(fn [n] (> ${N} n))`

// open interval
export type Interval<N extends string, M extends string> = `(fn [n] (< ${N} n ${M}))`
export const Interval  = (N:number, M:number) => `(fn [n] (< ${N} n ${M}))`

export type IsNum  = `number?`
export const IsNum = `number?`

export type IsStr  = `string?`
export const IsStr  = `string?`

export type IsBool = `boolean?`
export const IsBool = `boolean?`

export type IsVec  = `vector?`
export const IsVec  = `vector?`

export type IsMap  = `map?`
export const IsMap  = `map?`

export type EmailRegex = `'(([^<>()[\\].,;: @"]+(\\.[^<>()[\\].,;: @"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))'`
export type IsEmail = `(fn [n] (let [r (re-find ${EmailRegex} n)] (not (= '' r))))`

type ArgReg = '\\[([a-Z_-]+)?( [a-Z_-]+)*\\]'
export type pickArgs<
  S extends string | string[]> =
  S extends string[]
    ? `${S['length']}`
  : S extends string
    ? Cion.Lisp<`(re-find '${ArgReg}' (re-find '^\\(fn ${ArgReg}' '${S}'))`>
  : never

export type countArgsString<
  S extends string> = Cion.Lisp<`(let [r (split ${S} ' ')] (if (= r ['[]']) 0 (count r)))`> 

// [note] a max of number of args is 4 in current.
type _snmap = {'0':0, '1':1, '2': 2, '3': 3, '4': 4}

export type countArgs<
  S extends string | string[]> =
  (S extends string[] ? pickArgs<S> : countArgsString<pickArgs<S>>) extends infer C extends keyof _snmap
    ? _snmap[C]
  : false
   

// -----------------------------
// -- pre for builtins
// -----------------------------

// -----------------
// -- Arithmetic
// ----------------

export type arithmetic = ['number?', 'number?']
export type number0 = ['number?']

export type add = arithmetic
export type sub = arithmetic
export type mul = arithmetic
export type div = ['number?', '(fn [n] (and (number? n) (not (zero? n))))']
export type mod = arithmetic
export type rem = arithmetic
export type trunc = number0
export type floor = number0
export type inc = number0
export type dec = number0
export type abs = number0
export type numnot = number0

// ----------------
// -- logical
// -----------------

export type logical = ['boolean?', 'boolean?']

export type and = logical
export type or  = logical
export type not = ['boolean?']
export type If = ['boolean?', '', '']

export type compare = arithmetic
export type gt  = arithmetic
export type lt  = arithmetic
export type gte = arithmetic
export type lte = arithmetic
export type eq = ['some?', 'some?']

// -----------------
// -- checker
// -----------------

// ----------------
// -- data
// ----------------

export type get = `(fn [m] (some? (get (get m 0) (get m 1))))`
export type getIn = `(fn [m] (some? (get-in (get m 0) (get m 1))))`

export type first  = [`(fn [m] (-> m first some?))`]
export type second = [`(fn [m] (-> m second some?))`]
export type third  = [`(fn [m] (-> m third some?))`]
export type last   = [`(fn [m] (-> m last some?))`]
export type butlast = [`(fn [m] (-> m count dec zero?))`]

export type mapLax    = ['fn?', 'vector?']
export type reduceLax = ['fn?', '', 'vector?']
export type map = `(fn [m] (let [v (second m) tf (fn [v] (map type v))] (= (tf v) (tf (map (first m) v)))))`
export type filter = ['fn?', 'vector?']
export type remove = ['fn?', 'vector?']
// [note]
// all of r{} in f(r{i}, e{i}) -> r{j} is checked of type to be equal to r{0}. e{i} of vector.
export type reduce = `(fn [f init vs] (let [letf f a init rvs (map (fn [n] (take n vs)) (range 1 (inc (count vs)))) redpartf (fn [v] (reduce letf a v))] (->> rvs (map redpartf) (map type) )))`

export type _msUnroll = `(get m 0) (get m 1) (get m 2)`

export type assocLax = '(fn [m] (not (and (vector? (get m 0)) (keyword? (get m 1)))))'
export type assoc = m.MergePreStr<get, m.MergePreStr<assocLax, '(fn [m] (= (type (get m 2)) (type (get (get m 0) (get m 1)))))'>>
export type updateLax = m.MergePreStr<assocLax, '(fn [m] (fn? (get m 2)))'>
export type update = m.MergePreStr<get, m.MergePreStr<updateLax, '(fn [m] (= (type (get (get m 0) (get m 1))) (type (get (update (get m 0) (get m 1) (get m 2)) (get m 1)))))'>>
export type assocInLax = `(fn [m] (and (${getIn} m) (vector? (get m 1))))`
export type assocInStrict = `(fn [m] (let [r (assoc-in (get m 0) (get m 1) (get m 2))] (= (type (get-in (get m 0) (get m 1))) (type (get-in r (get m 1))))))`
export type assocIn = m.MergePreStr<assocInLax, assocInStrict>
export type updateInLax = `(fn [m] (and (${getIn} m) (fn? (get m 2)) (vector? (get m 1))))`
export type updateInStrict = `(fn [m] (let [r (update-in (get m 0) (get m 1) (get m 2))] (= (type (get-in (get m 0) (get m 1))) (type (get-in r (get m 1))))))`
export type updateIn = m.MergePreStr<updateInLax, updateInStrict>


export type conj<T extends string> = `(fn [m] (and (-> m first vector?) (${T} m)))`


export * as pre from './pre'
