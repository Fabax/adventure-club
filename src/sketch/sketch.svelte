<script>
  // @ts-nocheck
  import P5 from "p5-svelte";
  import data from "$lib/data.json";
  import { createEventDispatcher, onMount } from "svelte";
  import Circle from "./Circle";
  import Counter from "./Counter";

  export let scrollNormalized;
  export let yearIndex;

  let dispatch;

  let sequence = data.nodeYears.map(() => {
    return Math.random();
  });
  dispatch = createEventDispatcher();

  function dispatchClick(currentCircle) {
    dispatch("circleClick", {
      circle: currentCircle,
    });
  }

  const sketch = (p5) => {
    let desiredCircle = 0;
    let circles = [];
    let counter = null;
    let circlePosition;

    p5.setup = () => {
      p5.createCanvas(p5.displayWidth, p5.displayHeight);
      p5.smooth();
      circlePosition = p5.createVector(p5.width * 0.5, p5.height * 0.5);
      circles = setCircles();
      counter = new Counter(p5, circlePosition, 1122);
    };

    p5.draw = () => {
      p5.background("black");

      circles.forEach((circle) => {
        circle.update(scrollNormalized, yearIndex);
        circle.show();
        if (circle.isTouching) {
          desiredCircle = circle.index;
        }
      });

      counter.update(data.nodeYears[yearIndex].date);
      counter.show();
    };

    p5.mouseClicked = () => {
      dispatchClick(desiredCircle);
    };

    function setCircles() {
      return data.nodeYears.map((year, index) => {
        return new Circle(p5, circlePosition, year, index, sequence[index]);
      });
    }
  };
</script>

<P5 class="sketchContainer" {sketch} />

<style lang="scss">
  .sketchContainer {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }
</style>
