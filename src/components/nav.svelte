<script>
  // @ts-nocheck
  import data from "$lib/data.json";
  import gsap from "gsap";
  import { onMount } from "svelte";

  import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
  export let yearIndex;

  onMount(() => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    // gsap.registerPlugin();

    gsap.set(".year, .description", { opacity: 0 });
    gsap.set(".description", { opacity: 0, y: -75 });

    ScrollTrigger.batch(".item", {
      //   interval: 0.1, // time window (in seconds) for batching to occur.
      batchMax: 1, // maximum batch size (targets)
      start: "top center+=250",
      end: "top center-=250",
      //   scrub: 1,
      onEnter: (batch) => {
        batch.forEach((year) => {
          gsap.to(year.children[1], {
            opacity: 1,
          });
          gsap.to(year.children[2], {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        });
      },
      onLeave: (batch) => {
        batch.forEach((year) => {
          gsap.to(year.children[1], {
            opacity: 0,
          });
          gsap.to(year.children[2], {
            opacity: 0,
            scale: 1,
            y: -75,
            duration: 0.5,
          });
        });
      },
      onEnterBack: (batch) => {
        batch.forEach((year) => {
          gsap.to(year.children[1], {
            opacity: 1,
          });
          gsap.to(year.children[2], {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        });
      },
      onLeaveBack: (batch) => {
        batch.forEach((year) => {
          gsap.to(year.children[1], {
            opacity: 0,
          });
          gsap.to(year.children[2], {
            opacity: 0,
            scale: 1,
            y: -75,
            duration: 0.5,
          });
        });
      },
    });
    // gsap.to(window, { duration: 2, scrollTo: ".item-45" });
  });
</script>

<nav>
  <div class="pusher" />
  {#each data.nodeYears as year, i}
    <div
      class={`item item-${i} ${year.isMain ? "main" : "ghost"} 
      ${i === yearIndex ? "current" : null}`}
    >
      <div class="line" />
      <div class="year">{year.date}</div>
      <div class="description">{year.description}</div>
    </div>
  {/each}
  <div class="pusher" />
</nav>

<style lang="scss">
  nav {
    font-family: "Source Code Pro";

    position: absolute;
    top: 0;
    right: 0;
    width: 20vw;
    height: 600vh;
    // background-color: black;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item {
    width: 100%;
    color: white;
    height: 1%;
    // border: 1px solid white;
    position: relative;
  }

  .pusher {
    height: 9%;
  }

  .line {
    width: 5px;
    position: absolute;
    top: 0;
    left: -25px;
    border: 1px solid white;
  }

  .year {
    position: absolute;
    left: -75px;
    transform: translateY(-75%);
    font-weight: bold;
    font-weight: 200;
  }

  .description {
    position: absolute;
    top: -0.5rem;
    padding: 0 2rem 2rem 0rem;
    font-weight: bold;
    font-weight: 500;
    // opacity: 0;
  }

  .current {
    .description,
    .year {
      color: yellow;
    }
    .line {
      border: 1px solid yellow;
    }
  }

  .ghost {
    .description {
      display: none;
    }
  }
</style>
