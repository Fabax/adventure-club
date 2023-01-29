// @ts-nocheck
import colors from "$lib/colors.json";

export default class Counter{
    constructor(p5, position, year){
        this.p5 = p5;
        this.position = position;
        this.year = year;
        this.isMain = false
    }

    show(){
        let color = this.isMain ? colors.tertiary : colors.light

        this.p5.push()
        this.p5.stroke(color);
        this.p5.fill(color);
        this.p5.textSize(20);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.text(
            this.year,
            this.position.x,
            this.position.y
        );
        this.p5.pop()
    }

    update(year, isMain){
        this.isMain = isMain
        this.year = year !== undefined ? year : ''        
    }
}