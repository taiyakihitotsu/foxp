import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { update } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'
import { describe, it, expect } from 'vitest'

const _arg0 = {a: 1, b: 2} as const // foxp.putRecord({a: 1, b: 2} as const)
const _arg_p0 = foxp.putRecord(_arg0)
const _pre0 : Cion.Lisp<`((fn [m] (-> m map?)) ${typeof _arg_p0.sexpr})`> = 'true'
const _pre1 : Cion.Lisp<`((fn [m] (-> m second keyword?)) [${typeof _arg_p0.sexpr} :a])`> = 'true'
const _pre2 : Cion.Lisp<`((fn [m] (= (type (get m 2)) (type (get (first m) (second m))))) [${typeof _arg_p0.sexpr} :a 9])`> = 'true'
const _pre3 : Cion.Lisp<`(${pre.bi.updateLax} ${typeof _arg_p0.sexpr} ${typeof _pk} inc)`> = 'true'
const _pre34 : Cion.Lisp<`(${pre.bi.updateLax} {:a 1 :b 2} :a inc)`> = 'true'
const _pre34upd : Cion.Lisp<`(update {:a 1 :b 2} :a inc)`> = `{:a 2 :b 2}`
const maintest_lisp_3: Cion.Lisp<`(update {:a 1 :b 2} :a (fn [x] (+ x 99)))`> = '{:a 100 :b 2}'
const maintest_lisp_4: Cion.Lisp<`(update {:a 1 :b 2} :a inc)`> = '{:a 2 :b 2}'
const _pk = foxp.putPrim(':a').sexpr
const fnarg = (n:number) => n + 1
const fnarg_fail = (n:number): string => "string"

const a0 = foxp.putRecord(_arg0)
const a1 = foxp.putPrim(':a')
const a2 = foxp.putFn1<'number?', 'inc'>()(fnarg)
const a2_fail = foxp.putFn1<'number?', '(fn [m] "string")'>()(fnarg_fail)
// [todo] update update.pre and write it down directly to test
const vsraw0: Cion.Lisp<`((fn [m] (and (fn? (get m 2)))) [${typeof a0.sexpr} ${typeof a1.sexpr} ${typeof a2.sexpr}])`> = 'true'
const vsraw1: Cion.Lisp<`(${pre.bi.updateLax} ${typeof a0.sexpr} ${typeof a1.sexpr} ${typeof a2.sexpr})`> = 'true'

// ---------
// -- map
// ---------

const map_updatetest0 =
   update
     <pre.bi.updateLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':a')
     , a2)

const map_updatetest0_pseudofail_valuemiss =
   update
     <pre.bi.updateLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':a')
     , a2_fail)

const map_updatetest0_pseudofail_keymiss =
   update
     <pre.bi.updateLax>
     ()
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':x')
     , a2)

try {
const map_updatetest1_fail_valuemiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':a')
     , foxp.putPrim(true))
} catch {}

try {
const map_updatetest2_fail_keymiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':x')
     , a2)
} catch {}

try {
const map_updatetest2_fail_returnmiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':a')
     , a2_fail)
} catch {}

try {
const map_updatetest2_fail_return_and_keymiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putRecord(_arg0)
     , foxp.putPrim(':x')
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


const vec_updatetest0 =
   update
     <pre.bi.updateLax>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putPrim(2)
     , a2)


try {
const vec_updatetest0_fail_keymiss =
   update
     <pre.bi.updateLax>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putPrim(':a')
     , a2)
} catch {}

const vec_updatetest0_success_valuesame =
   update
     <pre.bi.update>
     ()
     ( foxp.putVec(_arg1)
     , foxp.putPrim(2)
     , a2)

try {
const vec_updatetest0_pseudofail_valuemiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putPrim(2)
     , a2_fail)
} catch {}

try {
const vec_updatetest0_pseudofail_keymiss =
   update
     <pre.bi.update>
     ()
// @ts-expect-error:
     ( foxp.putVec(_arg1)
     , foxp.putPrim(4)
     , a2)
} catch {}

describe('update', () => {
it('', () => { expect(map_updatetest0.value['a']).toBe(2) })
it('', () => { expect(map_updatetest0.value['b']).toBe(2) })
it('', () => { expect(vec_updatetest0.value[0]).toBe(1) })
it('', () => { expect(vec_updatetest0.value[1]).toBe(2) })
it('', () => { expect(vec_updatetest0.value[2]).toBe(4) })
it('', () => { expect(vec_updatetest0_success_valuesame.value[0]).toBe(1) })
it('', () => { expect(vec_updatetest0_success_valuesame.value[1]).toBe(2) })
it('', () => { expect(vec_updatetest0_success_valuesame.value[2]).toBe(4) })
})
