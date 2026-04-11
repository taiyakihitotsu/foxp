import type Cion from '@taiyakihitotsu/cion'

// -------------------- Purpose ---------------------------------------
//
// `fraction.ts` bridges the gap between type-level representations and runtime values.
//
// TypeScript does not support fractional literal types such as `3/2`.
// It only provides the `number` type, which represents values like `1.5` at runtime.
//
// Currently, Cion does not support rational number types (including decimal representations).
//
// Therefore, fractions are represented as string literals (e.g. "3/2"),
// allowing them to be treated as singleton types for constructing Cion s-expressions.
//
// At runtime, these string representations are parsed and converted into numeric values
// just before evaluation.
//
// [note]
// foxp objects retain fractional expressions (as Cion s-expressions) 
// at the value-level within c.SexprKey.
// Since these original string representations are preserved throughout the data flow, 
// they could potentially be leveraged to implement exact rational arithmetic in the future.
// -----------------------------------------------------------------

// ----------------------------------
// -- Utility
// ----------------------------------

type Fraction = [n: number, d: number];

const gcd = (a: number, b: number): number => {
  let ia = Math.abs(a);
  let ib = Math.abs(b);
  while (ib) {
    ia %= ib;
    [ia, ib] = [ib, ia];
  }
  return ia;
};


const isDenominator = (d: number): boolean => (Number.isFinite(d) && typeof d === 'number' && !(d === 0 || Number.isNaN(d)))

const simplifyNum = (d: number) => d === 0 ? 0 : d

const normalize = ([n, d]: Fraction): Fraction | null => {
  if (!isDenominator(d)) return null;

  const common = gcd(n, d);
  const sign = d < 0 ? -1 : 1;

  const num = (n / common) * sign
  const den = (d / common) * sign
  if (!isDenominator(den)) return null
  return [simplifyNum(num), den];
};

const parseToTuple = (s: string): Fraction | null => {
  // Accept -n/-m.
  const match = s.match(/^([+-]?\d+)(?:\/([-+]?\d+))?$/);
  if (match === null || match[1] === undefined) return null;

  const n = parseInt(match[1], 10);
  const d = match[2] ? parseInt(match[2], 10) : 1;

  return !isDenominator(d) ? null : normalize([n, d]);
};

const serialize = ([n, d]: Fraction): number => 
  d === 1 ? n : n / d;

// ----------------------------------
// -- Core
// ----------------------------------

export type isRational<
  S> =
  S extends string
    ? Cion.Lisp<`(re-find '^[+-]?[0-9]+(/[+-]?[0-9]+)?$' '${S}')`> extends `''`
      ? false
    : true
  : false

const internalFraction = (s: number | string): number | string => {
  if (typeof s !== 'string') return s;

  const tuple = parseToTuple(s);

  if (tuple === null) return s;

  return simplifyNum(serialize(tuple))
};

// A version of type-check omitted.
// Defined only for the internal implementation of `foxp.putPrim`.
export const unsafeSomeFraction: (s: unknown) => number | string = (s) => 
  internalFraction(s as number | string);

export const someFraction = <T extends number | string>(
  s: T extends (isRational<T> extends true ? T : never) ? T : never
): number | string => 
  internalFraction(s);

export * as fraction from './fraction.js'
