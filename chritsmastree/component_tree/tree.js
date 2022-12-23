import {Leaf} from './leaf.js'
import { Star } from './star.js';

export class Tree{
    constructor(stageWidth, stageHeight, version) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.version = version;
        this.set_tree_information();
        
        this.make_leaf();
        this.make_pillar();
        this.make_star();
    }
    set_tree_information() {
        this.tree_radius_top = this.stageWidth/140;
        this.tree_radius_bottom = this.stageWidth/20;
    }
    make_pillar() {
        this.sector = {}
        this.sector['left_top'] = {
            x : this.stageWidth/2 - this.tree_radius_top,
            y : this.leafs.sector[ this.leafs.n - 1]['top'].y,
        }
        this.sector['left_bottom'] = {
            x : this.stageWidth/2 - this.tree_radius_bottom,
            y : this.stageHeight*9/10,
        }

        this.sector['right_top'] = {
            x : this.stageWidth/2 + this.tree_radius_top,
            y : this.leafs.sector[ this.leafs.n - 1]['top'].y, 
        }
        this.sector['right_bottom'] = {
            x : this.stageWidth/2 + this.tree_radius_bottom,
            y : this.stageHeight* 9/10,
        }
    }
    make_leaf() {
        this.leafs = new Leaf(this.stageWidth, this.stageHeight, this.version);
    }
    make_star() {
        
        this.star = new Star(this.stageWidth, this.stageHeight, this.leafs);
    }
    draw(ctx, tick) {
        ctx.fillStyle = '#341400';
        ctx.beginPath();
        ctx.moveTo(this.sector['left_bottom'].x, this.sector['left_bottom'].y); //start_point
        ctx.lineTo(this.sector['left_top'].x, this.sector['left_top'].y);
        ctx.lineTo(this.sector['right_top'].x, this.sector['right_top'].y);
        ctx.lineTo(this.sector['right_bottom'].x, this.sector['right_bottom'].y); //start_point
        ctx.lineTo(this.sector['left_bottom'].x, this.sector['left_bottom'].y);
        //ctx.lineWidth = 7;
        //ctx.stroke();

        ctx.fillStyle = '#563624';
        ctx.fill();

        this.leafs.draw(ctx, tick);
        this.star.draw(ctx, tick);
    }
}
