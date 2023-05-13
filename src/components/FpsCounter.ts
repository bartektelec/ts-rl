import { Component } from '../core/Component';

export const FpsCounter = () =>
  new Component('fps-counter', {
    count: 0,
    last: performance.now(),
  });
