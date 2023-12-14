<script lang="ts">
  import { afterUpdate } from "svelte";
  import { pathMap, pathNameOptions, placementOptions } from "./constants";
  import { appState, wavePath } from "./stores/appState";
  import { selectedElement } from "./stores/selectedElement";
  import Spacer from "./Spacer.svelte";
  import { svgString } from "./stores/svgTemplate";
  import { generateDOMFromHTML } from "./helpers/generateDOMFromHTML";
  import { handleSelectedElementStyle } from "./helpers/handleSelectedElementStyle";
  import DynamicWave from "./DynamicWave.svelte";
  import HexWave from "./HexWave.svelte";

  // variables
  let sectionColor = "#fff";

  // logs the type of the selected element to console
  $: console.log($selectedElement && $selectedElement.type);

  // if a div block is selected, append a new DOMElement with `Hey there {name}!` as the text content
  const handleSubmit = async () => {
    if (!$selectedElement || !$selectedElement.children) {
      console.error("No element selected");
      return;
    }
    const parser = new DOMParser();
    console.log({ $svgString });
    const doc = parser.parseFromString($svgString, "image/svg+xml");
    const element = doc.documentElement;
    const webflowDOMElement = await generateDOMFromHTML(element);

    const existingChildren = $selectedElement.getChildren();
    $selectedElement.setChildren([webflowDOMElement, ...existingChildren]);

    // handle styles
    await handleSelectedElementStyle($selectedElement);

    console.log("before thing");

    await $selectedElement.save();

    console.log("after thing");

    console.log({ $appState, $svgString, webflowDOMElement });
  };

  // returns the text for the button based on the selected element
  const getButtonText = (el: typeof $selectedElement) => {};

  afterUpdate(() => {
    console.log({ $appState, $svgString });
  });
</script>

<main>
  <div class="flex-grow is-ui">
    <div class="flex-col">
      <div class="ui-row">
        <!-- select field for path type -->
        <select bind:value={$appState.pathName}>
          <!-- options here: loop over pathNameOptions -->
          {#each pathNameOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        <!-- Select field for placement top/bottom -->
        <select bind:value={$appState.placement}>
          {#each placementOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        <!-- number input for height -->
        <input
          class="height-input"
          type="number"
          bind:value={$appState.height}
        />
        <!-- color input -->
        <input type="color" bind:value={$appState.fillColor} />
      </div>
      <div class="ui-row">
        {#if $appState.pathName === "wave"}
          <DynamicWave />
        {/if}
        {#if $appState.pathName === "hexWave"}
          <HexWave />
        {/if}
      </div>
    </div>
  </div>

  <div class="flex-grow">
    <section class="section" style="background-color: {$appState.fillColor}">
      <div class="page-padding">
        <div class="content">
          <h2>First Section is Bae</h2>
        </div>
      </div>
    </section>
    <section class="section is-target">
      {@html $svgString}
      <div class="page-padding">
        <div class="content">
          <h2>Target Section is Bae</h2>
        </div>
      </div>
    </section>
    <section class="section" style="background-color: {$appState.fillColor}">
      <div class="page-padding">
        <div class="content">
          <h2>Next Section is Bae</h2>
        </div>
      </div>
    </section>
  </div>
  <div class="button-wrap">
    <button
      class="button-primary"
      disabled={!$selectedElement || !$selectedElement.children}
      on:click={handleSubmit}>Create</button
    >
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    gap: 16px;
    color: var(--text1);
  }

  h2,
  p {
    margin: 0;
    margin-block: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .flex-grow.is-ui {
    flex-grow: 0;
    min-height: 120px;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ui-row {
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 8px;
    padding: 0.5rem;
  }

  .page-padding {
    padding: 0 16px;
  }

  .section {
    position: relative;
    padding: 2.5rem 0px;
  }

  .section.is-target {
    background-color: #fb5844;
  }

  .height-input {
    width: 2rem;
  }

  .button-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--background3);
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 8px;
  }
</style>
