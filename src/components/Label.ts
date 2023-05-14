import { Component, Has } from '.';

export const Label =
  (s: string): Component =>
  (game, entity) => {
    game.entities[entity] |= Has.Label;

    game.labels[entity] = s;
  };
