import { writable } from "svelte/store";

export const percentage = writable(50);

export const direction = writable(1);

export let pageIndex = writable(0);

export const color = writable({});

export let hidden = writable(false);
