# ts-variant

No frills polymorphic variants for typescript. 

https://github.com/betalyra/typescript-variant/assets/77549848/187428da-68a5-4b94-8ee4-65b5ade5da4e

## Install

```bash
npm install @betalyra/ts-variant
```

## Usage

Create a variant using the `Variant` type constructor:
```typescript
type Shape = Variant<{
  rectangle: { width: number; height: number };
  circle: { radius: number };
}>;
```
This will create variants `rectangle` and `circle`:
```typescript
const circle: Shape = { type: "circle", value: { radius: 10 } };
const rectangle: Shape = {
  type: "rectangle",
  value: { height: 10, width: 20 },
};
```

We can then use a pattern matching library like [`ts-pattern`](https://github.com/gvergnaud/ts-pattern) to do exhaustive pattern matching on the variant:
```typescript
const show = (shape: Shape) =>
  match(shape)
    .with(
      { type: "circle" },
      ({ value: { radius } }) => `Circle(radius=${radius})`
    )
    .with(
      { type: "rectangle" },
      ({ value: { width, height } }) =>
        `Rectangle(width=${width},height=${height})`
    )
    .exhaustive();
console.log(show(circle)); // Circle(radius=10)
console.log(show(rectangle)); // Rectangle(width=20,height=10)
```
Note that VS Code will give you type-safe autocomplete for this.

### Extending

You can extend this variant with another case by simply using the union type with another variant:
```typescript
type ExtShape =
  | Shape
  | Variant<{ triangle: { width: number; height: number } }>;
```
