export class LeafSnow {
    constructor(stageWidth, stageHeight, leaf_class, snow_class) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.leaf = leaf_class;
        this.snows = snow_class;
    }

    set_snow_sector() {
        this.snow_sector = {};
        for(let i = 0; i < this.leaf.n; i++) {
            this.snow_sector[i] = {};
            this.snow_sector[i]['left'] = {
                x : this.leaf.sector[i]['left_bottom'].x,
                y : this.leaf.sector[i]['left_bottom'].y,
            }
            this.snow_sector[i]['right'] = {
                x : this.leaf.sector[i]['right_bottom'].x,
                y : this.leaf.sector[i]['right_bottom'].y,
            }
        }
    }
    detect_collision_snow_with_leaf() {
        
    }
    draw(ctx) {

    }

}