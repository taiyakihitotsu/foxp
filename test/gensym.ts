import type Cion from '@taiyakihitotsu/cion'
import * as merge from '../src/merge'
import * as gensym from '../src/gensym'

type test_sxp = `(fn [n] (zero? n))`
type test_mergep0 = merge.MergePreRaw<test_sxp, [test_sxp, []]>
type test_mergep1 = merge.MergePreRaw<test_sxp, test_mergep0>
const test_mergep2: test_mergep1 = ['(fn [rn] (and ((fn [nxp] (zero? nxp)) rn) ((fn [rnyp] (and ((fn [nxpyp] (zero? nxpyp)) rnyp) ((fn [nypyp] (zero? nypyp)) rnyp))) rn)))', ['rn', 'nxp', 'rnyp', 'nxpyp', 'nypyp']]
type test_mergep3 = gensym.Done<test_mergep1>
const test_mergep4: test_mergep3 = '(fn [rn] (and ((fn [nxp] (zero? nxp)) rn) ((fn [rnyp] (and ((fn [nxpyp] (zero? nxpyp)) rnyp) ((fn [nypyp] (zero? nypyp)) rnyp))) rn)))'
const test_mergep3a: Cion.Lisp<`(${test_mergep3} 0)`> = 'true'
const test_mergep4a: Cion.Lisp<`(${test_mergep3} 1)`> = 'false'
