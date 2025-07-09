import * as foxp from '../../src/foxp'
import { assoc } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'
import type Cion from '@taiyakihitotsu/cion'
import * as ut from '../../src/type-util'

const _arg0 = {a: 1, b: 2} as const // foxp.putRecord({a: 1, b: 2} as const)
const _arg_p0 = foxp.putRecord(_arg0)
const _pre0 : Cion.Lisp<`((fn [m] (-> m map?)) ${typeof _arg_p0.sexpr})`> = 'true'
const _pre1 : Cion.Lisp<`((fn [m] (-> m second keyword?)) [${typeof _arg_p0.sexpr} :a])`> = 'true'
const _pre2 : Cion.Lisp<`((fn [m] (= (type (get m 2)) (type (get (first m) (second m))))) [${typeof _arg_p0.sexpr} :a 9])`> = 'true'
const _pre3 : Cion.Lisp<`(${pre.bi.assocLax} [${typeof _arg_p0.sexpr} ${typeof _pk} 9])`> = 'true'
const _pk = foxp.putPrim(':a').sexpr

// ---------
// -- map
// ---------

const map_assoctest0 =
    assoc
    <pre.bi.assocLax>
    ()
( foxp.putRecord(_arg0)
  , foxp.putPrim(':a')
  , foxp.putPrim(9))

const map_assoctest0_pseudofail_valuemiss =
    assoc
    <pre.bi.assocLax>
    ()
( foxp.putRecord(_arg0)
  , foxp.putPrim(':a')
  , foxp.putPrim(true))

const map_assoctest0_pseudofail_keymiss =
    assoc
    <pre.bi.assocLax>
    ()
( foxp.putRecord(_arg0)
  , foxp.putPrim(':x')
  , foxp.putPrim(9))


const map_assoctest1 =
    assoc
    <pre.bi.assoc>
    ()
( foxp.putRecord(_arg0)
  , foxp.putPrim(':a')
  , foxp.putPrim(9))


const map_assoctest1_fail_valuemiss =
    assoc
    <pre.bi.assoc>
    ()
// @ts-expect-error:
( foxp.putRecord(_arg0)
  , foxp.putPrim(':a')
  , foxp.putPrim(true))

const map_assoctest2_fail_keymiss =
    assoc
    <pre.bi.assoc>
    ()
// @ts-expect-error:
( foxp.putRecord(_arg0)
  , foxp.putPrim(':x')
  , foxp.putPrim(9))

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


const vec_assoctest0 =
    assoc
    <pre.bi.assocLax>
    ()
( foxp.putVec(_arg1)
  , foxp.putPrim(2)
  , foxp.putPrim(9))


const vec_assoctest0_fail_keymiss =
    assoc
    <pre.bi.assocLax>
    ()
// @ts-expect-error:
( foxp.putVec(_arg1)
  , foxp.putPrim(':a')
  , foxp.putPrim(9))

const vec_assoctest0_success_valuesame =
    assoc
    <pre.bi.assoc>
    ()
( foxp.putVec(_arg1)
  , foxp.putPrim(2)
  , foxp.putPrim(1))


const vec_assoctest0_pseudofail_valuemiss =
    assoc
    <pre.bi.assoc>
    ()
// @ts-expect-error:
( foxp.putVec(_arg1)
  , foxp.putPrim(2)
  , foxp.putPrim(true))

const vec_assoctest0_pseudofail_keymiss =
    assoc
    <pre.bi.assoc>
    ()
// @ts-expect-error:
( foxp.putVec(_arg1)
  , foxp.putPrim(4)
  , foxp.putPrim(9))

describe('assoc', () => {
it('', () => { expect(map_assoctest1.value['a']).toBe(9) })
it('', () => { expect(map_assoctest1.value['b']).toBe(2) })
it('', () => { expect(map_assoctest0.value['a']).toBe(9) })
it('', () => { expect(map_assoctest0.value['b']).toBe(2) })
it('', () => { expect(vec_assoctest0.value[0]).toBe(1) })
it('', () => { expect(vec_assoctest0.value[1]).toBe(2) })
it('', () => { expect(vec_assoctest0.value[2]).toBe(9) })
it('', () => { expect(vec_assoctest0_success_valuesame.value[0]).toBe(1) })
it('', () => { expect(vec_assoctest0_success_valuesame.value[1]).toBe(2) })
it('', () => { expect(vec_assoctest0_success_valuesame.value[2]).toBe(1) })
})
