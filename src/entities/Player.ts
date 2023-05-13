import { Entity } from '../core/Entity';
import { Render } from '../components/com_draw';

export const player = new Entity().with(new Render('@', 0, 0));
