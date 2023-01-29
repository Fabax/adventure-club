// @ts-nocheck
import colors from "$lib/colors.json";
import hexRgb from 'hex-rgb';

export default class Circle {
    constructor(p5, position, year, index, noise){
        this.p5 = p5
        this.position = position
        this.isMain = year.isMain
        this.description = year.description
        this.date = year.date
        this.index = index
        this.noise = noise

        this.maxRadius = this.p5.windowWidth > this.p5.windowHeight ? this.p5.windowHeight * .65 : this.p5.windowWidth * .65;
        this.circleBase = 200        
        this.circleInc = ((this.maxRadius )/83) * 1.3
        this.radius = this.index * this.circleInc;
        this.maxOpacity = (this.p5.random() * 155) + 100

        this.isTouching = false       
        this.fadeInTime = 45; 
    }

    show(){
        this.p5.push()
        this.p5.noFill();

        let color = colors.secondary
        let opacity = this.p5.frameCount <= this.fadeInTime ?  this.p5.map(this.p5.frameCount, 0, this.fadeInTime, 0,  this.maxOpacity) : this.maxOpacity
        this.p5.strokeWeight(1)
      
        if (this.isTouching && this.isMain) {
            color = colors.primary
            opacity = this.p5.frameCount <= this.fadeInTime ?  this.p5.map(this.p5.frameCount, 0, this.fadeInTime, 0,  255) : 255
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
            opacity = this.p5.frameCount <= this.fadeInTime ?  this.p5.map(this.p5.frameCount, 0, this.fadeInTime, 0,  255) : 255
            color = colors.secondary
            this.p5.strokeWeight(this.circleInc/4)       
        }
        
        let rgbColor = hexRgb(color.substring(1))
        this.p5.stroke(rgbColor.red,rgbColor.green,rgbColor.blue,opacity)
        this.p5.ellipse(this.position.x, this.position.y, this.radius, this.radius);

        this.p5.pop()
    }

    update(scrollNormalized, yearIndex){
        let mouseDist = this.p5.dist(this.position.x, this.position.y, this.p5.mouseX, this.p5.mouseY) * 2;
        let scaleFactor = this.p5.map(scrollNormalized,0,1,3,1)
        this.circleInc = ((this.maxRadius )/83) * scaleFactor

        let fadeInExtra = this.p5.frameCount > this.fadeInTime ? 0 : this.p5.map( this.p5.frameCount,0,this.fadeInTime,this.maxRadius,0)
        
        this.radius = (this.index * this.circleInc) + this.circleBase + fadeInExtra;
        this.isCurrentYear = yearIndex === this.index
        this.isTouching = mouseDist > this.radius - (this.circleInc/2) && mouseDist < this.radius + (this.circleInc/2) ? true : false;
    }
}