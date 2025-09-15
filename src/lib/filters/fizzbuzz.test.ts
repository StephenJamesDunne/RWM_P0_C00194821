import {describe, it, expect} from 'vitest';
import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz filter', () => {
    it('returns "3" for multiples of 3', () => {
        expect(fizzbuzz(3)).toBe('fizz');
        expect(fizzbuzz(6)).toBe('fizz');
        expect(fizzbuzz(9)).toBe('fizz');
    });

    it('returns "5" for multiples of 5', () => {
        expect(fizzbuzz(5)).toBe('5');
        expect(fizzbuzz(10)).toBe('5');
        expect(fizzbuzz(20)).toBe('5');
    });

    it('returns "0" for multiples of 15', () => {
        expect(fizzbuzz(15)).toBe('0');
        expect(fizzbuzz(30)).toBe('0');
        expect(fizzbuzz(45)).toBe('0');
    });
});