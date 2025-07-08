import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { add } from '../../src/builtins'
import * as merge from '../../src/merge'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'

type pre = ['number?', 'number?']
type prestrict = pre.MergePreStr<pre.bi.add, `(fn [x y] (and (number? x) (pos-int? y)))`>
type malpre = `(fn [x y] (and (number? x) (string? y)))`
type partialPre = `(fn [x y] (number? x))`

// --test
const addtest0: {
  [c.SexprKey]: '2'
, [c.ContKey] : '(if (and (every? some? [1 1]) ((fn [x y] (number? x)) 1 1)) (+ 1 1) nil)'
, [c.ValueKey]: number
, [c.FnFlagKey]: false} =
   add
     <partialPre>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const addtest0_str: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
   add
     <'(fn [x y] (and (number? x) (number? y)))'>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const addtest0_hof = add<partialPre>()
const addtest0_hof_app =
  addtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const addtest0_hof_app_ok =
  addtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const addtest0b: {
  [c.SexprKey]: '2'
, [c.FnFlagKey]: false
, [c.ValueKey]: number} =
  add
    <pre.bi.add>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

type prestrict_miss = pre.MergePreStr<'number?', 'pos-int?'>
const addtest0b_strict: {
  [c.SexprKey]: {error: "PreCountFailure"}
, [c.ValueKey]: number} =
  add
    <prestrict_miss>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const addtest0b_default: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  add
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(-1))

// @ts-expect-error:
const addtest0b_default_failure: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  add
    ()
// @ts-expect-error:
    ( foxp.putPrim(1)
    , foxp.putPrim('str'))

const addtest0b_strict_failed: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  add
    <prestrict>
    ()
// @ts-expect-error:
    ( foxp.putPrim(1)
    , foxp.putPrim(-1))

// @ts-expect-error:
const addtest0b_strict_failed_str: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  add
    <prestrict>
    ()
// @ts-expect-error:
    ( foxp.putPrim(1)
    , foxp.putPrim('str'))

// @ts-expect-error:
const addtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
  add
    <pre.bi.add>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

// @ts-expect-error:
const addtest0f_maltype: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
  add
    <pre.bi.add>
    ()
// @ts-expect-error:
    ( foxp.putPrim(1)
    , foxp.putPrim('string'))

const addtest1_pass: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <pre.bi.add>
    ()
    (add
      <pre.bi.add>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
      , foxp.putPrim(3))  

const addtest1fail_0_1_string: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <pre.bi.add>
    ()
    (add
       <malpre>
       ()
       // @ts-expect-error:
       (foxp.putPrim(1)
       , foxp.putPrim(1))
     , foxp.putPrim(3))

const addtest1fail_1_1_string: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
  add
    <malpre>
    ()
    // @ts-expect-error:
    (add
      <pre.bi.add>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
    , foxp.putPrim(3))

// @ts-expect-error:
const addtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
   add
     <pre.bi.add>
     ()
     ((add
       <pre.bi.add>
       ()
       (foxp.putPrim(1)
       , foxp.putPrim(1)))
    , foxp.putPrim(3))

const addtest1_success_return_neg: {
  [c.SexprKey]: '-5'
, [c.ValueKey]: number} =
  add
    ()
    (add
      ()
      ( foxp.putPrim(8)
      , foxp.putPrim(-16))
    , add
      ()
      (add
        ()
        ( foxp.putPrim(1)
        , foxp.putPrim(-2))
        , foxp.putPrim(4)) ) 

describe('add', () => {
it('', () => { expect(addtest0.value).toBe(2) })
it('', () => { expect(addtest0_str.value).toBe(2)})
it('', () => { expect(addtest0b.value).toBe(2)})
it('', () => { expect(addtest0b_strict.value).toBe(2)})
it('', () => { expect(addtest1_pass.value).toBe(5)})
it('', () => { expect(addtest1_success_return_neg.value).toBe(-5)})
})
