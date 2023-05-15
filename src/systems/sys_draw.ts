import { Has } from '../components';
import { Game } from '../core/Game';

const query = Has.Draw;

export const sys_draw = (game: Game, _dt: number) => {
  for (const entity in game.entities) {
    if ((game.entities[entity] & query) !== query) continue;

    const draw = game.draw[entity]!;

    game.ctx.fillStyle = draw.color;
    game.ctx.font = '20px sans-serif';

    game.ctx.fillText(draw.sprite, draw.x, draw.y);
  }
};
