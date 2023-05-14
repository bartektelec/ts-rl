import { Has } from ".";
import type { Component } from ".";

export interface Draw {
  width: number;
  height: number;
  sprite: string;
  color: string;
}

export const Draw = (width: number, height: number, sprite: string; color: string = "white"): Component =>
  (game,entity) => {
  game.entities[entity] |= Has.Draw;

  game.draw[entity] = {
    width,
    height,
    sprite,
    color
  }
}
