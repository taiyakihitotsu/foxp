import { lambda, add } from '../../src/builtins'
import * as foxp from '../../src/foxp'
import * as pre from '../../src/pre'
import { describe, it, expect } from 'vitest'

// -- types
const lambdatest0 = (n: number) => add()(foxp.putPrim(1), foxp.putSym('n', n))
const lambdatesta = lambdatest0(1)
const lambdatest1 = <N>(n: N) => add()(foxp.putPrim(1), foxp.putPrim(1))

// -- values
const _lambdatestr0 = lambda<'n', 'number?'>(1)((n: number) => add()(foxp.putPrim(1), foxp.putSym('n', n)))
const lambdatestr0 = _lambdatestr0()(foxp.putPrim(1))
const _lambdatestr0p = lambda<'n', 'pos-int?'>(1)((n: number) => add()(foxp.putPrim(1), foxp.putSym('n', n)))
const lambdatestr0p = _lambdatestr0p()(foxp.putPrim(1))

const lambdatestr1pf =
  lambda<'n', 'pos-int?'>
    (1)
    (lambdatest0)
    ()
// @ts-expect-error:
    (foxp.putPrim(-1))

const lambdatestr0n  = lambda<'n', 'neg-int?'>(1)(lambdatest0)()(foxp.putPrim(-1))

const lambdatestr1nf =
  lambda<'n', 'neg-int?'>
    (1)
    (lambdatest0)
    ()
// @ts-expect-error:
    (foxp.putPrim(1))

const lambdatestr1 = 
  lambda
    (1)
    (lambdatest0)
    ()
// @ts-expect-error:
    (foxp.putPrim('str'))

type yposint = `(fn [x y] (pos-int? y))`

const lambda_a = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const a_success0 = lambda_a()(foxp.putPrim(1))
const a_failure0
 = lambda_a
     ()
// @ts-expect-error
     (foxp.putPrim(-1))

// -- pass through pattern
const lambda_c = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const d_success2 = lambda<'n', 'number?'>(1)((n:number) => lambda_c()(foxp.putSym('n', n)))
const d_success3 = d_success2()(foxp.putPrim(1))
const d_failure0
 = d_success2
     ()
// @ts-expect-error:
     (foxp.putPrim(-1))

// -- pass through pattern 2
const e_success3 = lambda<'m', 'pos-int?'>(1)((m:number) => lambda_c()(foxp.putSym('m', m)))
const e_success4 = lambda<'n', 'number?'>(1)((n:number) => e_success3()(foxp.putSym('n', n)))
const e_success5 = e_success4()(foxp.putPrim(1))
const e_failure5 = 
  e_success4
    ()
// @ts-expect-error:
    (foxp.putPrim('s'))
const e_failure6 = 
  e_success4
    ()
// @ts-expect-error:
    (foxp.putPrim(-1))

// ----------------------------------------------
// -- Two arguments lambda
// ----------------------------------------------

const recomposedPre = '(fn [x y] (and (< 0 x) (= 5 y)))' as const
type RecomposedPre = typeof recomposedPre

const recomposed_add = lambda<'x y', RecomposedPre>(2)((x, y) => add()(foxp.putSym('y', y), foxp.putSym('x', x)))
const recomposed_add_ok = recomposed_add()(foxp.putPrim(1), foxp.putPrim(5))

const mismatch_recomposed_add = lambda<'m n', RecomposedPre>(2)((x, y) => add()(foxp.putSym('y', y), foxp.putSym('x', x)))
const mismatch_recomposed_add_err = mismatch_recomposed_add()(
  // @ts-expect-error:
  foxp
    .putPrim(1), foxp.putPrim(5))

const violate_recomposed_add_err_0 = recomposed_add()(
  // @ts-expect-error:
  foxp
    .putPrim(1), foxp.putPrim(4))

const violate_recomposed_add_err_1 = recomposed_add()(
  // @ts-expect-error:
  foxp
    .putPrim(-1), foxp.putPrim(5))

describe('lambda', () => {
it('', () => { expect(lambdatestr0.value).toBe(2) })
it('', () => { expect(a_success0.value).toBe(2) })
it('', () => { expect(d_success3.value).toBe(2) })
it('', () => { expect(e_success5.value).toBe(2) })
it(`recomposed add with ${recomposedPre}`, () => { expect(recomposed_add_ok.value).toBe(6) })
})
