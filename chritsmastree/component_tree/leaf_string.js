import { BounceStrings } from "./bounce_string.js";

export class LeafString {
    constructor(leaf_colors, version) {
        this.strings = []
        
        this.leaf_colors = leaf_colors;
    
        this.mouse = {
            x : 0,
            y: 0,
            radius: 100,
        };

        document.addEventListener("pointermove", this.onMove.bind(this), false);

        this.snows_pos = {};

        this.version = version;
    }
    // max_n is the number of maximum_strings.
    show_light_bulb_string(leaf_sector, leaf_sector_length, min_n, max_n) {
        this.right_leaf_sector = [];
        this.left_leaf_sector = [];

        
        this.n1 = 0;
        this.n2 = 0;
        // pick some left points of strings
        for(let i = 0; i < leaf_sector_length; i++) {
            
            let n = Math.ceil( Math.random() * (max_n - min_n) ) + min_n;
            this.n1 += n;

            let delta_x = (leaf_sector[i]['top'].x - leaf_sector[i]['left_bottom'].x) / (n-0.5);
            let left_leaf_inclination = (leaf_sector[i]['top'].y - leaf_sector[i]['left_bottom'].y)/(leaf_sector[i]['top'].x - leaf_sector[i]['left_bottom'].x);

            for(let j = 0; j < n; j++) {

                this.left_leaf_sector.push({
                    x1 : leaf_sector[i]['left_bottom'].x + delta_x * j,
                    y1 : leaf_sector[i]['left_bottom'].y + left_leaf_inclination * (j *  delta_x),
                });
            }
        }
        //pick some right points of strings
        for(let i = 0; i < leaf_sector_length; i++) {
            let n = Math.ceil( Math.random() * (max_n-min_n) ) + min_n;
            this.n2 += n;

            let delta_x = (leaf_sector[i]['right_bottom'].x - leaf_sector[i]['top'].x) / (n-0.5);
            let length = leaf_sector[i]['right_bottom'].x - leaf_sector[i]['left_bottom'].x;
            let left_leaf_inclination = (leaf_sector[i]['top'].y - leaf_sector[i]['left_bottom'].y)/(leaf_sector[i]['top'].x - leaf_sector[i]['left_bottom'].x);

            for(let j = 0; j < n; j++) {

                this.right_leaf_sector.push({
                    x2 : leaf_sector[i]['top'].x + delta_x * j,
                    y2 : leaf_sector[i]['top'].y - left_leaf_inclination * (j *  delta_x),
                });
            }
        }
        this.make_light_bulb_string();
    }
    make_light_bulb_string() {
        this.light_bulb_strings = {};
        for(let i = 0; i < this.n1; i++) {
            const left_point = Math.ceil( Math.random() * (this.n1-1));
            const right_point = Math.ceil( Math.random() * (this.n2-1));

            let pos = {
                x1 : this.left_leaf_sector[left_point].x1,
                y1 : this.left_leaf_sector[left_point].y1,
                x2 : this.right_leaf_sector[right_point].x2,
                y2 : this.right_leaf_sector[right_point].y2,
            };
            
            this.light_bulb_strings[i] = new BounceStrings(pos, '#000000');
        }
    }
    show(leaf_sector, leaf_sector_length,n) {
        if( this.version == 1) {
            this.show_version_one(leaf_sector, leaf_sector_length, n);
        }
        if( this.version == 2) {
            this.show_version_two(leaf_sector, leaf_sector_length, n);
        }
        
        
    }
    show_version_one(leaf_sector, leaf_sector_length, n) {
        this.strings = [];
        
        for(let i = 0; i < leaf_sector_length; i++) {
            let delta_x = (leaf_sector[i]['right_bottom'].x - leaf_sector[i]['left_bottom'].x) / (n-0.5);

            
            let left_leaf_inclination = (leaf_sector[i]['top'].y - leaf_sector[i]['left_bottom'].y)/(leaf_sector[i]['top'].x - leaf_sector[i]['left_bottom'].x);
            let right_leaf_inclination = (leaf_sector[i]['top'].y - leaf_sector[i]['right_bottom'].y)/(leaf_sector[i]['top'].x - leaf_sector[i]['right_bottom'].x);
            this.strings[i] = {};
            for(let j = 0; j < n; j++) {
                let length = leaf_sector[i]['right_bottom'].x - leaf_sector[i]['left_bottom'].x
                let pos = {
                    x1 : leaf_sector[i]['left_bottom'].x + j *  delta_x,
                    y1 : leaf_sector[i]['left_bottom'].y + left_leaf_inclination*(j<n/2 ? (j *  delta_x) : -1*(j *  delta_x - length)),
                    x2 : leaf_sector[i]['left_bottom'].x + j *  delta_x,
                    y2 : leaf_sector[i]['left_bottom'].y,
                    //y2 : leaf_sector[i]['left_bottom'].y,
                }
                
                this.strings[i][j] = new BounceStrings(pos, this.leaf_colors[i], this.version);
            }
        }
        this.leaf_sector_length = leaf_sector_length;
        this.n = n;
    }
    show_version_two(leaf_sector, leaf_sector_length, n) {
        this.strings = [];
        for(let i = 0; i < leaf_sector_length; i++) {
            let delta_x = (leaf_sector[i]['right_bottom'].x - leaf_sector[i]['left_bottom'].x) / (n-0.5);

            this.strings[i] = {};
            for(let j = 0; j < n; j++) {
                let length = leaf_sector[i]['right_bottom'].x - leaf_sector[i]['left_bottom'].x
                let pos = {
                    x1 : leaf_sector[i]['top'].x,
                    y1 : leaf_sector[i]['top'].y,
                    x2 : leaf_sector[i]['left_bottom'].x + j *  delta_x,
                    y2 : leaf_sector[i]['left_bottom'].y,
                    //y2 : leaf_sector[i]['left_bottom'].y,
                }
                
                this.strings[i][j] = new BounceStrings(pos, this.leaf_colors[i], this.version);
            }
        }
        this.leaf_sector_length = leaf_sector_length;
        this.n = n;
    }
    draw(ctx) {
        for(let i = 0; i < this.leaf_sector_length; i++) {
            for(let j = 0; j < this.n; j++) {
                this.strings[i][j].animate(ctx, this.mouse.x, this.mouse.y);
            }
        }
    }
    draw_section(ctx, i, tick) {
        for(let j = 0; j < this.n; j++) {
            
            this.strings[i][j].animate(ctx, this.mouse.x, this.mouse.y, tick);
        }
    }
    draw_light_bulb_string_section(ctx) {
        for(let i = 0; i < this.n1; i++) {
            //console.log( this.light_bulb_strings[i] );
            this.light_bulb_strings[i].animate(ctx, this.mouse.x, this.mouse.y);
        }
    }
    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

}