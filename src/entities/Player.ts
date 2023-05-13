import { Draw } from '../components/Draw';
import { Position } from '../components/Position';
import { TextTile } from '../components/TextTile';
import { Entity } from '../core/Entity';

export const player = new Entity().with(
  Position(0, 0),
  Draw(10, 10, 'white'),
  TextTile('@')
);
