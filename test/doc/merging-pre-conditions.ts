import { foxp } from '../../src/index'
import { describe, it, expect } from 'vitest'



// NOTE: To keep a default pre, see `t3` pattern.
type Merged = foxp.pre.MergeTuple<[foxp.pre.Grater<2>, foxp.pre.Less<4>]>
const div = foxp.bi.div<Merged>()

// => 3/3
const t0 =
  div(
    foxp.putPrim(3)
  , foxp.putPrim(3)).value

const t1 =
  div(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(9)).value

try {
const t2 = 
  div(
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}

type NewMerged = foxp.pre.MergePreStr<Merged, foxp.pre.bi.div>
const newdiv = foxp.bi.div<NewMerged>()

try {
const t3 = 
  newdiv(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(0)).value
} catch {}



describe('basic-example', () => {
it('', () => { expect(t0).toBe(3/3) })
})
