// Pure function: fizzbuzz function
export function fizzbuzz(x: number): string {
    if (x % 15 === 0) return '0';
    if (x % 3 === 0) return '3';
    if (x % 5 === 0) return '5';
    return x.toString();
}

// Map over a sequence
export function fizzbuzzes(xs: number[]): string[] {
    return xs.map(fizzbuzz);
}