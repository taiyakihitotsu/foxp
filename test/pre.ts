import type Cion from '@taiyakihitotsu/cion'
import * as pre from '../src/pre'

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

const redpre_test05: Cion.Lisp<`(${pre.reduce} (fn [r i] (+ r i)) 0 [0 1 2 3])`> = `['number' 'number' 'number' 'number']`

// --------------------------
// -- pickArgs, countArgs
// --------------------------

const pickArgs_test0: pre.pickArgs<`(fn [] (inc 1))`> = `'[]'`
const pickArgs_test1: pre.pickArgs<`(fn [n] (inc 1))`> = `'[n]'`
const pickArgs_test2: pre.pickArgs<`(fn [x _y] (+ x _y))`> = `'[x _y]'`
const pickArgs_test0_failure: pre.pickArgs<`(fn [12] (inc 1))`> = `''`

const pickArgs_arr_test0: pre.pickArgs<[]> = '0'
const pickArgs_arr_test1: pre.pickArgs<['number?']> = '1'
const pickArgs_arr_test2: pre.pickArgs<['number?', 'number?']> = '2'

const countargsstr_test0: pre.countArgsString<`'[]'`>   = '0'
const countargsstr_test1: pre.countArgsString<`'[n]'`>  = '1'
const countargsstr_test2: pre.countArgsString<`'[n m]'`> = '2'

const countArgs_test0: pre.countArgs<`(fn [] (inc 1))`>      = 0
const countArgs_test1: pre.countArgs<`(fn [n] (inc 1))`>     = 1
const countArgs_test2: pre.countArgs<`(fn [x _y] (+ x _y))`> = 2

