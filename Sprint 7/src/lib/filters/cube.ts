// Pure function: cube a single integer
export function cube(x: number): number {
    return x ** 3;
}

// Map over a sequence
export function cubes(xs: number[]): number[] {
    return xs.map(cube);
}