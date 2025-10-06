<script lang="ts">
  import ChecklistItem from '$lib/components/component.svelte';
  
  let items = [
    { id: 1, label: 'Complete project setup', done: false },
    { id: 2, label: 'Write tests', done: false },
    { id: 3, label: 'Deploy application', done: false }
  ];
  
  // Current states (updates immediately when checkboxes change)
  $: currentCompletedCount = items.filter(item => item.done).length;
  
  // Submitted states (only updates when Submit is clicked)
  let submittedCount = 0;
  let submittedPercentage = 0;
  
  function handleItemChange(event: CustomEvent) {
    const { id, done } = event.detail;
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      items[itemIndex].done = done;
      items = [...items];
    }
  }
  
  function handleSubmit() {
    // Update the displayed percentage only when Submit is clicked
    submittedCount = currentCompletedCount;
    submittedPercentage = Math.round((submittedCount / items.length) * 100);
  }
</script>

<div class="p-4">
  <h1>Checklist</h1>
  <p>Progress: {submittedCount}/{items.length} ({submittedPercentage}%)</p>
  
  <!-- Progress Bar -->
  <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
    <div 
      class="bg-blue-600 h-4 rounded-full transition-all duration-300"
      style="width: {submittedPercentage}%"
    ></div>
  </div>
  
  <div class="space-y-2 mt-4">
    {#each items as item (item.id)}
      <ChecklistItem 
        id={item.id} 
        label={item.label} 
        done={item.done}
        on:change={handleItemChange}
      />
    {/each}
  </div>
  
  <!-- Submit Button -->
  <button 
    on:click={handleSubmit}
    class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Submit ({currentCompletedCount}/{items.length} currently checked)
  </button>
</div>