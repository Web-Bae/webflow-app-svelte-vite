import { writable } from "svelte/store";

export const selectedElement = writable<AnyElement | null>(null);

webflow.subscribe("selectedelement", (el) => {
  selectedElement.set(el);
});
