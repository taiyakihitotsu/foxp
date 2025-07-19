import * as foxp from '../../src/foxp'
import * as bi   from '../../src/builtins'
import * as pre  from '../../src/pre'
import { describe, it, expect } from 'vitest'

const tested_num = foxp.putPrim(3)
type tested_pre = pre.Range<0,10>

const testnum0_success = bi.inc<tested_pre>()(tested_num)

const testnum0_ffailure =
  bi.inc
    <tested_pre>
    ()
// @ts-expect-error:
    (foxp.putPrim(20))

describe("vect", () => {
  it("", () => { expect(tested_num.value).toEqual(3) })
  it("", () => { expect(testnum0_success.value).toEqual(4) })
})
