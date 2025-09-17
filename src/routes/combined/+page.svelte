<!-- src/routes/combined/+page.svelte -->
<script lang="ts">
  import { combinedFilter } from '$lib/combined/combined';
  let raw = '1 2 3 4 5 15';
  $: input = raw.trim().split(/\s+/).filter(Boolean).map(Number);
  $: output = combinedFilter(input);
</script>

<h1>Combined (Emily's decrementLessThanFirst → my Fizzbuzz)</h1>
<label>Input <input bind:value={raw} /></label>
<p>Expected output: integers with a value less than first input will decremented, then all values will be fizzbuzzed</p>
<p>Output: {output.join(' ')}</p>

<a href="/">Go to sequence filter demo</a>

<style>
    :global(body) {
        background-color: #1e1e1e;
        color: #e0e0e0;
        margin: 0;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
    }

    h1 {
        color: #88c0d0;
        margin-bottom: 2rem;
    }

    input {
        background-color: #2e2e2e;
        border: 1px solid #404040;
        color: #e0e0e0;
        padding: 0.5rem;
        border-radius: 4px;
        width: 100%;
        max-width: 30rem;
        margin-top: 0.5rem;
    }

    input:focus {
        outline: none;
        border-color: #88c0d0;
    }

    p {
        background-color: #2e2e2e;
        padding: 1rem;
        border-radius: 4px;
        border-left: 4px solid #88c0d0;
    }

    a {
        display: inline-block;
        background-color: #404040;
        color: #e0e0e0;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        transition: background-color 0.2s;
    }

    a:hover {
        background-color: #505050;
    }
</style>
