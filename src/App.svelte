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
  import Sawtooth from "./Sawtooth.svelte";
  import SquareWave from "./SquareWave.svelte";
  import ButtonGroup from "./ButtonGroup.svelte";
  import Switch from "./Switch.svelte";
  import FlipIcon from "./FlipIcon.svelte";

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
  <div class="ui-section">
    <div class="flex-col">
      Position:
      <ButtonGroup
        id="position"
        buttons={placementOptions}
        on:select={(e) => ($appState.placement = e.detail)}
      />
      <Spacer height="4px" />

      <div class="flex-row">
        <div class="flex-col">
          <!-- select field for path type -->
          Shape:
          <select bind:value={$appState.pathName}>
            <!-- options here: loop over pathNameOptions -->
            {#each pathNameOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        <div class="flex-col">
          <!-- number input for height -->
          Height:
          <input
            class="height-input"
            type="number"
            bind:value={$appState.height}
          />
        </div>
        <div class="vertical-line"></div>
        <div class="flex-col flex-grow">
          Settings
          <div class="flex-row">
            <!-- color input -->
            <input
              class="color-input"
              type="color"
              bind:value={$appState.fillColor}
            />
            <!-- isFlipped input -->
            <div class="flex-row">
              <FlipIcon />
              <Switch
                bind:value={$appState.isFlipped}
                label=""
                fontSize={10.5}
                design="slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Spacer height="12px" />
    {#if $appState.pathName === "wave"}
      <DynamicWave />
    {/if}
    {#if $appState.pathName === "hexWave"}
      <HexWave />
    {/if}
    {#if $appState.pathName === "sawtooth"}
      <Sawtooth />
    {/if}
    {#if $appState.pathName === "squareWave"}
      <SquareWave />
    {/if}
  </div>

  <div class="preview-wrap">
    <div class="preview">
      <section class="section" style="background-color: {$appState.fillColor}">
        <div class="page-padding">
          <div class="content"></div>
        </div>
      </section>
      <section class="section is-target">
        {@html $svgString}
        <div class="page-padding">
          <div class="content"></div>
        </div>
      </section>
      <section class="section" style="background-color: {$appState.fillColor}">
        <div class="page-padding">
          <div class="content"></div>
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

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ui-section {
    flex-grow: 0;
    min-height: 170px;
    padding: 0.5rem;
    gap: 8px;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .vertical-line {
    width: 1px;
    height: 44px;
    background-color: white;
    opacity: 0.5;
  }

  .page-padding {
    padding: 0 16px;
  }

  .section {
    position: relative;
    padding: 1rem 0px;
  }

  .section.is-target {
    padding: 4rem 0px;
    background-color: transparent;
  }

  .height-input {
    width: 3rem;
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

  .color-input {
    margin: 0;
    padding: 0;
    border: 0;
    height: 22px;
    width: 22px;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 1px solid var(--border1);
    cursor: pointer;
  }
  input::-webkit-color-swatch-wrapper {
    padding: 0;
    margin: 0;
    background: none;
  }
  input::-webkit-color-swatch {
    border: none;
  }

  .preview-wrap {
    padding: 0.5rem;
    flex-grow: 1;
  }

  .preview {
    border-radius: var(--border-radius);
    overflow: clip;
    box-shadow:
      0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset,
      0px 0.5px 1px 0px #000;
    background-color: #595959;
    background-image: repeating-linear-gradient(
        45deg,
        #696969 25%,
        transparent 25%,
        transparent 75%,
        #696969 75%,
        #696969
      ),
      repeating-linear-gradient(
        45deg,
        #696969 25%,
        #595959 25%,
        #595959 75%,
        #696969 75%,
        #696969
      );
    background-position:
      0 0,
      6px 6px;
    background-size: 12px 12px;
  }
</style>
