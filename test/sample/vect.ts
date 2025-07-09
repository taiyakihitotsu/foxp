import * as foxp from '../../src/foxp'
import * as bi   from '../../src/builtins'
import * as pre   from '../../src/pre'
import type Cion from '@taiyakihitotsu/cion'
import { describe, it, expect } from 'vitest'

const tested_vec = foxp.putVec(foxp.ro([0, 1, 2] as const))

const testvect0 = bi.first<pre.countN<3>>()(tested_vec)
const testvect0_ffailure =
  bi.first
    <pre.countN<3>>
    ()
// @ts-expect-error:
    (foxp.putVec(foxp.ro([0, 1] as const)))

describe("vect", () => {
  it("", () => { expect(tested_vec).toEqual([1,2,3]) })
  it("", () => { expect(testvect0.value).toEqual(1) })
})
