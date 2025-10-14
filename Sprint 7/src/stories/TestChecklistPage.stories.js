import TestChecklistPage from '../routes/test-checklist/+page.svelte';
import { itemsStore } from '$lib/stores/checklist';

/**
 * @typedef {() => any} StoryFunction
 */

export default {
  title: 'Pages/Test Checklist Page',
  component: TestChecklistPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          Complete page demonstrating the submit gate pattern in action. Users can check and uncheck items freely, see their current selections reflected in the submit button, but the main progress display only updates when they commit their changes by clicking Submit. This pattern is particularly useful for forms or settings where you want users to review their changes before finalizing them.
        `
      }
    }
  },
  decorators: [
    /** @param {StoryFunction} story */
    (story) => {
      // Reset store for consistent story display
      itemsStore.set([
        { id: 1, label: 'Complete project setup', done: false },
        { id: 2, label: 'Write tests', done: false },
        { id: 3, label: 'Deploy application', done: false }
      ]);
      return story();
    }
  ]
};

export const DefaultPage = {
  name: 'Test Checklist Page'
};