import { lambda, add, fn } from '../../src/builtins'
import * as foxp from '../../src/foxp'
import * as pre  from '../../src/pre'
import { describe, it, expect } from 'vitest'

// -- pass through
const a = lambda<'m', 'number?'>(1)((m:number) => add()(foxp.putPrim(1), foxp.putSym('m', m)))
const lambdatest0 = (m: number) => a()(foxp.putSym('m', m))

// -- return fn
const b = lambda<'m', 'number?'>(1)((m:number) => lambda<'n', 'number?'>(1)((n:number) => add()(foxp.putSym('n', n), foxp.putSym('m', m)))) // [todo] change => foxtypeext to . | lambda

const c = lambda<'m', 'number?'>(1)((m:number) => add()(foxp.putPrim(1), foxp.putSym('m', m)))

const d_success = lambda<'n', 'number?'>(1)((n:number) => c()(foxp.putPrim(1)))
const d_success2 = lambda<'m', 'number?'>(1)((m:number) => c()(foxp.putSym('m', m))) // [todo] if quote-true, sexprR shouldn't be evaluated.

// -- currying


// const lambdatestr0 = lambda<'n m', pre.bi.add>(2)(lambdatest0)()

 

// describe('lambda', () => {
// it('', () => { expect(lambdatestr0.value).toBe(2) })
// })
