import { writable, derived } from 'svelte/store';

export interface Item {
  id: string | number;
  label: string;
  done: boolean;
}

export const itemsStore = writable<Item[]>([
  { id: 1, label: 'Complete project setup', done: false },
  { id: 2, label: 'Write tests', done: false },
  { id: 3, label: 'Deploy application', done: false }
]);

export const completedStore = derived(
  itemsStore, 
  items => items.filter(i => i.done).length
);

export const percentStore = derived(
  itemsStore, 
  items => items.length 
    ? Math.round(100 * items.filter(i => i.done).length / items.length)
    : 0
);