import { foxp } from '../../src/index'
import { describe, it, expect } from 'vitest'



const div = foxp.bi.div()

// => 3/2
const t0 =
  div(
    foxp.putPrim(3)
  , foxp.putPrim(2)).value

// => Error but success to catch at the type-check.
try {
  div(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}



describe('basic-example', () => {
it('', () => { expect(t0).toBe(3/2) })
})
