<script lang="ts">
  import ChecklistItem from '$lib/components/+component.svelte';
  
  let completedCount = 0;
  
  const items = [
    { id: 1, label: 'Complete project setup', done: false },
    { id: 2, label: 'Write tests', done: false },
    { id: 3, label: 'Deploy application', done: false }
  ];
  
  function handleItemChange(event: any) {
    const { done } = event.detail;
    if (done) {
      completedCount++;
    } else {
      completedCount--;
    }
  }
</script>

<div class="p-4">
  <h1>Test Checklist</h1>
  <p data-testid="counter">Completed: {completedCount}/{items.length}</p>
  
  <div class="mt-4 space-y-2">
    {#each items as item}
      <ChecklistItem 
        id={item.id} 
        label={item.label} 
        done={item.done}
        on:change={handleItemChange}
      />
    {/each}
  </div>
</div>