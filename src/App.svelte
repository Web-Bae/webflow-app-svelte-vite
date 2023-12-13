<script lang="ts">
  import { afterUpdate } from "svelte";
  import { pathNameOptions, placementOptions } from "./constants";
  import { appState } from "./stores/appState";
  import { selectedElement } from "./stores/selectedElement";
  import Spacer from "./Spacer.svelte";
  import SectionDivider from "./SectionDivider.svelte";

  // variables
  let name = "Web Bae";

  // logs the type of the selected element to console
  $: console.log($selectedElement && $selectedElement.type);

  // if a div block is selected, append a new DOMElement with `Hey there {name}!` as the text content
  const handleSubmit = async () => {
    if (!$selectedElement) {
      return;
    }
    console.log({ appState });
  };

  // returns the text for the button based on the selected element
  const getButtonText = (el: typeof $selectedElement) => {};

  afterUpdate(() => {
    console.log({ $appState });
  });
</script>

<main>
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
    <input class="height-input" type="number" bind:value={$appState.height} />
    <button
      class="button-primary"
      disabled={!$selectedElement || !$selectedElement.children}
      on:click={handleSubmit}>Create</button
    >
  </div>
  <Spacer height={"32px"} />
  <section class="target-section">
    {#if $appState.placement === "top"}
      <SectionDivider />
    {/if}
    <div class="page-padding">
      <div class="content">
        <h2>Section Divider Bae</h2>
        <p>Divide section with fancy shapes with ease</p>
      </div>
    </div>
    {#if $appState.placement === "bottom"}
      <SectionDivider />
    {/if}
  </section>
</main>

<style>
  main {
    margin: 0 auto;
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

  .target-section {
    position: relative;
    background-color: var(--orangeBackground);
    padding: 3rem 0px;
  }

  .height-input {
    width: 2rem;
  }
</style>
