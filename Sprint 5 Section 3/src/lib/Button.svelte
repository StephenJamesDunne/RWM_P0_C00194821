<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string = 'Submit'; // from A
  export let variant: 'primary' | 'secondary' = 'primary'; // from A
  export let disabled: boolean = false; // from B

  const dispatch = createEventDispatcher<{ pressed: { at: number } }>();

  function handleClick() {
    if (disabled) return;
    dispatch('pressed', { at: Date.now() });
  }
</script>

<button
  class="btn"
  data-variant={variant}
  {disabled}
  on:click={handleClick}
>
  {label}
</button>

<style>
  .btn {
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 0.375rem;
    opacity: var(--opacity, 1);
  }
  .btn:disabled { --opacity: 0.6; cursor: not-allowed; }
  .btn[data-variant="primary"] { background: #2563eb; }
  .btn[data-variant="secondary"] { background: #6b7280; }
</style>
