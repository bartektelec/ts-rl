import { Has } from '.';
import { Game } from '../core/Game';

export type AI = {
  vx: number;
  vy: number;
};

export const AI = (game: Game, entity: number) => {
  game.entities[entity] |= Has.AI;

  game.movers[entity] = {
    vy: 0,
    vx: 0,
  };
};
