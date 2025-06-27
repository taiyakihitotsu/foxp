import * as m from './merge'

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
export type IsEmail = `(fn [n] (re-find ${EmailRegex} n))`

// -----------------------------
// -- pre for builtins
// -----------------------------

export type add = ['number?', 'number?']
export type sub = ['number?', 'number?']
export type mul = ['number?', 'number?']
export type div = ['number?', '(fn [n] (and (number? n) (not (zero? n))))']
export type mod = ['number?', 'number?']
export type inc = ['number?']
export type dec = ['number?']
export type get = `(fn [m] (some? (get (get m 0) (get m 1))))`

export type gt  = ['number?', 'number?']
export type lt  = ['number?', 'number?']
export type gte = ['number?', 'number?']
export type lte = ['number?', 'number?']

export type _mGet = `(get-in (get m 0) (get m 1))`
export type _msUnroll = `(get m 0) (get m 1) (get m 2)`

export type assocLax = '(fn [m] (not (and (vector? (get m 0)) (keyword? (get m 1)))))'
export type assoc = m.MergePreStr<get, m.MergePreStr<assocLax, '(fn [m] (= (type (get m 2)) (type (get (get m 0) (get m 1)))))'>>
export type updateLax = m.MergePreStr<assocLax, '(fn [m] (fn? (get m 2)))'>
export type update = m.MergePreStr<get, m.MergePreStr<updateLax, '(fn [m] (= (type (get (get m 0) (get m 1))) (type (get (update (get m 0) (get m 1) (get m 2)) (get m 1)))))'>>
export type assocInLax = `(fn [m] (and (some? ${_mGet}) (vector? (get m 1))))`
export type assocInStrict = `(fn [m] (let [r (assoc-in (get m 0) (get m 1) (get m 2))] (= (type (get-in (get m 0) (get m 1))) (type (get-in r (get m 1))))))`
export type assocIn = m.MergePreStr<assocInLax, assocInStrict>
export type updateInLax = `(fn [m] (and (some? ${_mGet}) (fn? (get m 2)) (vector? (get m 1))))`
export type updateInStrict = `(fn [m] (let [r (update-in (get m 0) (get m 1) (get m 2))] (= (type (get-in (get m 0) (get m 1))) (type (get-in r (get m 1))))))`
export type updateIn = m.MergePreStr<updateInLax, updateInStrict>

export * as pre from './pre'
