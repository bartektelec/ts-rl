import { Has } from '../components';
import { Game } from '../core/Game';

const calculate_aabb = ({
  x,
  y,
  vx,
  vy,
  w,
  h,
}: {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
}) => ({
  min: {
    x: x + vx,
    y: y + vy,
  },
  max: {
    x: x + w + vx,
    y: y + h + vy,
  },
});

const intersect_aabb = (
  a: ReturnType<typeof calculate_aabb>,
  b: ReturnType<typeof calculate_aabb>
): boolean => {
  const result =
    a.min.x < b.max.x &&
    a.max.x > b.min.x &&
    a.min.y < b.max.y &&
    a.max.y > b.min.y;

  return result;
};

const QUERY = Has.Collide | Has.Draw;

const MOVABLE_QUERY = QUERY | Has.Move;

export const sys_collides = (game: Game, _dt: number) => {
  for (let a in game.entities) {
    if ((game.entities[a] & MOVABLE_QUERY) !== MOVABLE_QUERY) continue;

    const move_a = game.movers[a]!;
    const draw_a = game.draw[a]!;
    const col_a = game.colliders[a]!;

    col_a.right = false;
    col_a.left = false;
    col_a.top = false;
    col_a.bottom = false;

    const moved_a = calculate_aabb({
      x: draw_a.x,
      y: draw_a.y,
      vx: move_a?.vx ?? 0,
      vy: move_a?.vy ?? 0,
      w: col_a.width,
      h: col_a.height,
    });

    for (let b in game.entities) {
      if (a === b) continue;
      if ((game.entities[b] & QUERY) !== QUERY) continue;

      const draw_b = game.draw[b]!;
      const col_b = game.colliders[b]!;

      const moved_b = calculate_aabb({
        x: draw_b.x,
        y: draw_b.y,
        vx: 0,
        vy: 0,
        w: col_b.width,
        h: col_b.height,
      });

      const collides = intersect_aabb(moved_a, moved_b);

      if (collides) {
        move_a.vy = 0;
        move_a.vx = 0;
      }
    }
  }
};
