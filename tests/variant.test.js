var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { match } from "ts-pattern";
describe("Variant", () => {
    const circle = { type: "circle", value: { radius: 1 } };
    const rectangle = {
        type: "rectangle",
        value: { height: 5, width: 2 },
    };
    test("should compile with exhaustive pattern matching", () => __awaiter(void 0, void 0, void 0, function* () {
        const area = (shape) => match(shape)
            .with({ type: "circle" }, ({ value: { radius } }) => Math.PI * radius * radius)
            .with({ type: "rectangle" }, ({ value: { height, width } }) => width * height)
            .exhaustive();
        expect(area(circle)).toBe(Math.PI);
        expect(area(rectangle)).toBe(10);
    }));
    test("should be an extendable polymorphic variant", () => __awaiter(void 0, void 0, void 0, function* () {
        const area = (shape) => match(shape)
            .with({ type: "circle" }, ({ value: { radius } }) => Math.PI * radius * radius)
            .with({ type: "rectangle" }, ({ value: { height, width } }) => width * height)
            .with({ type: "triangle" }, ({ value: { height, width } }) => (1 / 2) * width * height)
            .exhaustive();
        const triangle = {
            type: "triangle",
            value: { height: 5, width: 2 },
        };
        expect(area(circle)).toBe(Math.PI);
        expect(area(rectangle)).toBe(10);
        expect(area(triangle)).toBe(5);
    }));
});
