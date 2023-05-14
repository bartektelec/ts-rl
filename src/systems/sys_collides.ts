import { Collider } from '../components/Collider';
import { Position } from '../components/Position';
import { Game } from '../core/Game';

type CollidableEntity = {
  pos: ReturnType<typeof Position>;
  col: ReturnType<typeof Collider>;
};
const collide_width = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.x + a.col.data.width >= b.pos.data.x &&
  a.pos.data.x <= b.pos.data.x + b.col.data.width;

const collide_height = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.y + a.col.data.height >= b.pos.data.y &&
  a.pos.data.y <= b.pos.data.y + b.col.data.height;
const collide_l = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.x === b.pos.data.x + b.col.data.width && collide_height(a, b);
const collide_r = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.x + a.col.data.width === b.pos.data.x && collide_height(a, b);
const collide_t = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.y === b.pos.data.y + b.col.data.height && collide_width(a, b);

const collide_b = (a: CollidableEntity, b: CollidableEntity) =>
  a.pos.data.y + a.col.data.height === b.pos.data.y && collide_width(a, b);

export const sys_collides = (game: Game) => {
  const entites = game.query(Collider);

  for (let a_ent of entites) {
    const pos_a = a_ent.get(Position);
    if (!pos_a) continue;

    const col_a = a_ent.get(Collider)!;

    col_a.data.right = false;
    col_a.data.left = false;
    col_a.data.top = false;
    col_a.data.bottom = false;

    for (let b_ent of entites) {
      if (a_ent === b_ent) continue;

      const pos_b = b_ent.get(Position);
      const col_b = b_ent.get(Collider)!;

      if (!pos_b) continue;

      const a: CollidableEntity = { pos: pos_a, col: col_a };
      const b: CollidableEntity = { pos: pos_b, col: col_b };

      if (collide_l(a, b)) a.col.data.left = true;
      if (collide_t(a, b)) a.col.data.top = true;
      if (collide_b(a, b)) a.col.data.bottom = true;
      if (collide_r(a, b)) a.col.data.right = true;
    }
  }
};
