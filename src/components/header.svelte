<script>
  // @ts-nocheck
  export let scroll = 0;
  let portraitIndex = 1;

  $: {
    portraitIndex = Math.floor(scale(scroll, 0, 1, 1, 8));
  }

  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
</script>

<header>
  <div class="side  side-right">
    <div class="sprite portrait-{portraitIndex}" />
  </div>
  <div class="side side-left">
    <h1>Aleniore <span /> d'aquitaine</h1>
    <div class="description">Born ready</div>
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
    // border: 1px solid white;
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
