import { Has } from '../components';
import type { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Game } from '../core/Game';

type CollidableEntity = {
  draw: Draw;
  col: Collide;
};
const collide_width = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.x + a.col.width >= b.draw.x && a.draw.x <= b.draw.x + b.col.width;

const collide_height = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.y + a.col.height >= b.draw.y && a.draw.y <= b.draw.y + b.col.height;
const collide_l = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.x === b.draw.x + b.col.width && collide_height(a, b);
const collide_r = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.x + a.col.width === b.draw.x && collide_height(a, b);
const collide_t = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.y === b.draw.y + b.col.height && collide_width(a, b);

const collide_b = (a: CollidableEntity, b: CollidableEntity) =>
  a.draw.y + a.col.height === b.draw.y && collide_width(a, b);

const QUERY = Has.Collide | Has.Draw;

export const sys_collides = (game: Game, _dt: number) => {
  for (let a in game.entities) {
    if ((game.entities[a] & QUERY) !== QUERY) continue;

    const draw_a = game.draw[a]!;
    const col_a = game.colliders[a]!;

    col_a.right = false;
    col_a.left = false;
    col_a.top = false;
    col_a.bottom = false;

    for (let b in game.entities) {
      if (a === b) continue;
      if ((game.entities[b] & QUERY) !== QUERY) continue;
      console.log(a, b);

      const draw_b = game.draw[b]!;
      const col_b = game.colliders[b]!;

      const aa = {
        draw: draw_a,
        col: col_a,
      };
      const bb = {
        draw: draw_b,
        col: col_b,
      };
      if (collide_l(aa, bb)) aa.col.left = true;
      if (collide_t(aa, bb)) aa.col.top = true;
      if (collide_b(aa, bb)) aa.col.bottom = true;
      if (collide_r(aa, bb)) aa.col.right = true;
    }
  }
};
