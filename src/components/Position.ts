import { Component } from '../core/Component';

export const Position = (x: number, y: number) =>
  new Component('position', { x, y });
