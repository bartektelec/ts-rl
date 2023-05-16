import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';

export const Wall = (x: number, y: number) => [
  Draw(x, y, 'X'),
  Collide(20, 20),
];
