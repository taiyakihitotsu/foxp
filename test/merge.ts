import type Cion from '@taiyakihitotsu/cion'
import * as merge from '../src/merge'
import * as foxp from '../src/foxp'
import * as ut from '../src/type-util'
import * as pre from '../src/pre'
import * as bi from '../src/builtins'


// --------------------------
// -- pickArgs, countArgs
// --------------------------

const pickArgs_test0: pre.pickArgs<`(fn [] (inc 1))`> = `'[]'`
const pickArgs_test1: pre.pickArgs<`(fn [n] (inc 1))`> = `'[n]'`
const pickArgs_test2: pre.pickArgs<`(fn [x _y] (+ x _y))`> = `'[x _y]'`
// const pickArgs_test0_failure: pre.pickArgs<`(fn [12] (inc 1))`> = `''`

// const pickArgs_arr_test0: pre.pickArgs<[]> = '0'
// const pickArgs_arr_test1: pre.pickArgs<['number?']> = '1'
// const pickArgs_arr_test2: pre.pickArgs<['number?', 'number?']> = '2'

const countargsstr_test0: pre.countArgsString<`'[]'`>   = '0'
const countargsstr_test1: pre.countArgsString<`'[n]'`>  = '1'
const countargsstr_test2: pre.countArgsString<`'[n m]'`> = '2'

const countArgs_test0: pre.countArgs<`(fn [] (inc 1))`>      = 0
const countArgs_test1: pre.countArgs<`(fn [n] (inc 1))`>     = 1
const countArgs_test2: pre.countArgs<`(fn [x _y] (+ x _y))`> = 2

// -- 


const reduce_raw_test: Cion.Lisp<`(let [result (reduce (fn [r i] (if (and (second r) (i (first r))) [(i (first r)) true] [(first r) false])) [1 true] [inc string?])] (if (second result) (first result) false))`> = 'false'

const case0 = `[number? string?]` as const
const case1: merge.ArrToVec<['number?', 'string?']> = '[number? string?]'
const case2: merge.ArrToVec<['number?']> = '[number?]'

const test_merged0 : Cion.Lisp<`((${typeof merge.anyPres} ${typeof case0}) 1)`> = 'false'
const test_merged1 : Cion.Lisp<`((${typeof merge.anyPres} [number?]) 1)`> = '1'
const test_merged2 : Cion.Lisp<`((${typeof merge.anyPres} [number? pos-int?]) 1)`> = '1'



// -------------------
// -- merge
// -------------------
const testf = foxp.putFn1<'number?', 'inc'>()((n: number) => n + 1)
const testg = foxp.putFn1<'number?', 'inc'>()((n: number) => n + 1)

// merge fox pre
const test_mergepre0: merge.MergeFoxPre<typeof testf, typeof testg> = `(fn [v] (let [result (reduce (fn [r i] (if (and (second r) (i (first r))) [(first r) true] [(first r) false])) [v true] [number? number?])] (if (second result) (first result) false)))`
const test_mergepre0x: Cion.Lisp<`(${typeof test_mergepre0} 1)`> = '1'
// merge fox fn
const test_mergefn0: merge.MergeFoxFn<typeof testf, typeof testg> = `(fn [n] (-> n inc inc))`
// test mergefox
const test_mergefox0: {
  sexpr: typeof test_mergefn0
, value: { pre: typeof test_mergepre0
          , fn: Function}
} = merge.MergeFox(testf, testg)

// [todo]
// I don't need this maybe
//
// - test tap of the mergefox return.
// const test_tapmerged: {sexpr: '3', value: number} = foxp.tap1(test_mergefox0, foxp.putPrim(1))


// [todo] util, only used for `makeAnyPres`
const aaa: ['stri'] = merge.ForceVec('stri')
const bb:  ['a', 'b'] =  merge.ForceVec(['a', 'b'] as const)
const bba = merge.ForceVec(
// @ts-expect-error:
  ['a', 'b'])


const mergetuple_test0: ut.Equal<merge.MergeTuple<['number?', 'number?']>, '(fn [a b] (and (number? a) (number? b)))'> = true
