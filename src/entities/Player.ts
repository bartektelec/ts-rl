import { Collider } from '../components/Collider';
import { Draw } from '../components/Draw';
import { Move } from '../components/Move';
import { Position } from '../components/Position';
import { TextTile } from '../components/TextTile';
import { Entity } from '../core/Entity';

export const player = new Entity().with(
  Position(0, 0),
  Draw(20, 20, 'white'),
  Move(),
  TextTile('@', '20px sans-serif'),
  Collider(20, 20)
);
