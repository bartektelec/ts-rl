import { Collide } from '../components/Collide';
import { Draw } from '../components/Draw';
import { Label } from '../components/Label';
import { Move } from '../components/Move';
import { PlayerControl } from '../components/PlayerControl';

export const Player = [
  Label('player'),
  Move(),
  Draw(20, 20, '@', 'white'),
  Collide(20, 20),
  PlayerControl(),
];
