import { type Head, type Tail, AnyArray } from "ts-essentials";

// Union to Array using this trick:
// https://github.com/microsoft/TypeScript/issues/13298#issuecomment-1610361208
type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;
type UnionToTuple<T, A extends any[] = []> = UnionToIntersection<
  T extends never ? never : (t: T) => T
> extends (_: never) => infer W
  ? UnionToTuple<Exclude<T, W>, [...A, W]>
  : A;

type VariantElem<U extends keyof V, V> = Pick<V, U>[U] extends infer P
  ? P extends undefined
    ? { type: U }
    : { type: U; value: Pick<V, U>[U] }
  : never;

export type Variant<V extends Record<string, any>> = UnionToTuple<
  keyof V
> extends infer L
  ? L extends AnyArray
    ? Head<L> extends infer U
      ? U extends string
        ? Tail<L> extends infer T
          ? T extends string[]
            ? VariantElem<U, V> | Variant<Omit<V, U>>
            : VariantElem<U, V>
          : never
        : never
      : never
    : never
  : never;
