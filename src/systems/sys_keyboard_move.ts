import { Has } from '../components';

const keydown: Record<string, boolean> = {};

document.addEventListener('keydown', (e) => {
  keydown[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keydown[e.key] = false;
});

const MOVE_OFFSET = 3;

const QUERY = Has.ControlPlayer | Has.Move;

export const sys_keyboard_move = (game: Game, _dt: number) => {
  for (const entity in game.entities) {
    if ((game.entities[entity] & QUERY) !== QUERY) continue;

    const move = game.movers[entity]!;
    const collider = game.colliders[entity];
    const controls = game.settings.controls;

    if (keydown[controls.up] && !collider?.top) move.vy -= MOVE_OFFSET;
    if (keydown[controls.down] && !collider?.bottom) move.vy += MOVE_OFFSET;
    if (keydown[controls.left] && !collider?.left) move.vx -= MOVE_OFFSET;
    if (keydown[controls.right] && !collider?.right) move.vx += MOVE_OFFSET;
  }
};
