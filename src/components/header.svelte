<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let yearIndex;

  let portraitIndex = 1;
  let description = "Born ready";
  let component = null;

  onMount(() => {
    gsap.set(component, { yPercent: -100, opacity: 0 });
    gsap.to(component, {
      yPercent: 0,
      opacity: 1,
      delay: 0.75,
      duration: 0.95,
      ease: "out",
    });
  });

  $: {
    portraitIndex = getPortraitIndex(yearIndex);
    description = getDescription(yearIndex);
  }

  function getPortraitIndex(yearIndex) {
    let index = 1;
    if (yearIndex >= 0 && yearIndex < 8) {
      index = 1;
    } else if (yearIndex >= 8 && yearIndex < 15) {
      index = 4;
    } else if (yearIndex >= 15 && yearIndex < 25) {
      index = 2;
    } else if (yearIndex >= 25 && yearIndex < 30) {
      index = 3;
    } else if (yearIndex >= 30 && yearIndex < 38) {
      index = 6;
    } else if (yearIndex >= 38 && yearIndex < 45) {
      index = 2;
    } else if (yearIndex >= 45 && yearIndex < 52) {
      index = 5;
    } else if (yearIndex >= 52 && yearIndex < 67) {
      index = 4;
    } else if (yearIndex >= 67 && yearIndex < 78) {
      index = 6;
    } else {
      index = 7;
    }
    return index;
  }

  function getDescription(yearIndex) {
    let text = "Born ready";
    if (yearIndex >= 0 && yearIndex < 8) {
      text = "Born ready";
    } else if (yearIndex >= 8 && yearIndex < 15) {
      text = "Born ready";
    } else if (yearIndex >= 15 && yearIndex < 25) {
      text = "Forbes 30 under 30";
    } else if (yearIndex >= 25 && yearIndex < 30) {
      text = "Hot shot";
    } else if (yearIndex >= 30 && yearIndex < 38) {
      text = "Expat life";
    } else if (yearIndex >= 38 && yearIndex < 45) {
      text = "Geordie Shore";
    } else if (yearIndex >= 45 && yearIndex < 52) {
      text = "Brexit";
    } else if (yearIndex >= 52 && yearIndex < 67) {
      text = "The longest yard";
    } else if (yearIndex >= 67 && yearIndex < 78) {
      text = "Prison break";
    } else {
      text = "Nobel Prize";
    }
    return text;
  }
</script>

<header bind:this={component}>
  <div class="side  side-right">
    <div class="sprite portrait-{portraitIndex}" />
  </div>
  <div class="side side-left">
    <h1>Aleniore <span /> d'aquitaine</h1>
    <div class="description">{description}</div>
  </div>
</header>

<style lang="scss">
  header {
    padding-top: 2rem;
    padding-left: 2rem;
    max-width: 960px;
    height: 150px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    color: white;
    font-family: "Source Code Pro";
    display: flex;
    flex-direction: row;
  }

  .frame {
    width: 100px;
    height: 100px;
    position: absolute;
    overflow: hidden;
  }

  h1 {
    text-transform: uppercase;

    span {
      display: block;
    }
  }

  .side {
    width: 50%;
    height: 100%;

    &-right {
      width: 25%;
    }

    &-left {
      width: 75%;
    }
  }

  .description {
    font-size: 1.25rem;
    color: #ffd60a;
  }

  .sprite {
    background: url("$lib/img/sprite.jpg") no-repeat top left;
    width: 150px;
    height: 150px;
    background-size: 700% 100%;
    border-radius: 50%;
    overflow: hidden;

    position: absolute;
  }
  .sprite.portrait-1 {
    background-position: 0 0;
  }
  .sprite.portrait-2 {
    background-position: 16.5% 0;
  }
  .sprite.portrait-3 {
    background-position: 33.2% 0;
  }
  .sprite.portrait-4 {
    background-position: 50% 0;
  }
  .sprite.portrait-5 {
    background-position: 66.5% 0;
  }
  .sprite.portrait-6 {
    background-position: 83.4% 0;
  }
  .sprite.portrait-7 {
    background-position: 100% 0;
  }
</style>
