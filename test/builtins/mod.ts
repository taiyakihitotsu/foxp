import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { add, mul, sub, mod } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'

type premod = `(fn [x y] (and (number? x) (number? y)))`
type prestrict = pre.MergePreStr<pre.bi.mod, `(fn [x y] (pos-int? y))`>
type malpre = `(fn [x y] (and (number? x) (string? y)))`

// --test
const modtest0: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
   mod
     <pre.bi.mod>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const modtest0_str: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
   mod
     <`(fn [x y] (and (number? x) (number? y)))`>
     ()
     ( foxp.putPrim(3)
     , foxp.putPrim(2))

const modtest0_hof = mod<`(fn [x y] (number? x))`>()
const modtest0_hof_app =
  modtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const modtest0_hof_app_ok =
  modtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const modtest0b: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  mod
    <premod>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const modtest0b_strict: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  mod
    <prestrict>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const modtest0b_strict_failed: {
  [c.SexprKey]: '-1'
, [c.ValueKey]: number} =
  mod
    <prestrict>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(-2))

try {
const modtest0b_strict_failed =
  mod
    <pre.bi.mod>
    ()
// @ts-expect-error:
    ( foxp.putPrim(3)
    , foxp.putPrim(0))
} catch {}

// @ts-expect-error:
const modtest0f_notmatch_sexpr: {
  [c.SexprKey]: '3/3'
, [c.ValueKey]: number} =
  mod
    <premod>
    ()
    ( foxp.putPrim(3)
    , foxp.putPrim(2))


const modtest1_pass: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  mod
    <premod>
    ()
    (mod
      <premod>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
      , foxp.putPrim(5))  

try {
const modtest1_failure_sub_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  mod
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , sub
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(3)))  
} catch {}

try {
const modtest1_failure_add_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  mod
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , add
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(-3)))  
} catch {}

try {
const modtest1_failure_mul_then_zero: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
  mod
    ()
// @ts-expect-error:
    ( foxp.putPrim(5)
    , mul
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(0)))  
} catch {}

const modtest1fail_0_1_string: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  mod
    <premod>
    ()
    (mod
       <malpre>
       ()
       (
       // @ts-expect-error:
       foxp.putPrim(3)
       , foxp.putPrim(2))
     , foxp.putPrim(5))

const modtest1fail_1_1_string: {
  [c.SexprKey]: '1'
, [c.ValueKey]: number} =
  mod
    <malpre>
    ()
    // @ts-expect-error:
    (mod
      <premod>
      ()
      ( foxp.putPrim(3)
      , foxp.putPrim(2))
     , foxp.putPrim(5))

// @ts-expect-error:
const modtest1f_notmatch_sexpr: {
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   mod
     <premod>
     ()
     ((mod
       <premod>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(2)))
    , foxp.putPrim(4))

try {
// @ts-expect-error:
const modtest1f_error_modbyzero: {
  // [note] LispModError2
  [c.SexprKey]: '3/10'
, [c.ValueKey]: number} =
   mod
     <pre.bi.mod>
     ()
// @ts-expect-error:
     ((mod
       <pre.bi.mod>
       ()
// @ts-expect-error:
       (foxp.putPrim(3)
       , foxp.putPrim(0)))
    , foxp.putPrim(4))
} catch {}

try {
const modtest1f_error_modbyzero2: {
  [c.SexprKey]: 'nil'
, [c.ValueKey]: number} =
   mod
     <pre.bi.mod>
     ()
// @ts-expect-error:
     ((mod
       <pre.bi.mod>
       ()
       (foxp.putPrim(3)
       , foxp.putPrim(1)))
    , foxp.putPrim(0))
} catch {}

describe('mod', () => {
it('3 mod 2', () => { expect(modtest0.value).toBe(1) })
it('3 mod 2', () => { expect(modtest0b.value).toBe(1) })
it('3 mod 2', () => { expect(modtest0b_strict.value).toBe(1) })
it('3 mod 2 mod 5', () => { expect(modtest1_pass.value).toBe(1) })
})
