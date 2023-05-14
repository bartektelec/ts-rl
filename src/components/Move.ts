import { Component } from '../core/Component';

export const Move = () =>
  new Component('move', {
    last: performance.now(),
    keys: {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    },
  });
