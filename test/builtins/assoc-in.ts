import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { assocIn } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'

const _arg0 = {a: 1, b: 2} as const // foxp.putRecord({a: 1, b: 2} as const)
const _arg_p0 = foxp.putRecord(_arg0)
const _pre0 : Cion.Lisp<`((fn [m] (-> m map?)) ${typeof _arg_p0.sexpr})`> = 'true'
const _pre1 : Cion.Lisp<`((fn [m] (->> m second (every? keyword?))) [${typeof _arg_p0.sexpr} [:a]])`> = 'true'
// const ___pre3 : `(${pre.assocIn} [${typeof _arg_p0.sexpr} ${typeof _pk} inc])` = 'true'
// const _pre3 : Cion.Lisp<`(${pre.assocIn} [${typeof _arg_p0.sexpr} ${typeof _pk} inc])`> = 'true'
const _pre34 : Cion.Lisp<`(${pre.assocInLax} [{:a 1 :b 2} [:a] inc])`> = 'true'
const _pre34upd : Cion.Lisp<`(assoc-in {:a 1 :b 2} [:a] 5)`> extends '{:b 2 :a 5}' | '{:a 5 :b 2}' ? true : false = true
const maintest_lisp_3: Cion.Lisp<`(assoc-in {:a 1 :b 2} [:a] 100)`> extends '{:a 100 :b 2}' | '{:b 2 :a 100}' ? true : false = true
const maintest_lisp_4: Cion.Lisp<`(assoc-in {:a 1 :b [0 1]} [:b 1] 100)`> extends '{:b [0 100] :a 1}' | '{:a 1 :b [0 100]}' ? true : false = true
const _pk = foxp.putVec([':a'] as const).sexpr
const fnarg = (n:number) => n + 1
const fnarg_fail = (n:number): string => "string"

const a0 = foxp.putRecord(_arg0)
const a1 = foxp.putPrim(':a')
const a2 = foxp.putPrim(100)
const a2_fail = foxp.putPrim('str')

const vsraw1: Cion.Lisp<`(${pre.assocInLax} [${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr}])`> = 'true'
const vsraw1st: Cion.Lisp<`(${pre.assocInStrict} [${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr}])`> = 'true'
const vsraw2: Cion.Lisp<`(get-in ${typeof a0.sexpr} [${typeof a1.sexpr}])`> = '1'
const vfsrwba3: Cion.Lisp<`((fn [m] (let [r (assoc-in (get m 0) (get m 1) (get m 2))] r)) [{:b 2 :a 1} [:a] 2])`> extends '{:a 2 :b 2}' | '{:b 2 :a 2}' ? true : false = true 

// ---------
// -- map
// ---------

const ks = [':a'] as const
const ksmiss = [':x'] as const

const map_associntest0 =
   assocIn
     <pre.assocInLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ks)
     , a2)

const map_associntest0_pseudofail_valuemiss =
   assocIn
     <pre.assocInLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ks)
     , a2_fail)

try {
const map_associntest0_pseudofail_keymiss =
   assocIn
     <pre.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ksmiss)
     , a2)
} catch {}

try {
const map_associntest0_pseudofail_keyprimmiss =
   assocIn
     <pre.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(0)
     , a2)
} catch {}

const map_associntest1_strict =
   assocIn
     <pre.assocIn>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec([':a'] as const)
     , a2)

try {
const map_associntest1_strict_fail_keymiss =
   assocIn
     <pre.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putVec([':x'] as const)
     , a2)
} catch {}

try {
const map_associntest1_fail_returnmiss =
   assocIn
     <pre.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putVec([':a'] as const)
     , a2_fail)
} catch {}
// ---------
// -- vector
// ---------

const _arg1 = [1,2,3] as const

const vec_associntest0 =
   assocIn
     <pre.assocIn>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2)

try {
const vec_associntest0_fail_keymiss =
   assocIn
     <pre.assocIn>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([5] as const)
     , a2)
} catch {}

try {
const vec_associntest0_fail_valuemiss =
   assocIn
     <pre.assocIn>
     ()
// @ts-expect-error
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)
} catch {}

const vec_associntest0_pseudofail_valuemiss =
   assocIn
     <pre.assocInLax>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)

try {
const vec_associntest0_pseudofail_keymiss =
   assocIn
     <pre.assocInLax>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([3] as const)
     , a2)
} catch {}

describe('assoc-in', () => {
it('', () => { expect(map_associntest0.value['a']).toBe(100) })
it('', () => { expect(map_associntest0.value['b']).toBe(2) })
it('', () => { expect(foxp.putRecord(_arg0).value['a']).toBe(1) })
it('', () => { expect(foxp.putRecord(_arg0).value['b']).toBe(2) })

it('', () => { expect(vec_associntest0.value[0]).toBe(1) })
it('', () => { expect(vec_associntest0.value[1]).toBe(2) })
it('', () => { expect(vec_associntest0.value[2]).toBe(100) })

it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[0]).toBe(1) })
it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[1]).toBe(2) })
it('', () => { expect(vec_associntest0_pseudofail_valuemiss.value[2]).toBe('str' ) })
})














