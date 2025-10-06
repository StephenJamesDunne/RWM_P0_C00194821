<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let id: string | number;
  export let label: string;
  export let done: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  function handleChange(event: Event) {
    const newDone = (event.target as HTMLInputElement).checked;
    done = newDone; // Update local state
    dispatch('change', { id, done: newDone });
  }
</script>

<label class="flex items-center space-x-2">
  <input 
    type="checkbox" 
    bind:checked={done} 
    class="form-checkbox h-5 w-5 text-blue-600"
    on:change={handleChange}
    data-testid="checklist-item-{id}"
  />
  <span class:line-through={done}>{label}</span>
</label>