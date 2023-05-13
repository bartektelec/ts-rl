import { Component } from './Component';

export class Entity {
  uses = new Map<string, Component>();

  constructor() {}

  with(x: Component) {
    this.uses.set(x.type, x);
    return this;
  }

  has(signature: string) {
    return this.uses.has(signature);
  }
}
