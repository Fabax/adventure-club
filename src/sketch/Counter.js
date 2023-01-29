// @ts-nocheck
export default class Counter{
    constructor(p5, position, year){
        this.p5 = p5;
        this.position = position;
        this.year = year;
    }

    show(){
        this.p5.push()
     this.p5.stroke("white");
      this.p5.fill("white");
      this.p5.textSize(20);
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.text(
        this.year,
        this.position.x,
        this.position.y
      );
      this.p5.pop()
    }

    update(year){
        this.year = year
    }
}