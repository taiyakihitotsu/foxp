import type Cion from '@taiyakihitotsu/cion'
import * as merge from '../src/merge'
import * as foxp from '../src/foxp'
import * as ut from '../src/type-util'
import * as pre from '../src/pre'
import * as bi from '../src/builtins'

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
const test_tapmerged = foxp.tap1(test_mergefox0, foxp.putPrim(1))


// [todo] util, only used for `makeAnyPres`
const aaa: ['stri'] = merge.ForceVec('stri')
const bb:  ['a', 'b'] =  merge.ForceVec(['a', 'b'] as const)
const bba = merge.ForceVec(
// @ts-expect-error:
  ['a', 'b'])

  
const test_mergepretuple0: merge.MergePreTuple<['number?', 'number?'], ['pos-int?', 'neg-int?']> = ['(fn [mpt_w] (and (number? mpt_w) (pos-int? mpt_w)))', '(fn [mpt_x] (and (number? mpt_x) (neg-int? mpt_x)))']
const test_mergepretuple1: merge.MergePreTuple<['number?', 'number?'], ['', 'neg-int?']> = ['number?', '(fn [mpt_x] (and (number? mpt_x) (neg-int? mpt_x)))']
const test_mergepretuple: ut.Equal<merge.MergePreTuple<['number?', 'number?'], ['neg-int?']>, never> = true
const test_mergepretupe1a: Cion.Lisp<`(${typeof test_mergepretuple1[1]} 1)`> = 'false'
const test_mergepretupe1b: Cion.Lisp<`(${typeof test_mergepretuple1[1]} -1)`> = 'true'

type div2merged = merge.MergePreTuple<pre.div, ['', 'neg-int?']>
const test_mergepretupe1c: Cion.Lisp<`(${div2merged[1]} -1)`> = 'true'
const test_mergepretupe1d: Cion.Lisp<`(${div2merged[1]} 1)`> = 'false'
