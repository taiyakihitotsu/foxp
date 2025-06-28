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
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const eqtest0_gt_merge_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const eqtest0_lt_merge_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(2))

const eqtest0_eq_merge_failure: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   eq
     <['neg-int?', 'neg-int?']>
     ()
// @ts-expect-error:
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const eqtest0_gt_merge_failure: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <['neg-int?', 'neg-int?']>
     ()
// @ts-expect-error:
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const eqtest0_lt_merge_failure: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   eq
     <['neg-int?', 'neg-int?']>
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
