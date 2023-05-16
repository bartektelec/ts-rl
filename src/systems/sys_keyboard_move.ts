import { Has } from '../components';
import { Game } from '../core/Game';

const keydown: Record<string, boolean> = {};

document.addEventListener('keydown', (e) => {
  keydown[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keydown[e.key] = false;
});

const MOVE_OFFSET = 0.15;

const QUERY = Has.ControlPlayer | Has.Move;

export const sys_keyboard_move = (game: Game, dt: number) => {
  for (const entity in game.entities) {
    if ((game.entities[entity] & QUERY) !== QUERY) continue;
    console.log(game.labels[entity]);

    const move = game.movers[entity]!;
    const collider = game.colliders[entity];
    const controls = game.settings.controls;

    const unit = MOVE_OFFSET * dt;

    if (keydown[controls.up] && !collider?.top) move.vy -= unit;
    if (keydown[controls.down] && !collider?.bottom) move.vy += unit;
    if (keydown[controls.left] && !collider?.left) move.vx -= unit;
    if (keydown[controls.right] && !collider?.right) move.vx += unit;
  }
};
