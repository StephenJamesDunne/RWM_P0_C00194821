<script lang="ts">
    import ChecklistItem from './component.svelte';
    import { itemsStore, completedStore, percentStore } from '$lib/stores/checklist';
    
    export let title: string = 'Checklist';
    export let showProgress: boolean = true;
    
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
        submittedCount = $completedStore;
        submittedPercentage = $percentStore;
    }
</script>

<h1>{title}</h1>
<p data-testid="counter">Completed: {submittedCount}/{$itemsStore.length}</p>
{#if showProgress}
    <p data-testid="percent">{submittedPercentage}%</p>
    
    <div class="progress-container">
        <div 
            class="progress-bar"
            style="width: {submittedPercentage}%"
        ></div>
    </div>
{/if}

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

<button 
    on:click={handleSubmit}
    class="submit-button"
>
    Submit ({$completedStore}/{$itemsStore.length} currently checked)
</button>