<script lang="ts">
  import ChecklistItem from '$lib/components/component.svelte';
  import { itemsStore, completedStore, percentStore } from '$lib/stores/checklist';
  
  // Submitted states (only updates when Submit is clicked)
  let submittedCount = 0;
  let submittedPercentage = 0;
  
  function handleItemChange(event: CustomEvent) {
    const { id, done } = event.detail;

    itemsStore.update(items => {
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        items[itemIndex].done = done;
      }
      return [...items];
    });
  }
  
  function handleSubmit() {
    // Update the displayed percentage only when Submit is clicked
    submittedCount = $completedStore;
    submittedPercentage = $percentStore;
  }
</script>

<div class="container">
  <h1>Checklist</h1>
  <p data-testid="counter">Progress: {submittedCount}/{$itemsStore.length} ({submittedPercentage}%)</p>
  
  <!-- Progress Bar -->
  <div class="progress-container">
    <div 
      class="progress-bar"
      style="width: {submittedPercentage}%"
    ></div>
  </div>
  
  <div class="checklist-items">
    {#each $itemsStore as item (item.id)}
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
    class="submit-button"
  >
    Submit ({$completedStore}/{$itemsStore.length} currently checked)
  </button>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .progress-container {
    width: 100%;
    background-color: #e5e7eb;
    border-radius: 9999px;
    height: 1rem;
    margin-bottom: 1.5rem;
  }

  .progress-bar {
    background-color: #2563eb;
    height: 1rem;
    border-radius: 9999px;
    transition: width 0.3s ease;
  }

  .checklist-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.5rem;
    text-align: left;
  }

  .submit-button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #16a34a;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .submit-button:hover {
    background-color: #15803d;
  }
</style>