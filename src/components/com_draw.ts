import { BaseComponent } from '../core/Component';

export class Render implements BaseComponent {
  public type: string = 'draw';

  constructor(
    public text: string,
    public x: number,
    public y: number,
    public style: string = 'white',
    public font: string = '16px sans-serif'
  ) {}
}
