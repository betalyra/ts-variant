import { Variant } from "../src/index.js";
import { match } from "ts-pattern";

describe("Variant", () => {
  type Shape = Variant<{
    circle: { radius: number };
    rectangle: { width: number; height: number };
  }>;
  const circle: Shape = { type: "circle", value: { radius: 1 } };
  const rectangle: Shape = {
    type: "rectangle",
    value: { height: 5, width: 2 },
  };

  test("should compile with exhaustive pattern matching", async () => {
    const area = (shape: Shape) =>
      match(shape)
        .with(
          { type: "circle" },
          ({ value: { radius } }) => Math.PI * radius * radius
        )
        .with(
          { type: "rectangle" },
          ({ value: { height, width } }) => width * height
        )
        .exhaustive();

    expect(area(circle)).toBe(Math.PI);
    expect(area(rectangle)).toBe(10);
  });
  type ExtendedShape =
    | Shape
    | Variant<{ triangle: { width: number; height: number } }>;
  test("should be an extendable polymorphic variant", async () => {
    const area = (shape: ExtendedShape) =>
      match(shape)
        .with(
          { type: "circle" },
          ({ value: { radius } }) => Math.PI * radius * radius
        )
        .with(
          { type: "rectangle" },
          ({ value: { height, width } }) => width * height
        )
        .with(
          { type: "triangle" },
          ({ value: { height, width } }) => (1 / 2) * width * height
        )
        .exhaustive();

    const triangle: ExtendedShape = {
      type: "triangle",
      value: { height: 5, width: 2 },
    };
    expect(area(circle)).toBe(Math.PI);
    expect(area(rectangle)).toBe(10);
    expect(area(triangle)).toBe(5);
  });
});
