import { Render } from '../components/com_draw';
import { FpsCounter } from '../components/com_fps';
import { Entity } from '../core/Entity';

export const fps = new Entity()
  .with(new FpsCounter())
  .with(new Render('', 5, 18, 'yellow', '18px monospace'));
