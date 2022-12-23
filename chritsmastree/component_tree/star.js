import {Sunglass} from '../decoration/sunglass.js'


export class Star {
    constructor(stageWidth, stageHeight, leaf) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        
        this.star_size = stageWidth / 30;
        this.set_position(leaf);
        this.make_sunglass();
        this.make_mouth();

        this.flag_decoration = false;
    }
    check_cliked_star(mouse_pos) {
        const r = (this.star_size *this.star_size) / 4;
        const d = (this.star_x - mouse_pos.x) * (this.star_x - mouse_pos.x) + (this.star_y - mouse_pos.y) * (this.star_y - mouse_pos.y); 
        if( d <= r ) {
            return true;
        }
        return false;
    }
    turn_on_decoration() {
        this.flag_decoration = true;
    }
    turn_off_decoration() {
        this.flag_decoration = false;
    }
    set_position(leaf) {
        this.star_x = leaf.sector[ leaf.n - 1]['top'].x;
        this.star_y = leaf.sector[ leaf.n - 1]['top'].y;

        this.sector = {};
        for(let i = 0; i < 5; i++) {
            this.sector[i] = {
                x_long:  this.star_x + this.star_size*Math.cos(Math.PI * (1/2 + 2/5 * i))/2,
                y_long:  this.star_y + this.star_size*Math.sin(Math.PI * (1/2 + 2/5 * i))/2,
                x_short: this.star_x + this.star_size*Math.cos(Math.PI * (1/2 + 2/5 * i + 1/5)) ,
                y_short: this.star_y + this.star_size*Math.sin(Math.PI * (1/2 + 2/5 * i + 1/5)) ,
            }
        }
        
    }
    make_sunglass() {
        this.sunglass = new Sunglass({x: this.star_x, y: this.star_y - this.star_size/4}, this.star_size , this.star_size);
    }
    make_mouth() {
        this.mouth_theta_ratio = 1/4; // Math.PI * mouth_theta_ratio
        this.mouth_d = this.star_size / 4;
    }
    draw(ctx, tick) {
        if( tick % 100 != 0 ) {
            ctx.shadowColor = "white";
            ctx.shadowBlur = 15;
        }
        ctx.fillStyle = '#fff037'
        ctx.beginPath();
        ctx.moveTo( this.star_x, this.star_y );
        for(let i = 0; i < 5; i++) {
            ctx.lineTo( this.sector[i].x_long, this.sector[i].y_long);
            ctx.lineTo( this.sector[i].x_short, this.sector[i].y_short);
        }
        ctx.lineTo( this.sector[0].x_long, this.sector[0].y_long);
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = null;
        ctx.shadowBlur = null;

        if(this.flag_decoration == true) {
            this.sunglass.draw(ctx);
            this.draw_mouth(ctx);
        }
        
    }
    draw_mouth(ctx) {
        
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(this.star_x, this.star_y, this.mouth_d ,-Math.PI * (3/2 + this.mouth_theta_ratio), -Math.PI * (3/2 - this.mouth_theta_ratio));
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}