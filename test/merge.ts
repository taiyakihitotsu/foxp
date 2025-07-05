import type Cion from '@taiyakihitotsu/cion'
import * as merge from '../src/merge'
import * as foxp from '../src/foxp'
import * as ut from '../src/type-util'
import * as pre from '../src/pre'
import * as bi from '../src/builtins'


// --------------------------
// -- pickArgs, countArgs
// --------------------------

const pickArgs_test0: merge.pickArgs<`(fn [] (inc 1))`> = `'[]'`
const pickArgs_test1: merge.pickArgs<`(fn [n] (inc 1))`> = `'[n]'`
const pickArgs_test2: merge.pickArgs<`(fn [x _y] (+ x _y))`> = `'[x _y]'`
const pickArgs_test0_failure: merge.pickArgs<`(fn [12] (inc 1))`> = `''`

const pickArgs_arr_test0: merge.pickArgs<[]> = '0'
const pickArgs_arr_test1: merge.pickArgs<['number?']> = '1'
const pickArgs_arr_test2: merge.pickArgs<['number?', 'number?']> = '2'

const countargsstr_test0: merge.countArgsString<`'[]'`>   = '0'
const countargsstr_test1: merge.countArgsString<`'[n]'`>  = '1'
const countargsstr_test2: merge.countArgsString<`'[n m]'`> = '2'

const countArgs_test0: merge.countArgs<`(fn [] (inc 1))`>      = 0
const countArgs_test1: merge.countArgs<`(fn [n] (inc 1))`>     = 1
const countArgs_test2: merge.countArgs<`(fn [x _y] (+ x _y))`> = 2

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
// - test tap of the mergefox return.
const test_tapmerged: {sexpr: '3', value: number} = foxp.tap1(test_mergefox0, foxp.putPrim(1))


// [todo] util, only used for `makeAnyPres`
const aaa: ['stri'] = merge.ForceVec('stri')
const bb:  ['a', 'b'] =  merge.ForceVec(['a', 'b'] as const)
const bba = merge.ForceVec(
// @ts-expect-error:
  ['a', 'b'])

  
const _test_mergepretuple0: merge.MergePreTuple<['number?', 'number?'], ['pos-int?', 'neg-int?'], pre.bi> = ['any?', 'any?']
const test_mergepretuple1: merge.MergePreTuple<['number?', 'number?'], ['', 'neg-int?'], pre.bi> = ['number?', '(fn [mpt_x] (and (number? mpt_x) (neg-int? mpt_x)))']
const test_mergepretuple: ut.Equal<merge.MergePreTuple<['number?', 'number?'], ['neg-int?']>, never> = true
const test_mergepretupe1a: Cion.Lisp<`(${typeof test_mergepretuple1[1]} 1)`> = 'false'
const test_mergepretupe1b: Cion.Lisp<`(${typeof test_mergepretuple1[1]} -1)`> = 'true'

type div2merged = merge.MergePreTuple<pre.bi.div, ['', 'neg-int?']>
const test_mergepretupe1c: Cion.Lisp<`(${div2merged[1]} -1)`> = 'true'
const test_mergepretupe1d: Cion.Lisp<`(${div2merged[1]} 1)`> = 'false'

