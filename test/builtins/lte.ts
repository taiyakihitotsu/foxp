import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { lte } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'

const ltetest0_eq_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const ltetest0_gt_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   lte
     ()
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const ltetest0_lt_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(2))

const ltetest0_eq_merge_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const ltetest0_gt_merge_success: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   lte
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const ltetest0_lt_merge_success: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     <['pos-int?', 'pos-int?']>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(2))

const ltetest0_eq_merge_failure: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     <['neg-int?', 'neg-int?']>
     ()
// @ts-expect-error:
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const ltetest0_gt_merge_failure: {
  [c.SexprKey]: 'false'
, [c.ValueKey]: boolean} =
   lte
     <['neg-int?', 'neg-int?']>
     ()
// @ts-expect-error:
     ( foxp.putPrim(2)
     , foxp.putPrim(1))

const ltetest0_lt_merge_failure: {
  [c.SexprKey]: 'true'
, [c.ValueKey]: boolean} =
   lte
     <['neg-int?', 'neg-int?']>
     ()
// @ts-expect-error:
     ( foxp.putPrim(1)
     , foxp.putPrim(2))


describe('gt', () => {
it('', () => { expect(ltetest0_eq_success.value).toBe(true) })
it('', () => { expect(ltetest0_gt_success.value).toBe(false) })
it('', () => { expect(ltetest0_lt_success.value).toBe(true) })
it('', () => { expect(ltetest0_eq_success.value).toBe(true) })
it('', () => { expect(ltetest0_gt_success.value).toBe(false) })
it('', () => { expect(ltetest0_lt_success.value).toBe(true) })
})
