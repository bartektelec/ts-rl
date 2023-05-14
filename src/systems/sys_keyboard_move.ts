import { Collider } from '../components/Collider';
import { FpsCounter } from '../components/FpsCounter';
import { Move } from '../components/Move';
import { Position } from '../components/Position';
import { Game } from '../core/Game';

const keydown: Record<string, boolean> = {};

document.addEventListener('keydown', (e) => {
  keydown[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keydown[e.key] = false;
});

const MOVE_OFFSET = 0.5;

export const sys_keyboard_move = (game: Game) => {
  const move_entities = game.query(Move, Position);
  const fps = game.query(FpsCounter)[0]!.get(FpsCounter);

  for (const entity of move_entities) {
    const position = entity.get(Position)!;
    const controls = entity.get(Move)!;
    const collider = entity.get(Collider);
    if (!controls || !position) continue;

    if (keydown[controls.data.keys.up] && !collider?.data.top)
      position.data.y -= MOVE_OFFSET;
    if (keydown[controls.data.keys.down] && !collider?.data.bottom)
      position.data.y += MOVE_OFFSET;
    if (keydown[controls.data.keys.left] && !collider?.data.left)
      position.data.x -= MOVE_OFFSET;
    if (keydown[controls.data.keys.right] && !collider?.data.right)
      position.data.x += MOVE_OFFSET;
  }
};
