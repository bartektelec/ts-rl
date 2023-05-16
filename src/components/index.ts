import { Game } from '../core/Game';

export enum Has {
  Collide = 1,
  Label = 2,
  Draw = 4,
  Move = 8,
  ControlPlayer = 16,
  AI = 32,
}

export type Component = (game: Game, entity: number) => void;
