import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { mul } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { strict as assert } from 'assert'
import { describe, it, expect } from 'vitest'
type premul = ['number?', 'number?']
type prestrict = ['number?', merge.MergePreStr<'number?', 'pos-int?'>]
type malpre = ['number?', 'string?']

// --test
const multest0: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
   mul
     <pre.mul>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(3))



const multest0_str: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
   mul
     <'(fn [n] (and (number? (first n)) (number? (second n))))'>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(3))


const multest0_hof = mul<['number?', '']>()
const multest0_hof_app =
  multest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const multest0_hof_app_ok =
  multest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const multest0b: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
  mul
    <premul>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(3))

const multest0b_strict: {
  [c.SexprKey]: '3'
, [c.ValueKey]: number} =
  mul
    <prestrict>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(3))


const multest0b_strict_failed: {
  [c.SexprKey]: '-1'
, [c.ValueKey]: number} =
  mul
    <prestrict>
    ()
    ( foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim(-1))

// @ts-expect-error:
const multest0f_notmatch_sexpr: {
  [c.SexprKey]: '(+ 1 2)'
, [c.ValueKey]: number} =
  mul
    <premul>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const multest1_pass: {
  [c.SexprKey]: '6'
, [c.ValueKey]: number} =
  mul
    <premul>
    ()
    (mul
      <premul>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(2))
      , foxp.putPrim(3))  


const multest1fail_0_1_string: {
  [c.SexprKey]: '6'
, [c.ValueKey]: number} =
  mul
    <premul>
    ()
    (mul
       <malpre>
       ()
       (
       foxp.putPrim(1)
       // @ts-expect-error:
       , foxp.putPrim(2))
     , foxp.putPrim(3))

const multest1fail_1_1_string: {
  [c.SexprKey]: '6'
, [c.ValueKey]: number} =
  mul
    <malpre>
    ()
    (mul
      <premul>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(2))
     // @ts-expect-error:
     , foxp.putPrim(3))

// @ts-expect-error:
const multest1f_notmatch_sexpr: {
  [c.SexprKey]: '5'
, [c.ValueKey]: number} =
   mul
     <premul>
     ()
     ((mul
       <premul>
       ()
       (foxp.putPrim(1)
       , foxp.putPrim(2)))
    , foxp.putPrim(3))

describe("mul", () => {
it('', () => { expect(multest0.value).toBe(3) })
it('', () => { expect(multest0_str.value).toBe(3) })
it('', () => { expect(multest0b.value).toBe(3) })
it('', () => { expect(multest0b_strict.value).toBe(3) })
it('', () => { expect(multest1_pass.value).toBe(6) })
})
