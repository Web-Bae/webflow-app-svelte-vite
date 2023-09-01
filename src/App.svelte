<script lang="ts">
  import { selectedElement } from "./stores/selectedElement";

  // variables
  let name = "Web Bae";

  // logs the type of the selected element to console
  $: console.log($selectedElement && $selectedElement.type);

  // if a div block is selected, append a new DOMElement with `Hey there {name}!` as the text content
  const handleSubmit = async () => {
    if (!$selectedElement) {
      return;
    }
    const newEl = webflow.createDOM("div");
    newEl.setTextContent(`Hey there ${name}!`);

    if ($selectedElement.type === "Block") {
      const existingChildren = $selectedElement.getChildren();
      $selectedElement.setChildren([...existingChildren, newEl]);
      await $selectedElement.save();
      await webflow.notify({ type: "Info", message: `Hey there ${name}!` });
    }
  };

  // returns the text for the button based on the selected element
  const getButtonText = (el: typeof $selectedElement) => {
    if (el) {
      if (el.type === "Block") {
        return "Say Hey";
      }
    }
    return "Select a div block";
  };
</script>

<main>
  <div class="layout">
    <img class="logo" src="./bae.png" alt="Web Bae logo" />
    <input bind:value={name} placeholder="Enter your name" />
    <button
      class="button-primary"
      disabled={$selectedElement?.type !== "Block"}
      on:click={handleSubmit}>{getButtonText($selectedElement)}</button
    >
    <div class="preview-text">Hey there {name}!</div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .logo {
    width: 32px;
  }

  .preview-text {
    font-size: var(--font-size-large);
  }
</style>
