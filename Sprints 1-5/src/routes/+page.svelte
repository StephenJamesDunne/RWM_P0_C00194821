<script lang="ts">
    import { cubes } from '$lib/filters';
    import { fizzbuzz, fizzbuzzes } from '$lib/filters';
    let sampleInput = '4 3 6 30 10 12';
    $: input = sampleInput.trim().split(/\s+/).filter(Boolean).map(Number);
    $: output = fizzbuzzes(input);
</script>

<h1>Fizzbuzz Demo</h1>
<label>
    Input (space-separated integers):
    <input bind:value={sampleInput} placeholder=""/>
</label>

<h2>Output</h2>
<p>{output.join(' ')}</p>

<a href="/combined">Go to combined filter demo</a>

<style>
    :global(body) {
        background-color: #1e1e1e;
        color: #e0e0e0;
        margin: 0;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
    }

    h1, h2 {
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