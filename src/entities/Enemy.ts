import { AI } from '../components/AI';
import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Move } from '../components/Move';

export const Enemy = (x: number, y: number) => [
  Move(),
  AI,
  Draw(x, y, 'A', 'red'),
  Collide(20, 20),
];
