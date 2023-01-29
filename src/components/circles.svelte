<script>
  // @ts-nocheck
  import P5 from "p5-svelte";
  import data from "$lib/data.json";
  import { createEventDispatcher, onMount } from "svelte";

  let dispatch;
  export let scroll;
  export let yearIndex;
  let width = 55;
  let height = 55;

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
    let birthYear = data.birthYear;
    let currentCircle = {
      index: 0,
      year: birthYear,
    };
    let desiredCircle = 0;

    p5.setup = () => {
      p5.createCanvas(p5.displayWidth, p5.displayHeight);
      p5.smooth();
    };

    p5.draw = () => {
      let circleInc = scroll * -6 + 12;
      let circleBase = 200;
      let circlePosition = p5.createVector(p5.width * 0.45, p5.height * 0.65);

      p5.background("black");
      data.nodeYears.forEach((year, index) => {
        let radius = circleBase + index * circleInc;
        let mouseDist =
          p5.dist(circlePosition.x, circlePosition.y, p5.mouseX, p5.mouseY) * 2;

        let isTouching =
          mouseDist > radius - 1 && mouseDist < radius + 1 ? true : false;

        p5.noFill();
        if (isTouching) {
          p5.stroke(255, 50, 50);
          p5.cursor(p5.ARROW);
          desiredCircle = index;
        } else {
          if (yearIndex === index) {
            p5.stroke(0, 255, 0);
            currentCircle.index = index;
            currentCircle.year = birthYear + index;
          } else {
            p5.stroke(sequence[index] * 100);
            p5.cursor(p5.HAND);
          }
        }

        p5.strokeWeight(1);
        p5.ellipse(circlePosition.x, circlePosition.y, radius, radius, 50);
      });

      p5.stroke("white");
      p5.fill("white");
      p5.textSize(20);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(
        currentCircle.year.toString(),
        circlePosition.x,
        circlePosition.y
      );
    };

    p5.mouseClicked = () => {
      dispatchClick(desiredCircle);
    };
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
