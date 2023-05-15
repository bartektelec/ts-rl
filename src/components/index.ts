import { Game } from '../core/Game';

export enum Has {
  Collide = 1,
  Label,
  Draw,
  Move,
  ControlPlayer,
  AI,
}

export type Component = (game: Game, entity: number) => void;
