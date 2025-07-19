import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { add, mul, sub, div } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'

type prediv = `(fn [x y] (and (number? x) (number? y)))`
type prestrict = pre.MergePreStr<pre.bi.div, `(fn [x y] (pos-int? y))`>
type malpre = `(fn [x y] (and (number? x) (string? y)))`

// --test
const divtest0: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
   div
     <pre.bi.div>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const divtest0_str: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
   div
     <`(fn [x y] (and (number? x) (number? y)))`>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const divtest0_hof = div<`(fn [x y] (number? x))`>()
const divtest0_hof_app =
  divtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const divtest0_hof_app_ok =
  divtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const divtest0b: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest0b_strict: {
  [c.SexprKey]: '3/2'
, [c.ValueKey]: number} =
  div
    <prestrict>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest0b_strict_failed: {
  [c.SexprKey]: '-3/2'
, [c.ValueKey]: number} =
  div
    <prestrict>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(-2))

try {
const divtest0b_strict_failed =
// div<pre.bi.div>()( foxp.putPrim(3), foxp.putPrim(0))
  div
    <pre.bi.div>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(0))
} catch {}

// @ts-expect-error:
const divtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3/3'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const divtest1_pass: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    (div
      <prediv>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
      , foxp.putPrim(5))  

try {
const divtest1_failure_sub_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  div
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , sub
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(3)))  
} catch {}

try {
const divtest1_failure_add_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  div
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , add
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(-3)))  
} catch {}

try {
const divtest1_failure_mul_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  div
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , mul
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(0)))  
} catch {}

const divtest1fail_0_1_string: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <prediv>
    ()
    (div
       <malpre>
       ()
       (
       // @ts-expect-error:
       foxp.putPrim(3)
       , foxp.putPrim(2))
     , foxp.putPrim(5))

const divtest1fail_1_1_string: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
  div
    <malpre>
    ()
    // @ts-expect-error:
    (div
      <prediv>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
     , foxp.putPrim(5))

// @ts-expect-error:
const divtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   div
     <prediv>
     ()
     ((div
       <prediv>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(2)))
    , foxp.putPrim(4))

try {
// @ts-expect-error:
const divtest1f_error_divbyzero: {
  // [note] LispDivError2
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   div
     <pre.bi.div>
     ()
// @ts-expect-error:
     ((div
       <pre.bi.div>
       ()
// @ts-expect-error:
       (foxp.putPrim(3)
       , foxp.putPrim(0)))
    , foxp.putPrim(4))
} catch {}

try {
const divtest1f_error_divbyzero2: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
   div
     <pre.bi.div>
     ()
// @ts-expect-error:
     ((div
       <pre.bi.div>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(1)))
    , foxp.putPrim(0))
} catch {}

describe('div', () => {
it('', () => { expect(divtest0.value).toBe(3/2) })
it('', () => { expect(divtest0b.value).toBe(3/2) })
it('', () => { expect(divtest0b_strict.value).toBe(3/2) })
it('', () => { expect(divtest1_pass.value).toBe(3/10) })
})
