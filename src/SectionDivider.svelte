<script lang="ts">
  import { pathMap } from "./constants";
  import { appState } from "./stores/appState";

  const left = 0;

  $: top = $appState.placement === "top" ? "0px" : "auto";
  $: bottom = $appState.placement === "bottom" ? "0px" : "auto";
  $: rotation = $appState.placement === "bottom" ? "180deg" : "0deg";

  console.log({ rotation });
</script>

<svg
  class="section-divider"
  viewBox="0 0 1200 120"
  preserveAspectRatio="none"
  style="top: {top}; left: {left}px; bottom: {bottom}; height: {$appState.height}; transform: rotateZ({rotation}); width: 100%;"
>
  <path d={pathMap[$appState.pathName]} />
</svg>

<style>
  .section-divider {
    position: absolute;
    fill: #1e1e1e;
  }
</style>
