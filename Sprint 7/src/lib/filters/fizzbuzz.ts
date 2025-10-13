// Pure function: fizzbuzz function
export function fizzbuzz(x: number): number {
    if (x % 15 === 0) return 0;
    if (x % 3 === 0) return 3;
    if (x % 5 === 0) return 5;
    return x;
}

// Map over a sequence
export function fizzbuzzes(xs: number[]): number[] {
    return xs.map(fizzbuzz);
}