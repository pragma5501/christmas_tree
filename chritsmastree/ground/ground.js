

export class Ground {
    constructor(stageWidth, stageHeight) {
        this.stageHeight = stageHeight;
        this.stageWidth = stageWidth;

        this.speed = 10;
        this.total = 50;
        this.color = "white";

        this.make_ground();
        

        this.fallen_snow_pos = {};

    }
    build_snow_ground(fallen_snow_pos) {
        this.fallen_snow_pos = fallen_snow_pos;
        
    }
    make_ground() {
        this.ground_color = "white";
        this.ground_color_shadow = "rgb(200, 200, 200)";  

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        for( let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.stageHeight * 9/10,
            }
        }
        
    }
    update_ground() {
        for( let i in this.fallen_snow_pos) {

            if( this.points[i].y <= this.stageHeight * 8/10 ) continue;
            this.points[i].y -= this.fallen_snow_pos[i].count; 
            
            try {
                this.points[i-1].y -= this.fallen_snow_pos[i].count * 1/80;
                this.points[i+1].y -= this.fallen_snow_pos[i].count * 1/80;  
            } catch {
                
            }
        }
    }

    draw(ctx) {
        this.update_ground();

        
        ctx.fillStyle = this.color;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.beginPath();

        let cur = this.points[0];
        let prev= cur;


        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];
            
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            prev = cur;

        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
        ctx.shadowColor = null;
        ctx.shadowBlur = null;
    }

}