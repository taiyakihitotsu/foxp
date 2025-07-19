import * as m from './merge'
import * as ut from './type-util'
import { N4, T4 } from './type-util'
import type Cion from '@taiyakihitotsu/cion'
import * as compiler from './compiler'

// -----------
// -- merge
// -----------

export type t4 = string | ut.T4

type ArgReg = '([a-Z_-]+)?( [a-Z_-]+)*'
// [note]
// To pick a sexpr which express a vector of syms of fn.
// If not matched, this returns `never`.
// If empty vector, this returns it directly (`'[]'`).
export type pickArgs<
  Fn extends string> =
  Fn extends string
    ? Cion.Lisp<`(re-find '\\[${ArgReg}\\]' (re-find '^\\(fn \\[${ArgReg}\\]' '${Fn}'))`> extends infer r extends string
      ? r extends `''`
        ? never
      : r
    : never
  : never

type makeArgs<
  N extends N4> =
  N extends 0
    ? ''
  : N extends 1
    ? `x`
  : N extends 2
    ? `x y`
  : N extends 3
    ? `x y z`
  : N extends 4
    ? `x y z zz`
  : never 

type expandArgs<
  S extends string
, N extends N4> =
`(fn [${makeArgs<N>}] (${S} ${makeArgs<N>}))`

// [note]
// This translates builtins symbol string `number?`
//   to expand lambda `(fn [x] (number? x))`
//   to get a count of args.
export type resolveLambda<
  S extends string> =
  S extends keyof bi
    ? expandArgs<S, countArgs<S> extends infer r extends N4 ? r : never>
  : S
// [note]
// Deeply get builtins pre, not builtins lambda itself.
//   e.g.: mul -> sub -> add -> `(fn [x y] (and (number? x) (number? y)))`
//
// You can use it to count a number of args.
type resolveLambdaPre<
  S extends string> =
  S extends keyof bi
    ? bi[S] extends keyof bi
      ? resolveLambdaPre<bi[S]>
    : bi[S]
  : S

export type countArgsString<
  S extends string> =
Cion.Lisp<`(let [r (split ${S} ' ')] (if (= r ['[]']) 0 (count r)))`> 

// [note] a max of number of args is 4 in current.
type _snmap = {'0':0, '1':1, '2': 2, '3': 3, '4': 4}

export type countArgs<
  S extends string> =
  countArgsString<pickArgs<resolveLambdaPre<S>>> extends infer C extends keyof _snmap
    ? _snmap[C]
  : never

// ----------
// -- merge
// ----------

export type MergePreStr<XPre extends string, YPre extends string> = _MergePreStr<XPre, YPre>
export type _MergePreStr<
  XPre extends string
, YPre extends string
, shrinkX extends string = ''
, shrinkY extends string = ''> =
  countArgs<XPre> & countArgs<YPre> extends never
    ? false
  : XPre extends '' | 'any?'
    ? YPre
  : YPre extends '' | 'any?'
    ? XPre
  : XPre extends keyof bi
    ? _MergePreStr<resolveLambda<XPre>, YPre, XPre, shrinkY>
  : YPre extends keyof bi
    ? _MergePreStr<XPre, resolveLambda<YPre>, shrinkX, YPre>
  : pickArgs<XPre> extends `'[${infer Args}]'`
    ? `(fn [${Args}] (and (${shrinkX extends '' ? XPre : shrinkX} ${Args}) (${shrinkY extends '' ? YPre : shrinkY} ${Args})))`
  : never

// ------------
// -- genPre
// ------------
type Primitive = boolean|string|number
type PreNum = string|number
export type Zero = `zero?`
export type One  = `(fn [n] (= n 1))`
export type NotZero = `(fn [n] (-> n zero? not))`
export type VectN<N extends PreNum> = `(fn [n] (and (vector? n) (= ${N} (count n))))`
export type Range<N extends PreNum, M extends PreNum> = `(fn [n] (< ${N} n ${M}))`
export type Eq<N extends Primitive> = `(fn [n] (= ${N} n))`
export type Vect<N extends PreNum> = `(fn [n] (= ${N} (count n)))`
export type Grater<N extends PreNum> = `(fn [n] (< ${N} n))`
export type Less<N extends PreNum> = `(fn [n] (> ${N} n))`


export type EmailRegex = `'(([^<>()[\\].,;: @"]+(\\.[^<>()[\\].,;: @"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))'`
export type Email = `(fn [n] (let [r (re-find ${EmailRegex} n)] (not (= '' r))))`

// -----------------------------
// -- pre for builtins
// -----------------------------

type checkPreMap<
  Map extends Record<string, string>> =
Map

// -----------------
// -- Arithmetic
// ----------------

export type arithmetic2 = `(fn [x y] (and (number? x) (number? y)))`
export type number0 = `number?`
export type compare = arithmetic2

type _notdiv0 = `(fn [x y] (and (number? x) ((fn [n] (and (number? n) (not (zero? n)))) y)))`
type arithmetic =
checkPreMap<{
  add: arithmetic2
  , sub: arithmetic2
  , mul: arithmetic2
  , div: _notdiv0
  , mod: _notdiv0
  , rem: _notdiv0
  , trunc: number0
  , floor: number0
  , inc: number0
  , dec: number0
  , abs: number0
  , numnot: number0
  , gt : compare
  , lt : compare
  , gte: compare
  , lte: compare
}>

type signs =
checkPreMap<
  { "+":  bi['add']
  , "-":  bi['sub']
  , "*":  bi['mul']
  , "/":  bi['div']
  , "%":  bi['rem']
  , ">":  bi['gt']
  , "<":  bi['lt']
  , "=":  bi['eq']
  , ">=": bi['gte']
  , "<=": bi['lte']}>


type checkOne = `(fn [x] (any? x))`
type checker =
checkPreMap<{
  'number?': checkOne
  , 'string?': checkOne
  , 'vector?': checkOne
  , 'map?': checkOne
  , 'fn?': checkOne
  , 'ifn?': checkOne
  , 'nat-int?': checkOne
  , 'pos-int?': checkOne
  , 'neg-int?': checkOne
  , 'odd?': checkOne
  , 'even?': checkOne
  , 'zero?': checkOne
  , 'keyword?': checkOne
  , 'empty?': checkOne 
  , 'boolean?': checkOne
  , 'type': checkOne
  , 'every?': checkOne
  , 'some': checkOne
  , 'nil?': checkOne
  , 'some?': checkOne
  , 'any?': checkOne
}>

// ----------------
// -- logical
// -----------------

type logical1 = `boolean?`
type logical2 = `(fn [x y] (and (boolean? x) (boolean? y))`

type logical =
checkPreMap<{
  and: logical2
  , or : logical2
  , not: logical1
  , if : `(fn [x y z] (boolean? x))`
  , eq : `(fn [x y] (and (some? x) (some? y)))`
}>

// ----------------
// -- data
// ----------------

type _getIn = `(fn [x y] (some? (get-in x y)))`
type fmap = `(fn [x y] (and (fn? x) (vector? y)))`

type data =
checkPreMap<
  { get: `(fn [x y] (some? (get x y)))`
  , 'get-in': _getIn

  , first :  `(fn [m] (-> m first some?))`
  , second:  `(fn [m] (-> m second some?))`
  , third :  `(fn [m] (-> m third some?))`
  , last  :  `(fn [m] (-> m last some?))`
  , butlast: `(fn [m] (-> m count dec zero?))`

  , mapLax   : fmap
  , reduceLax: `(fn [x y z] (and (fn? x) (vector? z)))`
  , map: `(fn [x y] (let [v y tf (fn [v] (map type v))] (= (tf v) (tf (map x v)))))`
  , filter: fmap
  , remove: fmap
  , reduce: `(fn [f init vs] (let [letf f a init rvs (map (fn [n] (take n vs)) (range 1 (inc (count vs)))) redpartf (fn [v] (reduce letf a v))] (->> rvs (map redpartf) (map type) )))`
  , assocLax:    `(fn [x y z] (not (and (vector? x) (keyword? y))))`
  , updateLax:   `(fn [x y z] (and (${data['assocLax']} x y z) (fn? z)))`
  , assocInLax:  `(fn [x y z] (and (${data['get-in']} x y z) (vector? y)))`
  , updateInLax: `(fn [x y z] (and (${_getIn} x y z) (fn? z) (vector? y)))`
}>

type _expandCheck = `(= (type (get-in x y)) (type (get-in r y)))`
type _assocInStrict  = `(fn [x y z] (let [r (assoc-in x y z)] ${_expandCheck}))`
type _updateInStrict = `(fn [x y z] (let [r (update-in x y z)] ${_expandCheck}))`
type _get3 = `(fn [x y z] (get x y))`

type dataStrict =
checkPreMap<
 { assoc: MergePreStr<_get3, MergePreStr<data['assocLax'], '(fn [x y z] (= (type z) (type (get x y))))'>>
  , update: MergePreStr<_get3, MergePreStr<data['updateLax'], '(fn [x y z] (= (type (get x y)) (type (get (update x y z) y))))'>>
  , 'assoc-in':  MergePreStr<data['assocInLax'], _assocInStrict>
  , 'update-in': MergePreStr<data['updateInLax'], _updateInStrict>
}>

export type bi = arithmetic & signs & checker & logical & data & dataStrict

export namespace bi {
  export type add = bi['add']
  export type sub = bi['sub']
  export type mul = bi['mul']
  export type div = bi['div']
  export type mod = bi['mod']
  export type rem = bi['rem']
  export type floor = bi['floor']
  export type trunc = bi['trunc']
  export type gt = bi['gt']
  export type lt = bi['lt']
  export type eq = bi['eq']
  export type gte = bi['gte']
  export type lte = bi['lte']
  export type inc = bi['inc']
  export type dec = bi['dec']
  export type abs = bi['abs']

  export type isnum = bi['number?']
  export type isstr = bi['string?']
  export type isvec = bi['vector?']
  export type ismap = bi['map?']
  export type isfn  = bi['fn?']
  export type ififn = bi['ifn?']
  export type isnatint = bi['nat-int?']
  export type isposint = bi['pos-int?']
  export type isnegint = bi['neg-int?']
  export type isodd = bi['odd?']
  export type iseven = bi['even?']
  export type iszero = bi['zero?']
  export type iskey = bi['keyword?']
  export type isempty = bi['empty?'] 
  export type isbool  = bi['boolean?']
  export type Type = bi['type']
  export type isevery = bi['every?']
  export type some = bi['some']
  export type isnil = bi['nil?']
  export type issome = bi['some?']

//  export type numnot = bi['numnot']
  export type or = bi['or']
  export type and = bi['and']
  export type not = bi['not']
  export type If = `(fn [x y z] (boolean? x))`

  export type update = bi['update']
  export type assoc = bi['assoc']
  export type get = bi['get']
  export type updateIn = bi['update-in']
  export type assocIn = bi['assoc-in']
  export type getIn = bi['get-in']
  export type updateLax = bi['updateLax']
  export type assocLax = bi['assocLax']

  export type updateInLax = bi['updateInLax']
  export type assocInLax = bi['assocInLax']

  export type first = bi['first']
  export type second = bi['second']
  export type third = bi['third']
  export type last = bi['last']
  export type butlast = bi['butlast']
  export type map = bi['map']
  export type filter = bi['filter']
  export type remove = bi['remove']
  export type reduce = bi['reduce']
}

// [note]
//   This is used with `merge/`
export type getPre<
  S extends string> =
  S extends keyof bi
    ? bi[S]
  : S

export type * as pre from './pre'
