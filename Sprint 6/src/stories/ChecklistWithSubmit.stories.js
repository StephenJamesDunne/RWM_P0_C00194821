import ChecklistWithSubmit from '$lib/components/ChecklistWithSubmit.svelte';
import { itemsStore } from '$lib/stores/checklist';

/**
 * @typedef {() => any} StoryFunction
 */


export default {
  title: 'Components/ChecklistWithSubmit',
  component: ChecklistWithSubmit,
  parameters: {
    docs: {
      description: {
        component: `
          **Submit Gate Pattern**: This component demonstrates a key UX pattern where user interactions (checking boxes) are immediately visible in the interface, but the "official" progress display only updates when the Submit button is clicked. This creates a clear distinction between "current selections" (shown in the submit button) and "committed progress" (shown in the main display), giving users control over when their changes are finalized.
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed at the top of the checklist'
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show the percentage progress bar'
    }
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      // Reset store before each story
      itemsStore.set([
        { id: 1, label: 'Complete project setup', done: false },
        { id: 2, label: 'Write tests', done: false },
        { id: 3, label: 'Deploy application', done: false }
      ]);
      return story();
    }
  ]
};

// Default story - mixed state (some checked)
export const Default = {
  args: {
    title: 'Mixed Progress',
    showProgress: true
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      itemsStore.set([
        { id: 1, label: 'Complete project setup', done: true },
        { id: 2, label: 'Write tests', done: false },
        { id: 3, label: 'Deploy application', done: false }
      ]);
      return story();
    }
  ]
};

// None checked
export const None = {
  args: {
    title: 'Getting Started',
    showProgress: true
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      itemsStore.set([
        { id: 1, label: 'Complete project setup', done: false },
        { id: 2, label: 'Write tests', done: false },
        { id: 3, label: 'Deploy application', done: false }
      ]);
      return story();
    }
  ]
};

// All checked
export const All = {
  args: {
    title: 'Project Complete!',
    showProgress: true
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      itemsStore.set([
        { id: 1, label: 'Complete project setup', done: true },
        { id: 2, label: 'Write tests', done: true },
        { id: 3, label: 'Deploy application', done: true }
      ]);
      return story();
    }
  ]
};

// Long labels
export const LongLabels = {
  args: {
    title: 'Complex Project Tasks',
    showProgress: true
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      itemsStore.set([
        { id: 1, label: 'Set up comprehensive development environment with Docker containers, database migrations, and CI/CD pipeline configuration', done: true },
        { id: 2, label: 'Write extensive unit tests, integration tests, and end-to-end tests covering all critical user paths and edge cases', done: false },
        { id: 3, label: 'Deploy application to production environment with proper monitoring, logging, error tracking, and performance optimization', done: false }
      ]);
      return story();
    }
  ]
};