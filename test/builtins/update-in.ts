import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { updateIn } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'
import { describe, it, expect } from 'vitest'
const _arg0 = {a: 1, b: 2} as const // foxp.putRecord({a: 1, b: 2} as const)
const _arg_p0 = foxp.putRecord(_arg0)
const _pre0 : Cion.Lisp<`((fn [m] (-> m map?)) ${typeof _arg_p0.sexpr})`> = 'true'
const _pre1 : Cion.Lisp<`((fn [m] (->> m second (every? keyword?))) [${typeof _arg_p0.sexpr} [:a]])`> = 'true'
// const ___pre3 : `(${pre.updateIn} [${typeof _arg_p0.sexpr} ${typeof _pk} inc])` = 'true'
// const _pre3 : Cion.Lisp<`(${pre.updateIn} [${typeof _arg_p0.sexpr} ${typeof _pk} inc])`> = 'true'
const _pre34 : Cion.Lisp<`(${pre.updateInLax} [{:a 1 :b 2} [:a] inc])`> = 'true'
const _pre34upd : Cion.Lisp<`(update-in {:a 1 :b 2} [:a] inc)`> extends '{:b 2 :a 2}' | '{:a 2 :b 2}' ? true : false = true
const maintest_lisp_3: Cion.Lisp<`(update-in {:a 1 :b 2} [:a] (fn [x] (+ x 99)))`> extends '{:a 100 :b 2}' | '{:b 2 :a 100}' ? true : false = true
const maintest_lisp_4: Cion.Lisp<`(update-in {:a 1 :b 2} [:a] inc)`> extends '{:b 2 :a 2}' | '{:a 2 :b 2}' ? true : false = true
const _pk = foxp.putVec([':a'] as const).sexpr
const fnarg = (n:number) => n + 1
const fnarg_fail = (n:number): string => "string"

const a0 = foxp.putRecord(_arg0)
const a1 = foxp.putPrim(':a')
const a2 = foxp.putFn1<'number?', 'inc'>()(fnarg)
const a2_fail = foxp.putFn1<'number?', '(fn [m] "string")'>()(fnarg_fail)
// [todo] updateIn updateIn.pre and write it down directly to test
const vsraw0: Cion.Lisp<`((fn [m] (and (fn? (get m 2)))) [${typeof a0.sexpr} ${typeof a1.sexpr} ${typeof a2.sexpr}])`> = 'true'
const vsraw1: Cion.Lisp<`(${pre.updateInLax} [${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr}])`> = 'true'
const vsraw1st: Cion.Lisp<`(${pre.updateInStrict} [${typeof a0.sexpr} [${typeof a1.sexpr}] ${typeof a2.sexpr}])`> = 'true'
const vsraw2: Cion.Lisp<`(get-in ${typeof a0.sexpr} [${typeof a1.sexpr}])`> = '1'
const vfsrwba3: Cion.Lisp<`((fn [m] (let [r (update-in (get m 0) (get m 1) (get m 2))] r)) [{:b 2 :a 1} [:a] inc])`> extends '{:a 2 :b 2}' | '{:b 2 :a 2}' ? true : false = true 

// ---------
// -- map
// ---------

const ks = [':a'] as const
const ksmiss = [':x'] as const

const map_updateintest0 =
   updateIn
     <pre.updateInLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ks)
     , a2)

const map_updateintest0_pseudofail_valuemiss =
   updateIn
     <pre.updateInLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ks)
     , a2_fail)

try {
const map_updateintest0_pseudofail_keymiss =
   updateIn
     <pre.updateInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putVec(ksmiss)
     , a2)
} catch {}

try {
const map_updateintest0_pseudofail_keyprimmiss =
   updateIn
     <pre.updateInLax>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(0)
     , a2)
} catch {}

const map_updateintest1_strict =
   updateIn
     <pre.updateIn>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putVec([':a'] as const)
     , a2)

try {
const map_updateintest1_strict_fail_keymiss =
   updateIn
     <pre.updateIn>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putVec([':x'] as const)
     , a2)
} catch {}

try {
const map_updateintest1_fail_returnmiss =
   updateIn
     <pre.updateIn>
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
const _arg10 = foxp.putVec(_arg1)
const _arg10v = foxp.putVec(_arg1).value
const _arg10x: (typeof _arg10)['sexpr'] = foxp.putVec(_arg1).sexpr
const _arg10x_a: ut.VtoS<[1,2,3]> = foxp.putVec(_arg1).sexpr
const _arg10x_b: ut.VtoS<readonly [1,2,3]> = foxp.putVec(_arg1).sexpr
const _arg11 = foxp.putPrim(2)


const vec_updateintest0 =
   updateIn
     <pre.updateIn>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2)

try {
const vec_updateintest0_fail_keymiss =
   updateIn
     <pre.updateIn>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([5] as const)
     , a2)
} catch {}

try {
const vec_updateintest0_fail_valuemiss =
   updateIn
     <pre.updateIn>
     ()
// @ts-expect-error
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)
} catch {}

const vec_updateintest0_pseudofail_valuemiss =
   updateIn
     <pre.updateInLax>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putVec([2] as const)
     , a2_fail)

try {
const vec_updateintest0_pseudofail_keymiss =
   updateIn
     <pre.updateInLax>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putVec([3] as const)
     , a2)
} catch {}

describe('update-in', () => {
it('', () => { expect(map_updateintest0.value['a']).toBe(2) })
it('', () => { expect(map_updateintest0.value['b']).toBe(2)})
it('', () => { expect(foxp.putRecord(_arg0).value['a']).toBe(1)})
it('', () => { expect(foxp.putRecord(_arg0).value['b']).toBe(2)})
it('', () => { expect(vec_updateintest0.value[0]).toBe(1)})
it('', () => { expect(vec_updateintest0.value[1]).toBe(2)})
it('', () => { expect(vec_updateintest0.value[2]).toBe(4)})
})
