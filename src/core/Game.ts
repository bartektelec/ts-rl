import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Move } from '../components/Move';
import { Enemy } from '../entities/Enemy';
import { Player } from '../entities/Player';
import { Wall } from '../entities/Wall';
import { sys_ai } from '../systems/sys_ai';
import { sys_collides } from '../systems/sys_collides';
import { sys_draw } from '../systems/sys_draw';
import { sys_framerate } from '../systems/sys_framerate';
import { sys_keyboard_move } from '../systems/sys_keyboard_move';
import { sys_move } from '../systems/sys_move';
import { Config } from './Config';
import { Entity } from './Entity';
import { world } from './World';

const MAX_ENTITIES = 10000;
// const MAX_CHILDREN = 1000;

const read_world = (w: string[]) => {
  return w
    .map((row, row_idx) =>
      row
        .split('')
        .map((cell, col_idx) => {
          const x = col_idx * 20;
          const y = row_idx * 20;

          if (cell === 'P') return Player(x, y);
          if (cell === 'E') return Enemy(x, y);
          if (cell === '-') return Wall(x, y);

          return null;
        })
        .filter((x) => Boolean(x))
    )
    .flat();
};

export class Game {
  config: Config;
  ctx: CanvasRenderingContext2D;

  last_time = performance.now();

  entities = new Int8Array(MAX_ENTITIES);
  colliders: (Collide | null)[] = new Array(MAX_ENTITIES).fill(null);
  labels: (string | null)[] = new Array(MAX_ENTITIES).fill(null);
  controls = new Array(MAX_ENTITIES).fill(null);
  movers: (Move | null)[] = new Array(MAX_ENTITIES).fill(null);
  draw: (Draw | null)[] = new Array(MAX_ENTITIES).fill(null);

  settings = {
    showFps: true,
    controls: {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    },
  };

  events = {
    quit: false,
  };

  constructor(private canvas: HTMLCanvasElement) {
    this.config = new Config(640, 480, 0);

    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;

    this.ctx = this.canvas.getContext('2d')!;

    const blueprints = read_world(world);

    blueprints.forEach((x) => this.add(x));

    this.loop();
  }

  create_entity() {
    const f = this.entities.indexOf(0);

    if (f < 0) throw new Error('Entity list full');

    return f;
  }

  add(blueprint: Entity) {
    const entity = this.create_entity();

    for (const mixin of blueprint) {
      mixin(this, entity);
    }

    return entity;
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update(dt: number) {
    sys_ai(this, dt);
    sys_keyboard_move(this, dt);
    console.time('start');
    sys_collides(this, dt);
    console.timeEnd('start');
    sys_move(this, dt);
    // sys_control_ui(this, dt);
    // sys_control_mouse(this, dt);
    // sys_move(this, dt);
    // sys_collide(this, dt);
    sys_draw(this, dt);

    sys_framerate(this, dt);
  }

  loop() {
    if (this.events.quit) return;
    const now = performance.now();

    this.clear();

    this.update(now - this.last_time);

    this.last_time = now;

    setTimeout(
      () => {
        requestAnimationFrame(this.loop.bind(this));
      },
      this.config.fps_cap ? 1000 / this.config.fps_cap : 0
    );
  }
}
