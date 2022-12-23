
export class Sunglass {
    constructor(pos, sunglass_width, sunglass_height) {

        this.sunglass_x = pos.x;
        this.sunglass_y = pos.y;

        this.sunglass_width = sunglass_width;
        this.sunglass_height = sunglass_height;

        
        this.load_sunglass();

    }
    load_sunglass() {
        this.sunglass_img = new Image();
        this.sunglass_img.onload = () => {
            this.isLoaded = true;
        }
        this.sunglass_img.src = './decoration/decoration_resource/sunglass.png';
 
        this.isLoaded = false;  
    }

    draw(ctx) {
        if( !this.isLoaded ) return;
        ctx.save();
        ctx.translate(this.sunglass_x - this.sunglass_width/2, this.sunglass_y - this.sunglass_height/2);
        
        ctx.drawImage(this.sunglass_img,0,0,this.sunglass_width, this.sunglass_height);//, this.sunglass_x - this.sunglass_width/2, this.sunglass_y - this.sungalss_height/2, this.sunglass_width, this.sungalss_height);
        ctx.restore();
    }
}