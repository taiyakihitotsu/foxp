import { foxp } from '../src/index'

/* div-by-zero */

const div = foxp.bi.div()

const div_ok =
  div(
    foxp.putPrim(3),
    foxp.putPrim(2)
  ).value

const div_err =
  div(
  // @ts-expect-error:
    foxp.putPrim(3),
    foxp.putPrim(0)
  ).value

/* range */

type Range0to10 = foxp.pre.Range<0, 10>

const range_ok =
  foxp.bi.inc<Range0to10>()(
    foxp.putPrim(5)
  )

const range_err =
  foxp.bi.inc<Range0to10>()(
  // @ts-expect-error:
    foxp.putPrim(20)
  )

const range_min_err =
  foxp.bi.inc<Range0to10>()(
  // @ts-expect-error:
    foxp.putPrim(-1)
  )

/* get-in */
const map_getIntest_nest_with_ro_leaf =
  foxp.bi.getIn()
    ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
    , foxp.putVec([':a', 1] as const))

const map_getIntest_nest_out_of_bound0 =
  foxp.bi.getIn()
  // @ts-expect-error:
    ( foxp.putRecord(foxp.ro({a: [0,2], b: 2} as const))
    , foxp.putVec([':c'] as const))

/* merge */

type Merged = foxp.pre.MergeTuple<[foxp.pre.Greater<2>, foxp.pre.Less<4>]>
const userDiv = foxp.bi.div<Merged>()

// => 3/3
const userDiv_valid =
  userDiv(
    foxp.putPrim(3)
  , foxp.putPrim(3)).value

const userDiv_invalid =
  userDiv(
// @ts-expect-error:
    foxp.putPrim(3)
  , foxp.putPrim(9)).value
