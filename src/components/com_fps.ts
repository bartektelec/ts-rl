import { Component } from '../core/Component';

export class FpsCounter implements Component {
  type = 'fps';
  last: number;
  count: number;

  constructor() {
    this.last = 0;
    this.count = 0;
  }
}
