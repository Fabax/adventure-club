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
    let counter, circlePosition;

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.smooth();
      initSketchProps();
      p5.frameRate(30);
    };

    p5.draw = () => {
      p5.background("black");

      let { date, isMain } = data.nodeYears[yearIndex];

      circles.forEach((circle) => {
        circle.update(scrollNormalized, yearIndex);
        circle.show();
        if (circle.isTouching) {
          desiredCircle = circle.index;
        }
      });

      counter.update(date, isMain);
      counter.show();

      if (data.nodeYears[desiredCircle].isMain) {
        p5.cursor(p5.HAND);
      } else {
        p5.cursor(p5.ARROW);
      }
    };

    p5.mouseClicked = () => {
      if (data.nodeYears[desiredCircle].isMain) {
        let dispatchedIndex = desiredCircle;
        dispatchClick(dispatchedIndex);
      }
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      initSketchProps();
    };

    function setCircles() {
      return data.nodeYears.map((year, index) => {
        return new Circle(p5, circlePosition, year, index, sequence[index]);
      });
    }

    function initSketchProps() {
      circlePosition = p5.createVector(p5.width * 0.5, p5.height * 0.5);
      circles = setCircles();
      counter = new Counter(p5, circlePosition, data.birthDate);
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
