import { Draw } from '../components/Draw';
import { Position } from '../components/Position';
import { TextTile } from '../components/TextTile';
import { Game } from '../core/Game';

export const sys_render = (game: Game) => {
  const entities = game.query(Draw, Position);

  for (const entity of entities) {
    const draw = entity.get(Draw)!;
    const position = entity.get(Position)!;

    const text = entity.get(TextTile)!;

    game.ctx.fillStyle = draw.data.fillStyle;
    game.ctx.font = text.data.font;

    game.ctx.fillText(text.data.text, position.data.x, position.data.y);
  }
};
