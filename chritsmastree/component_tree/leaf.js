import { LeafString } from "./leaf_string.js";


export class Leaf {
    constructor(stageWidth, stageHeight, version) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.version = version;

        this.set_leaf_information();
        this.make_leaf();
        
        console.log("version : ", this.version);
    }

    set_leaf_information() {


        this.start_point_x = this.stageWidth / 2 ;
        this.start_point_y = this.stageHeight * 7 / 10;
        
        this.end_point_x = this.stageWidth / 2;
        this.end_point_y = this.stageHeight / 10;
        // the number of leaf
        this.n = 3;
        
        this.leaf_height = (this.start_point_y - this.end_point_y) / this.n + this.stageHeight/10;
        this.leaf_width = this.stageWidth / 3;
        this.leaf_delta = this.stageWidth * 1/40;
        
        this.set_colors();
    }
    set_colors() {
        this.leaf_colors = {
            0 : "#00413f", // most dark
            1 : "#007542",
            2 : "#008f48",
        }
    }
    // n is the number of leafs
    make_leaf() {
        this.sector = {}
        this.deco_balls = {};
        for( let i = 0; i < this.n; i++) {
            this.sector[i] = {}
            this.sector[i]['top'] = {
                x : this.start_point_x,
                y : this.start_point_y - (i+1) * this.leaf_height* 6/10,
            }
            this.sector[i]['left_bottom'] = {
                x : this.end_point_x - ( this.leaf_width / 2 - i * this.leaf_delta),
                y : this.sector[i]['top'].y + this.leaf_height,
            }
    
            this.sector[i]['right_bottom'] = {
                x : this.end_point_x + (this.leaf_width / 2 - i * this.leaf_delta),
                y : this.sector[i]['top'].y + this.leaf_height,
            }
            
            

        }
        this.leaf_string = new LeafString(this.leaf_colors, this.version);
        if(this.version == 1) {
            this.leaf_string.show(this.sector, this.n ,50);
        }
        if(this.version == 2) {
            this.leaf_string.show(this.sector, this.n, 10);
        }
        
        this.leaf_string.show_light_bulb_string(this.sector, this.n, 3, 5);
    }
    draw(ctx, tick) {
        if(this.version == 1) {
            this.draw_version_one(ctx, tick);
        }
        if(this.version == 2) {
            this.draw_version_two(ctx, tick);
        }
        //this.leaf_string.draw_light_bulb_string_section(ctx);
        //this.leaf_string.draw(ctx);
    }
    draw_version_one(ctx, tick) {
        for(let i = 0; i < 3; i++) {
            this.leaf_string.draw_section(ctx, i, tick);
        }
    }
    draw_version_two(ctx, tick) {
        for(let i = 0; i < 3; i++) {
            
            ctx.fillStyle = this.leaf_colors[i];
            ctx.beginPath();

            // left to right
            ctx.moveTo( this.sector[i]['left_bottom'].x, this.sector[i]['left_bottom'].y );
            let prev_x = this.sector[i]['left_bottom'].x;
            let prev_y = this.sector[i]['left_bottom'].y
            for(let x = this.sector[i]['left_bottom'].x; x < this.sector[i]['right_bottom'].x; x = x + 15) {
                const cx = x;
                const cy = prev_y + Math.sin(x *2/Math.PI) * 10;
                ctx.quadraticCurveTo(prev_x, prev_y, cx, cy )
                prev_x = cx;
                prev_y = cy;
            }
            
            
            ctx.lineTo(this.sector[i]['right_bottom'].x, this.sector[i]['right_bottom'].y);
            const cx1 = (this.sector[i]['right_bottom'].x + this.sector[i]['top'].x ) / 2 + (this.sector[i]['right_bottom'].x - this.sector[i]['top'].x )/10 ;
            const cy1 = (this.sector[i]['right_bottom'].y + this.sector[i]['top'].y ) / 2;
            ctx.quadraticCurveTo( cx1, cy1, this.sector[i]['top'].x, this.sector[i]['top'].y );
    
            ctx.lineTo(this.sector[i]['top'].x, this.sector[i]['top'].y);
            const cx2 = (this.sector[i]['top'].x + this.sector[i]['left_bottom'].x ) / 2 - (this.sector[i]['top'].x - this.sector[i]['left_bottom'].x )/10 ;
            const cy2 =  (this.sector[i]['top'].y + this.sector[i]['left_bottom'].y ) / 2;
            ctx.quadraticCurveTo( cx2, cy2, this.sector[i]['left_bottom'].x, this.sector[i]['left_bottom'].y );

            ctx.lineTo(this.sector[i]['left_bottom'].x, this.sector[i]['left_bottom'].y);

            ctx.fill(); 

            this.leaf_string.draw_section(ctx, i, tick);
            ctx.closePath();
            
        }
    }
}