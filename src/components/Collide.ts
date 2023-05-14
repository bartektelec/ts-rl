import { Component, Has } from '.';

export interface Collide {
  width: number;
  height: number;

  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
}

export const Collide =
  (width: number, height: number = width): Component =>
  (game, entity) => {
    game.entities[entity] |= Has.Collide;

    game.colliders[entity] = {
      width,
      height,
      left: false,
      right: false,
      top: false,
      bottom: false,
    };
  };
