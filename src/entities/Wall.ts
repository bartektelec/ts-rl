import { Collider } from '../components/Collider';
import { Draw } from '../components/Draw';
import { Position } from '../components/Position';
import { TextTile } from '../components/TextTile';
import { Entity } from '../core/Entity';

export const Wall = new Entity().with(
  TextTile('X', '20px white'),
  Draw(20, 20),
  Position(40, 50),
  Collider(20, 20)
);
