import { fpsCounter } from '../entities/FPS';
import { player } from '../entities/Player';
import { Wall } from '../entities/Wall';
import { sys_collides } from '../systems/sys_collides';
import { sys_fps } from '../systems/sys_fps';
import { sys_keyboard_move } from '../systems/sys_keyboard_move';
import { sys_render } from '../systems/sys_render';
import { Component } from './Component';
import { Config } from './Config';
import { Entity } from './Entity';

export class Game {
  config: Config;
  ctx: CanvasRenderingContext2D;
  entities: Entity[] = [];
  systems: ((w: Game) => void)[] = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.config = new Config(640, 480, 60);

    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;

    this.ctx = this.canvas.getContext('2d')!;

    this.init();
  }

  init() {
    this.clear();
    this.entities = [player, fpsCounter, Wall];
    this.systems = [sys_collides, sys_keyboard_move];

    this.tick();
    this.draw();
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.config.width, this.config.height);
  }

  query<T extends (...args: any) => Component<unknown>>(...c: T[]): Entity[] {
    const result = c
      .map((component) =>
        this.entities.filter((entity) => entity.has(component))
      )
      .flat();

    return result;
  }

  tick() {
    for (const system of this.systems) {
      system(this);
    }

    requestAnimationFrame(this.tick.bind(this));
  }

  draw() {
    this.clear();

    sys_render(this);
    sys_fps(this);

    if (this.config.fps_cap) {
      setTimeout(this.draw.bind(this), 1000 / this.config.fps_cap);
    } else {
      requestAnimationFrame(this.draw.bind(this));
    }
  }
}
