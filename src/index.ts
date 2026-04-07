import * as merge from './merge'
import * as pre from './pre'
import * as bi from './builtins'
import * as regex from './regex'

export * from './merge'
export { regex } from './regex'
export { pre } from './pre'
export { builtins as bi } from './builtins'
export { putRecord, putVec, putFn1, putPrim, putSym, tap1, tid, ro, } from './foxp'

export * as foxp from './index'
