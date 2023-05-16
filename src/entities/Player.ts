import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Label } from '../components/Label';
import { Move } from '../components/Move';
import { PlayerControl } from '../components/PlayerControl';

export const Player = (x: number, y: number) => [
  Label('player'),
  Move(),
  Draw(x, y, '@', 'white'),
  Collide(20, 20),
  PlayerControl(),
];
