import { Component } from './Component';

export class Entity {
  uses: Component<unknown>[] = [];

  constructor() {}

  with(...xs: Component<unknown>[]) {
    for (const x of xs) {
      this.uses.push(x);
    }

    return this;
  }

  has(query: (...args: any[]) => Component<unknown>) {
    const { label } = query();

    return this.uses.some((x) => x.label === label);
  }

  get<T extends (...args: any[]) => Component<unknown>>(
    query: T
  ): ReturnType<T> | undefined {
    const { label } = query();
    return this.uses.find((x) => x.label === label) as
      | ReturnType<T>
      | undefined;
  }
}
