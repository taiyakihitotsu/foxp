import type Cion from '@taiyakihitotsu/cion'
import * as pre from '../src/pre'
import * as ut from '../src/type-util'

// -- merge
const pickargs_test0 : pre.pickArgs<`(fn [] (inc))`> = `'[]'`
const pickargs_test1 : pre.pickArgs<`(fn [m] (inc))`> = `'[m]'`
const pickargs_test2 : pre.pickArgs<`(fn [x y] (inc))`> = `'[x y]'`
const pickargs_test3 : pre.pickArgs<`(fn [x y z] (inc))`> = `'[x y z]'`
const pickargs_test4 : pre.pickArgs<`(fn [a b c d] (inc))`> = `'[a b c d]'`
const pickargs_test5 : ut.Equal<pre.pickArgs<`inc`>, never> = true

const countArgsString_test0 : pre.countArgs<`(fn [] (inc))`> = 0
const countArgsString_test1 : pre.countArgs<`(fn [m] (inc))`> = 1
const countArgsString_test2 : pre.countArgs<`(fn [x y] (inc))`> = 2
const countArgsString_test3 : pre.countArgs<`(fn [x y z] (inc))`> = 3
const countArgsString_test4 : pre.countArgs<`(fn [a b c d] (inc))`> = 4



// [note]
// Put it in fn-form.
// @ts-expect-error:
const countArgsString_test4jv : pre.countArgs<`[a b c d]`> = 4

const countArgsString_test5 : pre.countArgs<`inc`> = 1
const countArgsString_test6 : pre.countArgs<`and`> = 2
const countArgsString_test7 : pre.countArgs<`assoc`> = 3

const resolvelambda_test0 : pre.resolveLambda<`inc`> = `(fn [x] (inc x))`
const resolvelambda_test1 : pre.resolveLambda<`(fn [x] (inc x))`> = `(fn [x] (inc x))`

const mergeprestr_test : pre.MergePreStr<`number?`, `number?`> = '(fn [x] (and (number? x) (number? x)))'



// --------
// -- map
// --------

export type map = `(fn [m] (let [v (second m) tf (fn [v] (map type v))] (= (tf v) (tf (map (first m) v)))))`

const mappre_testr: Cion.Lisp<`(${map} [inc [0 1 2]])`> = 'true'
const mappre_test0: Cion.Lisp<`(let [tf (fn [v] (map type v))] (tf [0 1 2]))`> = `['number' 'number' 'number']`
const mappre_test1: Cion.Lisp<`(let [tf (fn [v] (map type v))] (tf (map inc [0 1 2])))`> = `['number' 'number' 'number']`
const mappre_test2: Cion.Lisp<`(let [v [0 1 2] tf (fn [v] (map type v))] (= (tf v) (tf (map inc v))))`> = `true`
const mappre_test3: Cion.Lisp<`((fn [m] (let [v (second m) tf (fn [v] (map type v))] (= (tf v) (tf (map (first m) v))))) [inc [0 1 2]])`> = `true`

// -------------
// -- reduce
// -------------

const redpre_all_test0: Cion.Lisp<`(let [a 0 rvs (map (fn [n] (take n [0 1 2])) (range 1 (inc (count [0 1 2])))) redpartf (fn [v] (reduce (fn [r i] (+ r i)) a v))] (map type (map redpartf rvs)))`> = `['number' 'number' 'number']`
const redpre_bug_test0: Cion.Lisp<`(let [a 0 redpartf (fn [v] (reduce (fn [r i] (+ r i)) a v))] (map redpartf [[0] [1] [2]]))`> = '[0 1 2]'
const redpre_bug_test1: Cion.Lisp<`(let [a 0 redpartf (fn [v] (reduce (fn [r i] (+ r i)) a v))] (redpartf [1]))`> = '1'

const redpre_test05: Cion.Lisp<`(${pre.bi.reduce} (fn [r i] (+ r i)) 0 [0 1 2 3])`> = `['number' 'number' 'number' 'number']`
