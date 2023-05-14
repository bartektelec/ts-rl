import { Game } from '../core/Game';

export enum Has {
  Collide = 1,
  Label,
  Draw,
}

export type Component = (game: Game, entity: number) => void;
