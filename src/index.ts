import App from "./App.svelte";
import "./styles.css";
import "./webflow.css";

const targetElement = document.querySelector("#app");

if (!targetElement) {
  throw new Error("Couldn't find #app element to mount Svelte app.");
}

const app = new App({
  target: targetElement,
});

export default app;
