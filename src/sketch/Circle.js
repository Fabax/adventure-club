// @ts-nocheck
import colors from "$lib/colors.json";

export default class Circle {
    constructor(p5, position, year, index, noise){
        this.p5 = p5
        this.position = position
        this.isMain = year.isMain
        this.description = year.description
        this.date = year.date
        this.index = index
        this.noise = noise
        
        this.circleInc = 12
        this.circleBase = 200        
        this.radius = this.circleBase + this.index * this.circleInc;

        this.isTouching = false        
    }

    show(){
        this.p5.push()
        this.p5.noFill();

        let color = this.p5.map(this.noise, 0,1,50, 100)
        this.p5.strokeWeight(1)
      
        if (this.isTouching && this.isMain) {
            color = colors.primary
            if(this.isCurrentYear){
                this.p5.strokeWeight(this.circleInc/2)
            }else{
                this.p5.strokeWeight(this.circleInc/4)
            }
        }else if(this.isCurrentYear){
            if(this.isMain){
                color = colors.tertiary
                this.p5.strokeWeight(this.circleInc/2)
            }else{
                color = colors.light
                this.p5.strokeWeight(this.circleInc/4)
            }
            
        } else if(this.isMain) {
            color = colors.secondary
            this.p5.strokeWeight(this.circleInc/4)
                
        }
        this.p5.stroke(color)
        this.p5.ellipse(this.position.x, this.position.y, this.radius, this.radius);

        this.p5.pop()
    }

    update(scrollNormalized, yearIndex){
        let mouseDist = this.p5.dist(this.position.x, this.position.y, this.p5.mouseX, this.p5.mouseY) * 2;
        this.circleInc = (-6*scrollNormalized) + 12
        this.radius = this.circleBase + this.index * this.circleInc;
        this.isCurrentYear = yearIndex === this.index
        this.isTouching = mouseDist > this.radius - (this.circleInc/2) && mouseDist < this.radius + (this.circleInc/2) ? true : false;
    }
}