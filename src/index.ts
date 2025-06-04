import * as merge from './merge'
import * as pre from './pre'
import * as bi from './builtins'

//export { merge, pre, bi } 
export * from './merge'
export { pre } from './pre'
export { builtins as bi } from './builtins'
export { putRecord, putVec, putFn1, putPrim, tap1, tid, } from './foxp'
