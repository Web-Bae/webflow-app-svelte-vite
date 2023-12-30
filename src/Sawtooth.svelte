<script lang="ts">
  import { sawtoothPath } from "./stores/appState";

  const width = 1200;
  const height = 120;
  const waveWidth = width;
  let waveDelta = 120;
  let wavePoints = 10;

  type Point = { x: number; y: number };

  let points: Point[] = [];

  function calculateSawtoothWavePoints() {
    var points = [{ x: 0, y: 0 }];
    var upward = true;

    for (var i = 1; i <= wavePoints; i++) {
      var x = (i / wavePoints) * waveWidth;
      var y = upward ? waveDelta : 0;
      points.push({ x, y });
      upward = !upward;
    }

    return points;
  }

  function buildPath(points: Point[]) {
    var SVGString = `M 0 -10`;

    for (var i = 1; i < points.length; i++) {
      SVGString += ` L ${points[i].x} ${points[i].y}`;
    }

    SVGString += ` L ${width} -10 Z`;
    return SVGString;
  }

  function updatePoints() {
    points = calculateSawtoothWavePoints();
    const newPath = buildPath(points);
    console.log({ newPath });
    $sawtoothPath = newPath;
  }
</script>

<div class="wave-controls">
  <!-- <div class="control-item">
    <label for="waveDelta">Wave Delta: </label>
    <input
      id="waveDelta"
      type="range"
      min="0"
      max={height}
      step="1"
      bind:value={waveDelta}
      on:input={updatePoints}
    />
    {waveDelta}
  </div> -->

  <div class="control-item">
    <label for="wavePoints">Wave Points: </label>
    <input
      id="wavePoints"
      type="range"
      min="1"
      max="100"
      bind:value={wavePoints}
      on:input={updatePoints}
    />
    {wavePoints}
  </div>
</div>
