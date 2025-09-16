import { fizzbuzz, fizzbuzzes } from "$lib/filters";

// Prefer importing from the peer package root
import { decrementlessthanfirst } from "peer-filter-C00288668/src/lib/filters";

export function combinedFilter(xs: number[]): (number | string)[] {
    const afterDecrement = decrementlessthanfirst(xs);
    return fizzbuzzes(afterDecrement);
}