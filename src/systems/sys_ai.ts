import { Has } from '../components';
import { Game } from '../core/Game';

export const SIZE = 0.1;

const QUERY = Has.AI | Has.Move;

export const sys_ai = (game: Game, dt: number) => {
  for (const e in game.entities) {
    if ((game.entities[e] & QUERY) !== QUERY) continue;

    const flip_x = Math.random() * dt < dt / 2;
    const flip_y = Math.random() * dt < dt / 2;

    const move = game.movers[e]!;

    move.vx += SIZE * dt * (flip_x ? -1 : 1);
    move.vy += SIZE * dt * (flip_y ? -1 : 1);
  }
};
