import { Component, Has } from '.';

export const PlayerControl = (): Component => (game, entity) => {
  game.entities[entity] |= Has.ControlPlayer;
};
