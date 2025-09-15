import {describe, it, expect} from 'vitest';
import {cube, cubes} from './cube';

describe('cube filter', ()=> {
    it('cubes a sequence', ()=> {
        const input = [1, 3, 5, 7, 9, 999];
        const expected = [1, 27, 125, 343, 729, 997002999];
        expect(cubes(input)).toEqual(expected);
    });
})