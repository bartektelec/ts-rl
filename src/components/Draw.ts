import { Component, Has } from '.';

export interface Draw {
  x: number;
  y: number;
  sprite: string;
  color: string;
}

export const Draw =
  (x: number, y: number, sprite: string, color: string = 'white'): Component =>
  (game, entity) => {
    game.entities[entity] |= Has.Draw;

    game.draw[entity] = {
      x,
      y,
      sprite,
      color,
    };
  };
