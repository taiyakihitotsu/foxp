import { lambda, add } from '../../src/builtins'
import * as foxp from '../../src/foxp'
import { describe, it, expect } from 'vitest'

// -- types
const lambdatest0 = (n: number) => add()(foxp.putPrim(1), foxp.putSym('n', n))
const lambdatesta = lambdatest0(1)
const lambdatest1 = <N>(n: N) => add()(foxp.putPrim(1), foxp.putPrim(1))

// -- values
const lambdatestr0   = lambda<'n', 'number?'>(1)(lambdatest0)()(foxp.putPrim(1))

const lambdatestr0p  = lambda<'n', 'pos-int?'>(1)(lambdatest0)()(foxp.putPrim(1))

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
// @ts-expect-error
    (foxp.putPrim(1))

const lambdatestr1 = 
  lambda
    (1)
    (lambdatest0)
    ()
// @ts-expect-error:
    (foxp.putPrim('str'))

describe('lambda', () => {
it('', () => { expect(lambdatestr0.value).toBe(2) })
})
