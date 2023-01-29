<script>
  // @ts-nocheck

  import "normalize.css";
  import { afterUpdate, onMount } from "svelte";
  import Sketch from "../sketch/sketch.svelte";
  import Nav from "../components/nav.svelte";
  import Header from "../components/header.svelte";
  import { scale } from "$lib/utils.js";

  let scrollY, pageHeight, contentHeight;
  let scrollNormalized = 0;
  let yearIndex = 0;

  const handleScroll = (evt) => {
    scrollNormalized = scrollY / (contentHeight - pageHeight);
    yearIndex = Math.floor(scale(scrollNormalized, 0, 1, 0, 83));
  };

  const handleResize = () => {};

  const handleClickCircle = ({ detail }) => {
    console.log(detail);
    window.scrollTo({
      top: (contentHeight / 100) * detail.circle,
      behavior: "smooth",
    });
  };
</script>

<svelte:head>
  <title>AC Developer Assignment : Fabien</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<svelte:window
  on:scroll={handleScroll}
  on:resize={handleResize}
  bind:innerHeight={pageHeight}
  bind:scrollY
/>

<Header {scrollNormalized} />
<main bind:offsetHeight={contentHeight}>
  <!-- {#if ready} -->
  <div>
    <Sketch {scrollNormalized} {yearIndex} on:circleClick={handleClickCircle} />
  </div>
  <!-- {/if} -->
</main>
<Nav {yearIndex} />

<!-- <canvas bind:this={canvas} /> -->
<style lang="scss">
  :global(html) {
    scroll-behavior: smooth;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "Courier New";
  }

  :root {
    --font-large: 6vw;
  }

  main {
    height: 600vh;
    position: relative;
    z-index: 1;
    background-color: black;

    > div {
      position: fixed;
      display: flex;
      width: 100%;
      height: 100vh;
      // padding: 1rem 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      // h1 {
      //   font-size: var(--font-large);
      // }
    }
  }
</style>
