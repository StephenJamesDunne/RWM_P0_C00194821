import { describe, it, expect } from "vitest";
import { combinedFilter } from "./combined.js";

// multiple of 3 and 5 is fizzbuzzed to 0 (not 15)
// multiple of 3 is fizzed to 3
// multiple of 5 is buzzed to 5
describe('combined (mine -> peer)', () => {
    it('decrements less than first, then fizzbuzzes', () => {
        expect(combinedFilter([1, 2, 3, 4, 5, 15])).toEqual([1, 2, 3, 4, 5, 0]);
    });
    
});