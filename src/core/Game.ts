import { fps } from '../entities/FPS';
import { player } from '../entities/Player';
import { sys_fps } from '../systems/sys_fps';
import { sys_render } from '../systems/sys_render';
import { Config } from './Config';
import { Entity } from './Entity';

export class Game {
  config: Config;
  ctx: CanvasRenderingContext2D;
  entities: Entity[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.config = new Config(640, 480, 60);
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;

    this.ctx = this.canvas.getContext('2d')!;

    this.init();
  }

  init() {
    this.clear();
    this.entities = [player, fps];

    this.tick();
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);
  }

  tick() {
    this.clear();
    sys_render(this.entities, this.ctx);
    sys_fps(this.entities);

    if (this.config.fps_cap) {
      setTimeout(this.tick.bind(this), 1000 / this.config.fps_cap);
    } else {
      requestAnimationFrame(this.tick.bind(this));
    }
  }
}
