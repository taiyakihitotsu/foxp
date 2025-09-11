import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { split } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const split_test_ok_0: {
  [c.SexprKey]: "[]"
  , [c.ValueKey]: unknown } = 
  split
    ()
    ( foxp.putPrim('str')
    , foxp.putPrim('str'))

const split_test_ok_1: {
  [c.SexprKey]: "['st' 'ing']"
  , [c.ValueKey]: unknown } = 
  split
    ()
    ( foxp.putPrim('strring')
    , foxp.putPrim('r'))

const split_test_ok_2: {
  [c.SexprKey]: "['str' 'xyz']"
  , [c.ValueKey]: unknown } = 
  split
    ()
    ( foxp.putPrim('str01xyz')
    , foxp.putPrim('\\d+'))

const split_test_ok_3: {
  [c.SexprKey]: "['str01xyz']"
  , [c.ValueKey]: unknown } = 
  split
    ()
    ( foxp.putPrim('str01xyz')
    , foxp.putPrim('[abc]+'))

try {
const split_test_no_0: {
  [c.SexprKey]: {ast: unknown}
  , [c.ValueKey]: unknown } = 
  split
    ()
    // @ts-expect-error
    ( foxp.putPrim(1)
    , foxp.putPrim('[abc]+'))
} catch {}

try {
const split_test_no_1: {
  [c.SexprKey]: {ast: unknown}
  , [c.ValueKey]: unknown } = 
  split
    ()
    // @ts-expect-error
    ( foxp.putPrim('string')
    , foxp.putPrim(1))
} catch {}


describe('split', () => {
    it(`(split 'str' 'str')`
       , () => { expect(split_test_ok_0.value).toStrictEqual([]) })
    it(`(split 'strring' 'rr')`
       , () => { expect(split_test_ok_1.value).toStrictEqual(['st', 'ing']) })
    it(`(split 'str01xyz' '\\d+')`
       , () => { expect(split_test_ok_2.value).toStrictEqual(['str', 'xyz']) })
    it(`(split 'str01xyz' '[abc]+')`
       , () => { expect(split_test_ok_3.value).toStrictEqual(['str01xyz']) })
})
