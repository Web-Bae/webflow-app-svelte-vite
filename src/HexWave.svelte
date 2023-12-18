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
    <label for="speed">Speed: </label>
    <input
      id="speed"
      type="range"
      step="0.1"
      min="0"
      max="3.2"
      bind:value={speed}
      on:input={updatePoints}
    />
    {speed.toFixed(1)}
  </div>
  <div class="control-item">
    <label for="wavePoints">Wave Points: </label>
    <input
      id="wavePoints"
      type="range"
      min="1"
      max="50"
      bind:value={wavePoints}
      on:input={updatePoints}
    />
    {wavePoints}
  </div>
</div>

<style>
</style>
