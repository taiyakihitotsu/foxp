import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { eq } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'

const eqtest0_eq_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   eq
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const eqtest0_gt_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     ()
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const eqtest0_lt_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(2))

const eqtest0_eq_merge_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (pos-int? x) (pos-int? y)))`>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const eqtest0_gt_merge_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (pos-int? x) (pos-int? y)))`>
     ()
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const eqtest0_lt_merge_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (pos-int? x) (pos-int? y)))`>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(2))

const eqtest0_eq_merge_failure: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (neg-int? x) (neg-int? y)))`>
     ()
// @ts-expect-error:
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const eqtest0_gt_merge_failure: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (neg-int? x) (neg-int? y)))`>
     ()
// @ts-expect-error:
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const eqtest0_lt_merge_failure: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <`(fn [x y] (and (neg-int? x) (neg-int? y)))`>
     ()
// @ts-expect-error:
     ( foxp.putPrim(1)
     , foxp.putPrim(2))


describe('gt', () => {
it('', () => { expect(eqtest0_eq_success.value).toBe(true) })
it('', () => { expect(eqtest0_gt_success.value).toBe(false) })
it('', () => { expect(eqtest0_lt_success.value).toBe(false) })
it('', () => { expect(eqtest0_eq_success.value).toBe(true) })
it('', () => { expect(eqtest0_gt_success.value).toBe(false) })
it('', () => { expect(eqtest0_lt_success.value).toBe(false) })
})
