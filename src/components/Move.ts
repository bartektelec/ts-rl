import { Component, Has } from '.';
import { Game } from '../core/Game';

export interface Move {
  vy: number;
  vx: number;
}

export const Move = (): Component => (game: Game, entity: number) => {
  game.entities[entity] |= Has.Move;

  game.movers[entity] = {
    vx: 0,
    vy: 0,
  };
};
