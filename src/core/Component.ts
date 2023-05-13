export class Component<T> {
  constructor(public label: string, public data: T) {}

  is(x: Component<unknown>): x is Component<T> {
    return x['label'] === this.label;
  }
}
