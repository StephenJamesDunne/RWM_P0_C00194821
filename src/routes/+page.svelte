<script lang="ts">
    import { cubes } from '$lib/filters';
    import { fizzbuzz, fizzbuzzes } from '$lib/filters';
    let sampleInput = '4 3 6 30 10 12';
    $: input = sampleInput.trim().split(/\s+/).filter(Boolean).map(Number);
    $: output = fizzbuzzes(input);
</script>

<h1>Sequence Filter Demo</h1>
<label>
    Input (space-separated integers):
    <input bind:value={sampleInput} placeholder="4 3 6 30 10 12"/>
</label>

<h2>Output</h2>
<p>{output.join(' ')}</p>

<style>
    label {display: block; margin: 1rem 0; }
    input {width: 100%; max-width: 30rem;}
</style>