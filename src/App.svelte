<script>
  let name = "world";
</script>

<main>
  <h1>Hello {name}!</h1>
  <input bind:value={name} placeholder="Enter your name" />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>