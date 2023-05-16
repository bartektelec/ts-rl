import { Has } from '../components';
import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Game } from '../core/Game';

const query = Has.Draw;

const get_offset_x = (player: Draw & Collide, game: Game) => {
  const resolution_w = game.config.width;

  const half_w = resolution_w / 2;

  return player.x - half_w + player.width / 2;
};

const get_offset_y = (player: Draw & Collide, game: Game) => {
  const resolution_h = game.config.height;
  const half_h = resolution_h / 2;

  return player.y - half_h + player.height / 2;
};

const in_view = (entity: Draw, game: Game, x: number, y: number) => {
  const is_x = entity.x >= x && entity.x <= x + game.config.width;
  const is_y = entity.y >= y && entity.y <= y + game.config.height;

  return is_y && is_x;
};

export const sys_draw = (game: Game, _dt: number) => {
  const player_id = game.labels.indexOf('player');

  const player = game.draw[player_id]!;
  const player_c = game.colliders[player_id]!;

  const p = { ...player, ...player_c };

  const off_y = get_offset_y(p, game);
  const off_x = get_offset_x(p, game);

  for (const entity in game.entities) {
    if ((game.entities[entity] & query) !== query) continue;

    const draw = game.draw[entity]!;
    if (!in_view(draw, game, off_x, off_y)) continue;

    game.ctx.fillStyle = draw.color;
    game.ctx.font = '20px sans-serif';

    game.ctx.fillText(draw.sprite, draw.x - off_x, draw.y - off_y);
  }
};
