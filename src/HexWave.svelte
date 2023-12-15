<script lang="ts">
  import { hexWavePath } from "./stores/appState";

  const width = 1200;
  const height = 120;
  const waveWidth = width;
  const waveHeight = 0;
  let waveDelta = 120;
  let speed = 0.7;
  let wavePoints = 3;

  type Point = { x: number; y: number };

  let points: Point[] = [];

  function calculateWavePoints(factor = 0) {
    var points = [{ x: 0, y: waveHeight }];

    for (var i = 0; i <= wavePoints; i++) {
      var x = (i / wavePoints) * waveWidth;
      var sinSeed = (factor + (i + (i % wavePoints))) * speed * 100;
      var sinHeight = Math.sin(sinSeed / 100) * waveDelta;
      var yPos = Math.sin(sinSeed / 100) * sinHeight + waveHeight;
      points.push({ x: x, y: yPos });
    }

    return points;
  }

  function buildPath(points: Point[]) {
    var SVGString = "M 0 -10 L 0 0";

    for (var i = 0; i < points.length - 1; i++) {
      var cp0x = parseFloat(
        (points[i].x + (points[i + 1].x - points[i].x) / 3).toFixed(2)
      );
      var cp1x = parseFloat(
        (points[i].x + (2 * (points[i + 1].x - points[i].x)) / 3).toFixed(2)
      );
      var pointX = parseFloat(points[i + 1].x.toFixed(2));
      var pointY = parseFloat(points[i + 1].y.toFixed(2));

      SVGString += ` L ${cp0x} ${parseFloat(
        points[i].y.toFixed(2)
      )} ${cp1x} ${pointY} ${pointX} ${pointY}`;
    }

    SVGString += ` L ${parseFloat(width.toFixed(2))} 0`;
    SVGString += ` L ${parseFloat(width.toFixed(2))} -10`;
    SVGString += " Z";
    return SVGString;
  }

  function updatePoints() {
    points = calculateWavePoints();
    const newPath = buildPath(points);
    console.log({ newPath });
    $hexWavePath = newPath;
  }
</script>

<div class="wave-controls">
  <div class="control-item">
    <input
      id="waveDelta"
      type="range"
      min="0"
      max={height}
      step="1"
      bind:value={waveDelta}
      on:input={updatePoints}
    />
    <label for="waveDelta">Wave Delta: {waveDelta}</label>
  </div>

  <div class="control-item">
    <input
      id="speed"
      type="range"
      step="0.1"
      min="0"
      max="3.2"
      bind:value={speed}
      on:input={updatePoints}
    />
    <label for="speed">Speed: {speed.toFixed(1)}</label>
  </div>
  <div class="control-item">
    <input
      id="wavePoints"
      type="range"
      min="1"
      max="50"
      bind:value={wavePoints}
      on:input={updatePoints}
    />
    <label for="wavePoints">Wave Points: {wavePoints}</label>
  </div>
</div>

<style>
  .wave-controls {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
  .control-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 8px;
  }

  input[type="range"] {
    -webkit-appearance: none; /* Override default appearance */
    appearance: none;
    width: 150px; /* Specific width if needed */
    background: transparent; /* Make default track invisible */
    border: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    border-radius: 1.3px;
    border: 2px solid rgba(255, 255, 255, 0.13);
  }

  /* Styles for the thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px; /* Match .slider-thumb width */
    height: 12px; /* Match .slider-thumb height */
    background: var(--text1); /* Match .slider-thumb background */
    cursor: pointer;
    border-radius: 1px; /* Match .slider-thumb border-radius */
    transform: translateY(-50%);
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.3) 0px 0px 0px 0.5px; /* Match .slider-thumb box-shadow */
  }

  /* Styles for the track */
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    background: var(--border1); /* Match .slider-track background */
    border-radius: 4px; /* Match .slider-track border-radius */
  }

  /* Make it responsive to hover */
  /* input[type="range"]:hover::-webkit-slider-thumb {
    background:  /* Slightly different color or effect on hover *;
  } */
</style>
