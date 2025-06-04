import * as foxp from '../src/foxp'
import * as c from '../src/const'
import * as pre from '../src/pre'

const ffff
  = { [c.SexprKey]: '(fn [n] (+ 1 n))'
    , [c.ValueKey]: { [c.PreKey]: '(fn [n] (= 2 n))'
                    , [c.FnKey]: (n: number) => 1 + n } } as const

const jjjc
  = foxp.tap1(
      ffff
      , foxp.putPrim(2))

const aaac = jjjc.value + 1
