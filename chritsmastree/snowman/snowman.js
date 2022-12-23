import {Sunglass} from '../decoration/sunglass.js'


export class Snowman {
    constructor(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    
        this.set_information();
    }

    set_information() {
        this.make_body();
        this.make_eye();
        this.make_nose();
        this.make_hat();
        this.make_mouth();
        this.make_sunglass();
    }
    make_body() {
        this.sector = {};
        this.sector['bottom'] = {
            radius : this.stageHeight / 10,
            x : this.stageWidth * 8/10,
            y : this.stageHeight - (this.stageHeight/20) - this.stageHeight / 10,
        }
        this.sector['top'] = {
            radius : this.stageHeight / 15,
            x : this.sector['bottom'].x,
            y : this.sector['bottom'].y -this.sector['bottom'].radius - (this.stageHeight/25)*8/10,
        }
        this.body_color = "white";
        this.body_color_shadow = "rgb(200, 200, 200)";  
    }
    make_eye() {
        this.eye_theta_ratio = 1/4; // Math.PI * eye_theta_ratio
        this.eye_d = this.sector['top'].radius / 3;

        this.sector['left_eye'] = {
            radius : this.sector['top'].radius / 10,
            x : this.sector['top'].x - this.eye_d * Math.cos( Math.PI * (1/2 - this.eye_theta_ratio) ),
            y : this.sector['top'].y - this.eye_d * Math.sin( Math.PI * (1/2 - this.eye_theta_ratio)),

        }
        this.sector['right_eye'] = {
            radius : this.sector['top'].radius / 10,
            x : this.sector['top'].x - this.eye_d * Math.cos( Math.PI * (1/2 + this.eye_theta_ratio) ),
            y : this.sector['top'].y - this.eye_d * Math.sin( Math.PI * (1/2 + this.eye_theta_ratio)),

        }
    }
    make_nose() {
        this.sector['nose'] = {
            radius : this.sector['top'].radius / 8,
            x : this.sector['top'].x,
            y : this.sector['top'].y,
        }
    }
    make_hat() {
        this.hat_height = this.stageHeight/20;
        this.hat_theta_ratio = 1/4;
        this.hat_speed = 1;

        this.sector['hat_top'] = {
            x : this.sector['top'].x,
            y : this.sector['top'].y - this.sector['top'].radius - this.hat_height,
            radius : this.sector['top'].radius / 5,
        }
        this.sector['bottom_left'] = {
            x : this.sector['top'].x - this.sector['top'].radius * Math.cos( Math.PI * (1/2 - this.hat_theta_ratio) ),
            y : this.sector['top'].y - this.sector['top'].radius * Math.sin( Math.PI * (1/2 - this.hat_theta_ratio)),
        }
        this.sector['bottom_right'] = {
            x : this.sector['top'].x - this.sector['top'].radius * Math.cos( Math.PI * (1/2 + this.hat_theta_ratio) ),
            y : this.sector['top'].y - this.sector['top'].radius * Math.sin( Math.PI * (1/2 + this.hat_theta_ratio)),
        }
        this.hat_color = "red";
        this.hat_dir = 1;
        
        
    }
    make_mouth() {
        this.mouth_theta_ratio = 1/4; // Math.PI * mouth_theta_ratio
        this.mouth_d = this.sector['top'].radius / 3;
    
    }
    make_sunglass() {   
        this.sunglass = new Sunglass({x: this.sector['top'].x, y: this.sector['left_eye'].y}, this.sector['top'].radius*2 , this.sector['top'].radius*2 );
        this.flag_sunglass = true;
    }
    update_hat(tick) {
        if( tick % Math.floor(Math.random() * 10) != 0) return;
        const middle = (this.sector['bottom_left'].x + this.sector['bottom_right'].x) / 2;
        const length = (this.sector['bottom_right'].x - this.sector['bottom_left'].x);
        const basic_height = this.sector['top'].y - this.sector['top'].radius;
        const delta_x = this.sector['hat_top'].x - middle;
        if( delta_x <= -length/4 || delta_x >= length/4 ) {
            this.hat_dir *= -1;
            
        }
        this.sector['hat_top'].x  += this.hat_speed * this.hat_dir;
        this.sector['hat_top'].y = basic_height - this.hat_height*Math.cos(Math.PI/2 * ( delta_x) / (length/2) )   //cos : [-pi/2, pi/2] 
    }
    draw(ctx,tick) {
        this.draw_body(ctx, this.sector['bottom']);
        this.draw_body(ctx, this.sector['top']);
        this.draw_eye(ctx, this.sector['right_eye']);
        this.draw_eye(ctx, this.sector['left_eye']);
        this.draw_nose(ctx, this.sector['nose']);
        this.draw_hat(ctx, tick);
        this.draw_mouth(ctx);
        this.draw_sunglass(ctx);
    }
    draw_body(ctx, sector_part) {
        const x = sector_part.x;
        const ty = sector_part.y - sector_part.radius;
        const by = sector_part.y + sector_part.radius; 
        const gradient = ctx.createLinearGradient(x, ty, x, by );

        gradient.addColorStop(0, this.body_color);
        gradient.addColorStop(0.6, this.body_color);
        gradient.addColorStop(1, this.body_color_shadow);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(sector_part.x, sector_part.y, sector_part.radius ,0, Math.PI*2 );
        ctx.fill();
        ctx.closePath();
    }
    draw_eye(ctx, sector_part) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(sector_part.x, sector_part.y, sector_part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    draw_nose(ctx, sector_part) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(sector_part.x, sector_part.y, sector_part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    draw_hat(ctx, tick) {
        this.update_hat(tick);
        ctx.beginPath();
        ctx.fillStyle = "red";
        
        ctx.moveTo( this.sector['bottom_left'].x, this.sector['bottom_left'].y );
        const cx = (this.sector['bottom_left'].x + this.sector['bottom_right'].x )/2;
        const cy = this.sector['bottom_left'].y - 1/3*(this.sector['bottom_left'].y - this.sector['hat_top'].y);
        //ctx.quadraticCurveTo( this.sector['bottom_left'].x, this.sector['bottom_left'].y, cx, cy );
        ctx.quadraticCurveTo( cx, cy, this.sector['bottom_right'].x, this.sector['bottom_right'].y );

        //ctx.lineTo(this.sector['bottom_right'].x, this.sector['bottom_right'].y);
        
        
        ctx.lineTo(this.sector['bottom_right'].x, this.sector['bottom_right'].y);
        const cx1 = (this.sector['bottom_right'].x + this.sector['hat_top'].x ) / 2 + (this.sector['bottom_right'].x - this.sector['hat_top'].x )/5 ;
        const cy1 = (this.sector['bottom_right'].y + this.sector['hat_top'].y ) / 2;
        ctx.quadraticCurveTo( cx1, cy1, this.sector['hat_top'].x, this.sector['hat_top'].y );

        ctx.lineTo(this.sector['hat_top'].x, this.sector['hat_top'].y);
        const cx2 = (this.sector['hat_top'].x + this.sector['bottom_left'].x ) / 2 - (this.sector['hat_top'].x - this.sector['bottom_left'].x )/1/3 ;
        const cy2 =  (this.sector['hat_top'].y + this.sector['bottom_left'].y ) / 2;
        ctx.quadraticCurveTo( cx2, cy2, this.sector['bottom_left'].x, this.sector['bottom_left'].y );
        
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.sector['hat_top'].x, this.sector['hat_top'].y, this.sector['hat_top'].radius, 0, Math.PI * 2);
        ctx.fill();
    }
    draw_mouth(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(this.sector['top'].x, this.sector['top'].y, this.mouth_d ,-Math.PI * (3/2 + this.mouth_theta_ratio), -Math.PI * (3/2 - this.mouth_theta_ratio));
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    draw_sunglass(ctx) {
        if( this.flag_sunglass == true ) {
            this.sunglass.draw(ctx);
        }
    }
    check_clicked_snowman(mouse_pos) {
        let x = this.sector['top'].x;
        let y = this.sector['top'].y;
        let mx = mouse_pos.x;
        let my = mouse_pos.y;

        const r = (this.sector['top'].radius * this.sector['top'].radius) / 4;
        const d = (x-mx)*(x-mx) + (y-my)*(y-my);
        if( d <= r ) {
            if( this.flag_sunglass == true ) {
                this.flag_sunglass = false;
            } else {
                this.flag_sunglass = true;
            }
            return true;
        }
        return false;
    }
}