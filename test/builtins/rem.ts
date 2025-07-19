import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { add, mul, sub, rem } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'

type prerem = `(fn [x y] (and (number? x) (number? y)))`
type prestrict = pre.MergePreStr<pre.bi.rem, `(fn [x y] (pos-int? y))`>
type malpre = `(fn [x y] (and (number? x) (string? y)))`

// --test
const remtest0: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
   rem
     <pre.bi.rem>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const remtest0_str: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
   rem
     <`(fn [x y] (and (number? x) (number? y)))`>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const remtest0_hof = rem<`(fn [x y] (number? x))`>()
const remtest0_hof_app =
  remtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const remtest0_hof_app_ok =
  remtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const remtest0b: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <prerem>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const remtest0b_strict: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <prestrict>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))

const remtest0b_strict_failed: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <prestrict>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(-2))

try {
const remtest0b_strict_failed =
  rem
    <pre.bi.rem>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(0))
} catch {}

// @ts-expect-error:
const remtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3/3'
, [c.ValueKey]: number} =
  rem
    <prerem>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const remtest1_pass: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <prerem>
    ()
    (rem
      <prerem>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
      , foxp.putPrim(5))  

try {
const remtest1_failure_sub_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  rem
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , sub
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(3)))  
} catch {}

try {
const remtest1_failure_add_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  rem
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , add
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(-3)))  
} catch {}

try {
const remtest1_failure_mul_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  rem
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , mul
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(0)))  
} catch {}

const remtest1fail_0_1_string: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <prerem>
    ()
    (rem
       <malpre>
       ()
       (
       // @ts-expect-error:
       foxp.putPrim(3)
       , foxp.putPrim(2))
     , foxp.putPrim(5))

const remtest1fail_1_1_string: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  rem
    <malpre>
    ()
    // @ts-expect-error:
    (rem
      <prerem>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
     , foxp.putPrim(5))

// @ts-expect-error:
const remtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   rem
     <prerem>
     ()
     ((rem
       <prerem>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(2)))
    , foxp.putPrim(4))

try {
// @ts-expect-error:
const remtest1f_error_rembyzero: {
  // [note] LispRemError2
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   rem
     <pre.bi.rem>
     ()
// @ts-expect-error:
     ((rem
       <pre.bi.rem>
       ()
// @ts-expect-error:
       (foxp.putPrim(3)
       , foxp.putPrim(0)))
    , foxp.putPrim(4))
} catch {}

try {
const remtest1f_error_rembyzero2: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
   rem
     <pre.bi.rem>
     ()
// @ts-expect-error:
     ((rem
       <pre.bi.rem>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(1)))
    , foxp.putPrim(0))
} catch {}

describe('rem', () => {
it('', () => { expect(remtest0.value).toBe(1) })
it('', () => { expect(remtest0b.value).toBe(1) })
it('', () => { expect(remtest0b_strict.value).toBe(1) })
it('', () => { expect(remtest1_pass.value).toBe(1) })
})
