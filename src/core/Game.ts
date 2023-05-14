import { Collide } from '../components/Collide';
import { Config } from './Config';
import { Entity } from './Entity';

const MAX_ENTITIES = 10000;
// const MAX_CHILDREN = 1000;

export class Game {
  config: Config;
  ctx: CanvasRenderingContext2D;

  last_time = performance.now();

  entities = new Int8Array(MAX_ENTITIES);
  colliders: (Collide | null)[] = new Array(MAX_ENTITIES).fill(null);
  labels: (string | null)[] = new Array(MAX_ENTITIES).fill(null);
  controls = new Array(MAX_ENTITIES).fill(null);
  movers = new Array(MAX_ENTITIES).fill(null);
  draw = new Array(MAX_ENTITIES).fill(null);

  events = {
    quit: false,
  };

  constructor(private canvas: HTMLCanvasElement) {
    this.config = new Config(640, 480, 0);

    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;

    this.ctx = this.canvas.getContext('2d')!;

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

  update(dt: number) {
    sys_control_player(this, dt);
    // sys_control_ui(this, dt);
    // sys_control_mouse(this, dt);
    sys_move(this, dt);
    sys_collide(this, dt);
    sys_draw2d(this, dt);

    sys_framerate(this, dt);
  }

  loop() {
    if (this.events.quit) return;
    const now = performance.now();

    this.update(now - this.last_time);

    this.last_time = now;

    requestAnimationFrame(this.loop.bind(this));
  }
}
