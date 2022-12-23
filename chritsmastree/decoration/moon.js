
export class Moon {
    constructor(pos, moon_width, moon_height) {

        this.moon_x = pos.x;
        this.moon_y = pos.y;

        this.moon_width = moon_width;
        this.moon_height = moon_height;

        
        this.load_moon();

    }
    load_moon() {
        this.moon_img = new Image();
        this.moon_img.onload = () => {
            this.isLoaded = true;
        }
        this.moon_img.src = './decoration/decoration_resource/moon.png';
 
        this.isLoaded = false;  
    }

    draw(ctx) {
        if( !this.isLoaded ) return;
        ctx.save();
        ctx.translate(this.moon_x - this.moon_width/2, this.moon_y - this.moon_height/2);
        
        ctx.drawImage(this.moon_img,0,0,this.moon_width, this.moon_height);//, this.moon_x - this.moon_width/2, this.moon_y - this.sungalss_height/2, this.moon_width, this.sungalss_height);
        ctx.restore();
    }
}