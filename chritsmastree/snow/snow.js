

export class Snow {
    constructor(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        
        this.make_snows();

        
        this.set_fallen_snow_pos(); 
    }  

    make_snows() {
        this.snows = {};
        this.create_snows();
    }
    create_snows() {
        this.n = 20 + Math.random() * 13;
        for( let i = 0; i < this.n; i++) {
            this.snows[i] = {
                x : Math.random() * this.stageWidth,
                y : -100,
                speed_x : 1 + Math.random() * 3 - 2,
                speed_y : 2 + Math.random() * 3,
                radius : 2 + Math.random() * 2,
                color : "white", 
                dir : Math.random() * Math.PI,
                type : Math.floor(Math.random() * 3),
            }
            
        }
        
    }
    
    set_fallen_snow_pos() {
        this.total = 50;
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        this.fallen_snow_pos = {};

    }
    upadate_fallen_snow_pos(fallen_snow_particle_x) {
        
        try {
            this.fallen_snow_pos[Math.ceil( fallen_snow_particle_x / this.gap)].count +=  1;
            
        } catch {
            this.fallen_snow_pos[Math.ceil( fallen_snow_particle_x / this.gap)] = {
                count : 1,
            };
        }
        
    }
    
    get_fallen_snow_pos() {
        return this.fallen_snow_pos;
    }
    reset_fallen_snow_pos() {
        this.fallen_snow_pos = {};
    }
    upadate_snows() {
        for( let i = 0; i < this.n; i++ ) {
            this.snows[i].y += this.snows[i].speed_y;
            this.snows[i].x += this.snows[i].speed_x + Math.cos( this.snows[i].dir );

            this.snows[i].dir = (this.snows[i].dir + 1 / (Math.PI * 4 ))  ; 
        } 
    }
    kill_snows() {
        for( let i = 0; i < this.n; i++) {
            if( this.snows[i].y > this.stageHeight ) {
                this.upadate_fallen_snow_pos(this.snows[i].x);
            }
            if( this.snows[i].y > this.stageHeight || this.snows[i].x < 0 || this.snows[i].x > this.stageWidth) {
                

                this.snows[i].y = -100;
                this.snows[i].x = Math.random() * this.stageWidth;
            }
            
        }
    }
    set_snow_opacity(object_snow) {
        if( object_snow.type == 0) {
            this.snow_opacity = 1 - object_snow.y/( this.stageHeight );
            this.snow_radius = this.snow_radius - this.snow_radius/(1+object_snow.y);
            return;
        }
        if( object_snow.type == 1) {
            this.snow_opacity = 0.4;
            return;
        }
        this.snow_opacity = 0.7;
    }
    draw(ctx, tick) {

        
        for(let i = 0; i < this.n; i++) {
            this.set_snow_opacity(this.snows[i]);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.snow_opacity - 0.3})`;

            ctx.beginPath();
            ctx.arc(this.snows[i].x, this.snows[i].y, this.snows[i].radius + 1, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${this.snow_opacity })`;
            ctx.arc(this.snows[i].x, this.snows[i].y, this.snows[i].radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        if( tick % 3 != 0) return;
        this.upadate_snows();
        this.kill_snows();
        
    }
}