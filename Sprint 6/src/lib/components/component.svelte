<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let id: string | number;
  export let label: string;
  export let done: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  function handleChange(event: Event) {
    const newDone = (event.target as HTMLInputElement).checked;
    done = newDone;
    dispatch('change', { id, done: newDone });
  }
</script>

<label class="flex items-center gap-2">
  <input 
    type="checkbox" 
    bind:checked={done} 
    on:change={handleChange}
  />
  <span>{label}</span>
</label>