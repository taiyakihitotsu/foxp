import * as c from '../../src/const'
import * as foxp from '../../src/foxp'
import { map, inc } from '../../src/builtins'
import { describe, it, expect } from 'vitest'
import * as pre from '../../src/pre'

// [todo] move.
const pinc = foxp.putFn1<pre.bi.inc, 'inc'>()(inc())
const ptest = foxp.putFn1<pre.bi.inc, 'inc'>()((w: number) => ({value: 1}))

const map_test_ok_0:
  {[c.SexprKey]: '[1 2 3]'
  ,[c.ValueKey]: unknown[]} =
  map
    ()
    (pinc, foxp.putVec(foxp.ro([0, 1, 2] as const)))

// [todo] this should be an error
const map_test_ok_1:
  {[c.SexprKey]: '[1 2 3]'
  ,[c.ValueKey]: unknown[]} =
  map
    ()
    (pinc, foxp.putVec(foxp.ro(['0', '1', '2'] as const)))

try {
const map_test_no_1:
  {[c.SexprKey]: {ast: unknown[]}
  ,[c.ValueKey]: unknown[]} =
  map
    ()
    // @ts-expect-error:
    (pinc, foxp.putVec(foxp.ro([true, true] as const)))
} catch {}

try {
const map_test_no_2:
  // [note] This is not the same error case of `map_test_no_1` .
  {[c.SexprKey]: {ast: {sexpr: unknown[]}}
  ,[c.ValueKey]: unknown[]} =
  map
    ()
    // @ts-expect-error:
    (pinc, foxp.putVec(foxp.ro([true, pinc] as const)))
} catch {}

describe('add', () => {
    it('(map inc [0 1 2])', () => { expect(map_test_ok_0.value).toStrictEqual([1,2,3]) })
})
