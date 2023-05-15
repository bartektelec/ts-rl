import { Has } from '../components';
import { Game } from '../core/Game';

const QUERY = Has.Move | Has.Draw;

export const sys_move = (game: Game, _dt: number) => {
  for (let e in game.entities) {
    if ((game.entities[e] & QUERY) !== QUERY) continue;

    const move = game.movers[e]!;
    const draw = game.draw[e]!;
    const col = game.colliders[e];
    if (col?.right && move.vx > 0) move.vx = 0;
    if (col?.left && move.vx < 0) move.vx = 0;
    if (col?.top && move.vy < 0) move.vy = 0;
    if (col?.bottom && move.vy > 0) move.vy = 0;

    console.log(col?.right, col?.left, col?.top, col?.bottom);

    draw.y += move.vy;
    draw.x += move.vx;

    move.vx = 0;
    move.vy = 0;
  }
};
