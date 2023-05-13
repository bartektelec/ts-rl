import { Position } from '../components/Position';
import { Entity } from '../core/Entity';
import { TextTile } from '../components/TextTile';
import { FpsCounter } from '../components/FpsCounter';
import { Draw } from '../components/Draw';

export const fpsCounter = new Entity().with(
  Position(5, 20),
  TextTile('', '16px monospace'),
  FpsCounter(),
  Draw(15, 15, 'yellow')
);
