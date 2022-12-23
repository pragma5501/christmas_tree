import { line_circle } from "./util.js";

const BOUNCE = 0.92;

export class BounceStrings {
    constructor(pos, color, version) {
        const middleX = (pos.x2 - pos.x1) / 2 + pos.x1;
        const middleY = (pos.y2 - pos.y1) / 2 + pos.y1;

        this.points = [
            {
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0,
            },
            {
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0,
            },
            {
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0,
            },
        ];

        this.detect = 10;

        this.saveRgb = 0x000000;
        this.rgb = 0x000000;
        this.leaf_color = color;
        
        this.string_colors = {
            0 : "white", 
            1 : "#09fbd3", //green
            2 : "#fe53bb", //red
            3 : "#08f7f2", //"#97c7d2", //purple
            4 : "#f5d300", //yellow
        }
        this.saved_color = "#09fbd3";

        this.light_color_weight = {
            0 : 0.8,
            1 : 0.10,
            2 : 0.12,
            3 : 0.15,
        }
        this.light_weight = this.light_color_weight[Math.floor( Math.random() * 5)];

        this.version = version;
    }

    animate(ctx, moveX, moveY, tick) {
        //console.log(this.rgb);
        
        this.rgb += (this.saveRgb - this.rgb) * 0.03;
        
        const red = ((this.rgb >> 16) & 0xff) | 0;
        const green = ((this.rgb >> 8) & 0xff) | 0;
        const blue = (this.rgb & 0xff) | 0;
        const color = `rgb(${red},${green},${blue})`;

        if( this.rgb >= 1) {
            ctx.shadowColor = "white";
            ctx.shadowBlur = 15;
            if( this.version == 2 ) {
                if( tick % 10 == 0) {
                    const color = this.string_colors[Math.ceil( Math.random() * 5)-1];
                    this.saved_color = color;
                }
                ctx.strokeStyle = this.saved_color;

                
                
                //const color = this.leaf_color; // 이거하면 생각보다 예쁘더라.
                
            }
            if( this.version == 1) {
                ctx.strokeStyle = color;
            }
            
        } else {
            this.rgb = 0x000000;
            const color = this.leaf_color;

            ctx.strokeStyle = color;
        }


        ctx.beginPath();

        
        if ( line_circle(
            this.points[0].x,
            this.points[0].y,
            this.points[2].x,
            this.points[2].y,
            moveX,
            moveY,
            this.detect ) ) {

            this.rgb = 0xf3316e;
            this.detect = 100;
            let tx = moveX;
            let ty = (this.points[1].oy + moveY) / 2;
            this.points[1].vx = tx - this.points[1].x;
            this.points[1].vy = ty - this.points[1].y;    
            
            
        } else {
            //ctx.strokeStyle =  this.leaf_color;

            this.detect = 10;
            let tx = this.points[1].ox;
            let ty = this.points[1].oy;
            this.points[1].vx += tx - this.points[1].x;
            this.points[1].vx *= BOUNCE;
            this.points[1].vy += ty - this.points[1].y;
            this.points[1].vy *= BOUNCE;
        }

        this.points[1].x += this.points[1].vx;
        this.points[1].y += this.points[1].vy;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.points.length; i++) {
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);

        ctx.stroke();
        
        ctx.shadowBlur = null;
        ctx.shadowColor = null;
    }
}