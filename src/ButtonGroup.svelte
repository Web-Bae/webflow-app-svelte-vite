<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Option } from "./types";

  export let id: string;
  export let buttons: Option<string>[] = [];
  export let selected: Option<string> | undefined = buttons[0];
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function selectButton(value: string) {
    if (disabled) return;
    selected = buttons.find((button) => button.value === value);
    dispatch("select", value);
  }

  function handleKeydown(event: KeyboardEvent, value: string) {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      selectButton(value);
      event.preventDefault();
    }
  }
</script>

<div class="button-group">
  {#each buttons as button (button.value)}
    <div
      {id}
      class="button {selected && selected.value === button.value
        ? 'active'
        : ''} {disabled ? 'disabled' : ''}"
      role="button"
      tabindex={disabled ? -1 : 0}
      on:click={() => selectButton(button.value)}
      on:keydown={(event) => handleKeydown(event, button.value)}
      aria-disabled={disabled}
    >
      {button.label}
    </div>
  {/each}
</div>

<style>
  .button-group {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: var(--border-radius);
    box-shadow:
      0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset,
      0px 0.5px 1px 0px #000;
  }

  .button {
    flex-grow: 1;
    text-align: center;
    padding: 4px 8px;
    margin: 0px;
    cursor: pointer;
    background: transparent;
    border-radius: 0px;
    transition: background-color 0.2s;
    border-width: 0px;
    margin: 2px 0px;
    color: var(--text1);
  }

  .button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button-group .button:first-of-type {
    margin-left: 2px;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  .button-group .button:last-of-type {
    margin-right: 2px;
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  .button.active {
    background: rgba(30, 30, 30, 1);
    color: white;
    border-radius: var(--border-radius);
  }
</style>
