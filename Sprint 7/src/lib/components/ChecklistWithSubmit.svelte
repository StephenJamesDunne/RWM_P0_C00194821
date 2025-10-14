<script lang="ts">
	import ChecklistItem from './component.svelte';
	import { itemsStore, completedStore, percentStore } from '$lib/stores/checklist';
	export let targetPercent: number = 80; // different prop name

	export let title: string = 'Checklist';
	export let showProgress: boolean = true;
	export let target: number = 80;

	// Submitted states (only updates when Submit is clicked)
	let submittedCount = 0;
	let submittedPercentage = 0;

	// Animation state for progress bar
	let animatedPercentage = 0;
	let isAnimating = false;

	function handleItemChange(event: CustomEvent) {
		const { id, done } = event.detail;

		itemsStore.update((items) => {
			const itemIndex = items.findIndex((item) => item.id === id);
			if (itemIndex !== -1) {
				items[itemIndex].done = done;
			}
			return [...items];
		});
	}

	function handleSubmit() {
		const previousPercentage = submittedPercentage;
		const newPercentage = $percentStore;

		submittedCount = $completedStore;
		submittedPercentage = newPercentage;

		// Animate the progress bar
		if (showProgress) {
			if (previousPercentage !== newPercentage) {
				// Start animation
				isAnimating = true;

				// Keep animated bar at previous position initially
				animatedPercentage = previousPercentage;

				// Trigger animation to new value after a brief delay
				requestAnimationFrame(() => {
					animatedPercentage = newPercentage;
				});

				// Reset animation state after animation completes
				setTimeout(() => {
					isAnimating = false;
				}, 1050);
			} else {
				// No change in percentage, just update directly
				animatedPercentage = newPercentage;
			}
		}
	}
</script>

<h1>{title}</h1>
<p data-testid="counter">Completed: {submittedCount}/{$itemsStore.length}</p>
{#if showProgress}
	<p data-testid="percent">{submittedPercentage}%</p>

	<div class="progress-container">
		<!-- Target bar (light color, snaps immediately) -->
		<div class="progress-bar-target" style="width: {submittedPercentage}%"></div>

		<!-- Animated bar (dark color, animates smoothly) -->
		<div
			class="progress-bar-animated"
			class:animating={isAnimating}
			style="width: {animatedPercentage}%"
		></div>
		<div class="progress-wrapper">
			<div class="progress-fill" style="width: {submittedPercentage}%"></div>
			<span
				class="target-line"
				style="left: {targetPercent}%"
				data-achieved={submittedPercentage >= targetPercent}
			></span>
		</div>

		<div
			class="goal-marker"
			style="left: calc({target}%)"
			class:goal-reached={submittedPercentage >= target}
		></div>
	</div>
{/if}

<div class="checklist-items">
	{#each $itemsStore as item (item.id)}
		<ChecklistItem id={item.id} label={item.label} done={item.done} on:change={handleItemChange} />
	{/each}
</div>

<button on:click={handleSubmit} class="submit-button">
	Submit ({$completedStore}/{$itemsStore.length} currently checked)
</button>

<style>
	.progress-container {
		position: relative;
		width: 100%;
		background-color: #e5e7eb;
		border-radius: 9999px;
		height: 1rem;
		margin-bottom: 1.5rem;
		overflow: hidden;
	}

	.progress-bar-target {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #93c5fd; /* Light blue - shows target immediately */
		height: 100%;
		border-radius: 9999px;
		transition: none; /* No transition - snaps immediately */
		z-index: 1;
	}

	.progress-bar-animated {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #2563eb; /* Dark blue - animates smoothly */
		height: 100%;
		border-radius: 9999px;
		z-index: 2;
		transition: none;
	}

	.progress-bar-animated.animating {
		transition: width 1s ease-out;
	}

	.goal-marker {
		position: absolute;
		width: 2px;
		height: 100%;
		background-color: #666;
		top: 0;
		z-index: 3;
	}
	.goal-reached {
		background-color: green;
	}
</style>
