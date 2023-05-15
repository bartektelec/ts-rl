import { Game } from '../core/Game';

export const sys_framerate = (game: Game, dt: number) => {
  if (!game.settings.showFps) return;

  const fps = Math.floor(1000 / dt);

  game.ctx.fillStyle = 'yellow';
  game.ctx.font = '16px monospace';
  game.ctx.fillText(String(fps), 0, 16);
};
