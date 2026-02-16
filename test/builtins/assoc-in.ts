import type Cion from '@taiyakihitotsu/cion'
import * as pre from '../../src/pre'
import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { assocIn } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import { expectType } from 'tsd'

const ro_record_0 = {a: 1, b: 2} as const
const foxp_record_0 = foxp.putRecord(ro_record_0)

// Pre-condition test.
// [todo] make and move to test/pre.
expectType<'true'>({} as Cion.Lisp<`((fn [m] (-> m map?)) ${typeof foxp_record_0.sexpr})`>)
expectType<'true'>({} as Cion.Lisp<`((fn [m] (->> m second (every? keyword?))) [${typeof foxp_record_0.sexpr} [:a]])`>)
// const ___pre3 : `(${pre.assocIn} [${typeof foxp_record_0.sexpr} ${typeof _pk} inc])` = 'true'
// const _pre3 : Cion.Lisp<`(${pre.assocIn} [${typeof foxp_record_0.sexpr} ${typeof _pk} inc])`> = 'true'
expectType<'true'>({} as Cion.Lisp<`(${pre.bi.assocInLax} {:a 1 :b 2} [:a] inc)`>)
expectType<true>({} as Cion.Lisp<`(assoc-in {:a 1 :b 2} [:a] 5)`> extends '{:b 2 :a 5}' | '{:a 5 :b 2}' ? true : false)
expectType<true>({} as Cion.Lisp<`(assoc-in {:a 1 :b 2} [:a] 100)`> extends '{:a 100 :b 2}' | '{:b 2 :a 100}' ? true : false)
expectType<true>({} as Cion.Lisp<`(assoc-in {:a 1 :b [0 1]} [:b 1] 100)`> extends '{:b [0 100] :a 1}' | '{:a 1 :b [0 100]}' ? true : false)

// const _pk = foxp.putVec([':a'] as const).sexpr
// const fnarg = (n:number) => n + 1
// const fnarg_fail = (n:number): string => "string"

const a0 = foxp.putRecord(ro_record_0)
const a1 = foxp.putPrim(':a')
const a2 = foxp.putPrim(100)
const a2_fail = foxp.putPrim('str')

expectType<'true'>({} as Cion.Lisp<`(${pre.bi.assocInLax} ${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr})`>)
expectType<'true'>({} as Cion.Lisp<`(${pre.bi.assocIn} ${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr})`>)
expectType<'1'>({} as Cion.Lisp<`(get-in ${typeof a0.sexpr} [${typeof a1.sexpr}])`>)
expectType<true>({} as Cion.Lisp<`((fn [m] (let [r (assoc-in (get m 0) (get m 1) (get m 2))] r)) [{:b 2 :a 1} [:a] 2])`> extends '{:a 2 :b 2}' | '{:b 2 :a 2}' ? true : false)

expectType<{[c.SexprKey]: '{:a 1}'}>(foxp.putRecord({a: 1} as const))
// [todo]
// I think this should not be tested here.
expectType<false>({} as foxp.DeeplySymSearch<{a: 1}>)
expectType<false>({} as foxp.DeeplySymSearch<typeof ro_record_0>)

/** [todo]
Use `pre.bi.assocInLax` to assign `{:b 2 ...}` to write tests easily.

- Not Union check.
- Assignable check via Union Type of Sexpr.

We need both for `assoc-in` test.
*/
const ks = [':a'] as const
const ksmiss = [':x'] as const

const map_associntest0 =
   assocIn
     <pre.bi.assocInLax>
     ()
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec(ks)
     , a2)

const aejk0: {[c.FnFlagKey]: false} = foxp.putRecord(ro_record_0)
const aejk1: {[c.FnFlagKey]: false} = foxp.putVec(ks)
const aejk2: {[c.FnFlagKey]: false} = a2

const map_associntest0_pseudofail_valuemiss =
   assocIn
     <pre.bi.assocInLax>
     ()
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec(ks)
     , a2_fail)

try {
const map_associntest0_pseudofail_keymiss =
   assocIn
     <pre.bi.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec(ksmiss)
     , a2)
} catch {}

try {
const map_associntest0_pseudofail_keyprimmiss =
   assocIn
     <pre.bi.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(ro_record_0)
     , foxp.putPrim(0)
     , a2)
} catch {}

const map_associntest1_strict =
   assocIn
     <pre.bi.assocIn>
     ()
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec([':a'] as const)
     , a2)

try {
const map_associntest1_strict_fail_keymiss =
   assocIn
     <pre.bi.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec([':x'] as const)
     , a2)
} catch {}

try {
const map_associntest1_fail_returnmiss =
   assocIn
     <pre.bi.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putRecord(ro_record_0)
     , foxp.putVec([':a'] as const)
     , a2_fail)
} catch {}
// ---------
// -- vector
// ---------

const _arg1 = [1,2,3] as const

const vec_associntest0 =
   assocIn
     <pre.bi.assocIn>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2)

try {
const vec_associntest0_fail_keymiss =
   assocIn
     <pre.bi.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([5] as const)
     , a2)
} catch {}

try {
const vec_associntest0_fail_valuemiss =
   assocIn
     <pre.bi.assocIn>
     ()
// @ts-expect-error
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)
} catch {}

const vec_associntest0_pseudofail_valuemiss =
   assocIn
     <pre.bi.assocInLax>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)

try {
const vec_associntest0_pseudofail_keymiss =
   assocIn
     <pre.bi.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([3] as const)
     , a2)
} catch {}

describe('assoc-in', () => {
it('', () => { expect(map_associntest0.value['a']).toBe(100) })
it('', () => { expect(map_associntest0.value['b']).toBe(2) })
it('', () => { expect(foxp.putRecord(ro_record_0).value['a']).toBe(1) })
it('', () => { expect(foxp.putRecord(ro_record_0).value['b']).toBe(2) })

it('', () => { expect(vec_associntest0.value[0]).toBe(1) })
it('', () => { expect(vec_associntest0.value[1]).toBe(2) })
it('', () => { expect(vec_associntest0.value[2]).toBe(100) })

it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[0]).toBe(1) })
it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[1]).toBe(2) })
it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[2]).toBe('str' ) })
})
