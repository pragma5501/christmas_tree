import {Tree} from './component_tree/tree.js'
import {Snow} from './snow/snow.js'
import {Snowman} from './snowman/snowman.js'
import {Ground} from './ground/ground.js'
import { DecoBall } from "./decoration/deco_ball.js";
import { Moon } from './decoration/moon.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.pixelRatio = (window.pixelRatio > 1) ? 2 : 1;
        
        this.version = 2;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.mouse = {
            x : 0,
            y : 0,
        }
        document.addEventListener('click', this.click_mouse.bind(this), false);
        document.addEventListener('keydown', this.key_down.bind(this), false);

        this.tick = 0;
        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.canvas.style.width = this.stageWidth + "px";
        this.canvas.style.height = this.stageHeight + "px";
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 4;

        this.create_ground();
        this.create_tree();
        this.create_snow();
        this.create_snowman();
        this.create_deco_bell();
        this.create_moon();
    }
    create_ground() {
        this.ground = undefined;
        this.ground = new Ground(this.stageWidth, this.stageHeight);
    }
    create_tree() {
        this.christmas_tree = new Tree(this.stageWidth, this.stageHeight, this.version);
    }
    create_snow() {
        this.snows = new Snow(this.stageWidth, this.stageHeight);
    }
    draw_snows() {
        this.snows.draw(this.ctx, this.tick);
    }
    create_snowman() {
        this.snowman = new Snowman(this.stageWidth, this.stageHeight);
    }
    create_deco_bell() {
        this.deco_bell = new DecoBall(this.stageWidth, this.stageHeight, this.version, this.christmas_tree.leafs.sector);
    }
    create_moon() {
        this.moon = new Moon(
            {
                x: this.stageWidth * 8/10, 
                y: this.stageHeight * 1/10,
            },
            this.stageWidth /30,
            this.stageWidth /30 );
    }
    update_ground() {
        this.ground.build_snow_ground( this.snows.get_fallen_snow_pos() );
        this.snows.reset_fallen_snow_pos();
    }
    remove_class_instances() {
        this.ground = undefined;
        this.christmas_tree = undefined;
        this.snows = undefined;
        this.snowman = undefined;
        this.deco_bell = undefined;
    }
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        
        this.tick = (this.tick + 1) % 1000;

        this.update_ground();
        this.ground.draw(this.ctx);
        this.christmas_tree.draw(this.ctx, this.tick);
        
        this.snowman.draw(this.ctx, this.tick);
        this.draw_snows();
        
        this.deco_bell.draw(this.ctx);
        this.moon.draw(this.ctx);
    }
    change_version() {
        if( this.version == 2 ) {
            this.version = 1;
        } else {
            this.version = 2;
        }
    }
    click_mouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.button = e.button;
        
        let flag_change_version = this.christmas_tree.star.check_cliked_star(this.mouse);
        this.deco_bell.check_mouse_clicked(this.mouse);

        let flag_clicked_snowman = this.snowman.check_clicked_snowman(this.mouse);
        if( flag_clicked_snowman == true) {
            this.deco_ball = undefined;
            this.create_deco_bell();
        }
        if( flag_change_version == true ) {
            this.change_version();
            this.remove_class_instances();
            this.resize();
        }
    }
    key_down(e) {
        if( e.key == "f") {
            this.deco_bell.check_key_down_f();
        }
    }
}

window.onload = () => {
    new App();

    const audioElement = new Audio('./music/music1.mp3');
    audioElement.addEventListener("loadeddata", () => {
        let duration = audioElement.duration;
        audioElement.loop = true;
        audioElement.play();
    });
    //audio.play();
    //audioElement.loop = true;
}