import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { zipmap } from '../../src/builtins'
import { describe, it, expect } from 'vitest'

const zipmap_test_0: {
  [c.SexprKey]: '{0 0 1 1 2 2 3 3}'
, [c.ValueKey]: unknown} =
   zipmap
     ()
     ( foxp.putVec(foxp.ro([0,1,2,3] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const))
     )

const zipmap_test_1: {
  [c.SexprKey]: '{:a 0 :b 1 :c 2 :d 3}'
, [c.ValueKey]: unknown} =
   zipmap
     ()
     ( foxp.putVec(foxp.ro([':a', ':b', ':c', ':d'] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const zipmap_test_2: {
  [c.SexprKey]: '{:a 0 :b 1 :c 2}'
, [c.ValueKey]: unknown} =
   zipmap
     ()
     ( foxp.putVec(foxp.ro([':a',':b',':c'] as const))
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))

const zipmap_test_3: {
  [c.SexprKey]: '{:a 0 :b 1 :c 2}'
, [c.ValueKey]: unknown} =
   zipmap
     ()
     ( foxp.putVec(foxp.ro([':a', ':b', ':c', ':d'] as const))
     , foxp.putVec(foxp.ro([0,1,2] as const)))

const zipmap_test_4: {
  [c.SexprKey]: `nil`
, [c.ValueKey]: unknown} =
   zipmap
     ()
     ( foxp.putVec(foxp.ro([] as const))
     , foxp.putVec(foxp.ro([] as const)))

try {
const zipmap_test_no_0: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   zipmap
     ()
     // @ts-expect-error
     ( foxp.putPrim(0)
     , foxp.putVec(foxp.ro([0,1,2,3] as const)))
} catch {}

try {
const zipmap_test_no_1: {
  [c.SexprKey]: {ast: {error: unknown}}
, [c.ValueKey]: unknown} =
   zipmap
     ()
     // @ts-expect-error
     ( foxp.putRecord({a: 1} as const)
     , foxp.putPrim(2))
} catch {}

describe('zipmap', () => {
  it('(zipmap [0 1 2 3] [0 1 2 3])', () => { expect(zipmap_test_0.value).toStrictEqual({0: 0, 1: 1, 2: 2, 3: 3}) })
  it('(zipmap [:a :b :c :d] [0 1 2 3])', () => { expect(zipmap_test_1.value).toStrictEqual({a: 0, b: 1, c: 2, d: 3}) })
  it('(zipmap [:a :b :c :d] [0 1 2])', () => { expect(zipmap_test_2.value).toStrictEqual({a: 0, b: 1, c: 2}) })
  it('(zipmap [:a :b :c] [0 1 2 3])', () => { expect(zipmap_test_3.value).toStrictEqual({a: 0, b: 1, c: 2}) })
  it('(zipmap [] [])', () => { expect(zipmap_test_4.value).toStrictEqual(undefined) })
})
