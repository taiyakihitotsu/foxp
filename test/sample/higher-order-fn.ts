import { lambda, lambdaWrap, add, fn } from '../../src/builtins'
import * as foxp from '../../src/foxp'
import * as pre  from '../../src/pre'
import * as c    from '../../src/const'
import { describe, it, expect } from 'vitest'

type yposint = `(fn [x y] (pos-int? y))`

//
// -- normal
//
const lambda_a = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const a_success0 = lambda_a()(foxp.putPrim(1))
const a_failure0
 = lambda_a
     ()
// @ts-expect-error
     (foxp.putPrim(-1))

// 
// -- pass through pattern
//
const lambda_c = lambda<'m', 'number?'>(1)((m:number) => add<yposint>()(foxp.putPrim(1), foxp.putSym('m', m)))
const d_success2 = lambda<'n', 'number?'>(1)((n:number) => lambda_c()(foxp.putSym('n', n)))
const d_success3 = d_success2()(foxp.putPrim(1))
const d_failure0
 = d_success2
     ()
// @ts-expect-error:
     (foxp.putPrim(-1))

//
// -- pass through pattern 2
//
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



// hof by hand

const ft = lambdaWrap<'m', 'pos-int?'>(1)((m:number) => (
        lambdaWrap<'n', 'number?'>(1)((n: number) => add()(foxp.putSym('n', n), foxp.putSym('m', m)))))

const ft_result0 = ft()(foxp.putPrim(1))
const ft_result1 = ft_result0.value.fn()(foxp.putPrim(2))
const ft_result2 = ft_result0.value.fn()(foxp.putPrim(2)).value.fn

// -- vitest

describe('hof', () => {
it('', () => { expect(a_success0.value).toBe(2) })
it('', () => { expect(d_success3.value).toBe(2) })
it('', () => { expect(e_success5.value).toBe(2) })
it('', () => { expect(ft_result2.value).toBe(3) })
})
