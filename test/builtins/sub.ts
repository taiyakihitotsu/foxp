import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { sub } from '../../src/builtins'
import * as merge from '../../src/merge'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'
type presub = ['number?', 'number?']
type prestrict = ['number?', merge.MergePreStr<'number?', 'pos-int?'>]
type malpre = ['number?', 'string?']

// --test
const subtest0: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
   sub
     <pre.sub>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))

const subtest0_str: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
   sub
     <'(fn [n] (and (number? (first n)) (number? (second n))))'>
     ()
     ( foxp.putPrim(1)
     , foxp.putPrim(1))



const subtest0_hof = sub<['number?', '']>()
const subtest0_hof_app =
  subtest0_hof(
    foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim('s'))

const subtest0_hof_app_ok =
  subtest0_hof(
    foxp.putPrim(1)
    , foxp.putPrim(1))

const subtest0b: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  sub
    <presub>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))


const subtest0b_strict: {
  [c.SexprKey]: '0'
, [c.ValueKey]: number} =
  sub
    <prestrict>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const subtest0b_strict_failed: {
  [c.SexprKey]: '2'
, [c.ValueKey]: number} =
  sub
    <prestrict>
    ()
    ( foxp.putPrim(1)
// @ts-expect-error:
    , foxp.putPrim(-1))

// @ts-expect-error:
const subtest0f_notmatch_sexpr: {
  [c.SexprKey]: '(+ 1 2)'
, [c.ValueKey]: number} =
  sub
    <presub>
    ()
    ( foxp.putPrim(1)
    , foxp.putPrim(1))

const subtest1_pass: {
  [c.SexprKey]: '-3'
, [c.ValueKey]: number} =
  sub
    <presub>
    ()
    (sub
      <presub>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
      , foxp.putPrim(3))  


const subtest1fail_0_1_string: {
  [c.SexprKey]: '-3'
, [c.ValueKey]: number} =
  sub
    <presub>
    ()
    (sub
       <malpre>
       ()
       (
       foxp.putPrim(1)
       // @ts-expect-error:
       , foxp.putPrim(1))
     , foxp.putPrim(3))

const subtest1fail_1_1_string: {
  [c.SexprKey]: '-3'
, [c.ValueKey]: number} =
  sub
    <malpre>
    ()
    (sub
      <presub>
      ()
      ( foxp.putPrim(1)
      , foxp.putPrim(1))
     // @ts-expect-error:
     , foxp.putPrim(3))

// @ts-expect-error:
const subtest1f_notmatch_sexpr: {
  [c.SexprKey]: '(+ (+ 1 1) 1)'
, [c.ValueKey]: number} =
   sub
     <presub>
     ()
     ((sub
       <presub>
       ()
       (foxp.putPrim(1)
       , foxp.putPrim(1)))
    , foxp.putPrim(3))

describe('sub', () => {
it('', () => { expect(subtest0.value).toBe(0)})
it('', () => { expect(subtest0_str.value).toBe(0)})
it('', () => { expect(subtest0b.value).toBe(0)})
it('', () => { expect(subtest0b_strict.value).toBe(0)})
it('', () => { expect(subtest1_pass.value).toBe(-3) })
})
