
export class DecoBall {
    constructor(stageWidth, stageHeight, version, leaf_sector) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.version = version;


        this.leaf_sector = leaf_sector;
        this.set_information();
        this.make_balls();
        this.flag_mouse_clicked = false;

        document.addEventListener("pointermove",this.on_move.bind(this), false);
        
    }

    on_move(e) {
        if( this.flag_mouse_clicked == true) {
            this.origin_deco_ball_x = e.clientX;
            this.origin_deco_ball_y = e.clientY;
        }
    }
    check_mouse_clicked(pos) {
        // detect left click
        console.log("clicked");
        console.log(this.version);
        const mx = pos.x;
        const my = pos.y;

        if( (mx - this.origin_deco_ball_x) * (mx-this.origin_deco_ball_x) + (my- this.origin_deco_ball_y)* (my - this.origin_deco_ball_y) > this.ball_radius*this.ball_radius) {
            return;
        }
        if( this.flag_mouse_clicked == false) {
            this.flag_mouse_clicked = true;
        } else {
            this.flag_mouse_clicked = false;
        }

    }
    check_key_down_f() {
        if( this.flag_mouse_clicked == false) {
            return;
        }
        const mx = this.origin_deco_ball_x;
        const my = this.origin_deco_ball_y;
        this.create_new_ball({x: mx, y: my});
    }
    set_information() {
        // only string tree
        this.ground_y = this.stageHeight * 9 / 10;

        this.ball_radius = this.stageWidth/ 100; 
        this.origin_deco_ball_x = this.stageWidth * 9/10;
        this.origin_deco_ball_y = this.ground_y;

        this.speed = 3;  
        
        if( this.version == 2 ) {
            this.ball_colors = {
                0 : "#fec7fe",
                1 : "#d8ffd8",
                2 : "#9bf6ff",
            }
            
        }
        if( this.version == 1) {
            this.ball_colors = {
                0 : "#7d13ff",
                1 : "#aa21fd",
                2 : "#e37ae9",
            }
        }
         
    }
    make_balls() {
        this.deco_balls = [];
        this.n = 0;
    }
    create_new_ball(pos) {
        this.deco_balls.push({
            x : pos.x,
            y : pos.y,
            color : this.ball_colors[ Math.ceil(Math.random() * 3) - 1],
        });
        this.n += 1;
    }null
    update_ball() {
        if( this.flag_mouse_clicked == false && this.origin_deco_ball_y < this.ground_y ) {
            this.origin_deco_ball_y += this.speed;
        }
    }
    draw(ctx) {
        this.update_ball();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.origin_deco_ball_x, this.origin_deco_ball_y, this.ball_radius,0, Math.PI * 2);
        ctx.fill();

        this.draw_balls(ctx);
    }
    draw_balls(ctx) {
        
        for(let i = 0; i < this.n; i++) {
            const ball_x = this.deco_balls[i].x;
            const ball_y = this.deco_balls[i].y;
            let ball_color = this.deco_balls[i].color;

            ctx.fillStyle = ball_color;


            ctx.beginPath();
            ctx.shadowColor = "white";
            ctx.shadowBlur = 15;
            ctx.arc(ball_x, ball_y, this.ball_radius, 0, Math.PI * 2);
            //ctx.arc(0, 0, 100, 0, Math.PI * 2) ;
            ctx.fill();
            ctx.closePath();
            ctx.shadowColor = null;
            ctx.shadowBlur = null;
        }
    }

}