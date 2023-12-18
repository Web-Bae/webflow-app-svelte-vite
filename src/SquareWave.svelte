<script lang="ts">
  import { squareWavePath } from "./stores/appState";

  const width = 1200;
  const height = 120;
  const waveWidth = width;
  let waveDelta = 120;
  let wavePoints = 10; // Number of segments in the square wave

  type Point = { x: number; y: number };

  let points: Point[] = [];

  function calculateSquareWavePoints() {
    var points = [];
    var y = 0;

    for (var i = 0; i <= wavePoints; i++) {
      var x = parseFloat(((i / wavePoints) * waveWidth).toFixed(2));
      points.push({ x, y: parseFloat(y.toFixed(2)) });

      // Flip y between 0 and waveDelta
      y = y === 0 ? waveDelta : 0;

      // For a square wave, add an extra point to create the vertical line
      if (i < wavePoints) {
        points.push({ x, y: parseFloat(y.toFixed(2)) });
      }
    }

    return points;
  }

  function buildPath(points: Point[]) {
    var SVGString = `M 0 -10`;

    for (var i = 0; i < points.length; i++) {
      SVGString += ` L ${points[i].x} ${points[i].y}`;
    }

    SVGString += ` L ${width} -10`; // Close the path

    SVGString += ` Z`; // Close the path
    return SVGString;
  }

  function updatePoints() {
    points = calculateSquareWavePoints();
    const newPath = buildPath(points);
    console.log({ newPath });
    $squareWavePath = newPath;
  }
</script>

<div class="wave-controls">
  <div class="control-item">
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
  </div>

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
