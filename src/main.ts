import './style.css';
import { Game } from './core/Game';

const gameElement = document.querySelector('#game');

if (!gameElement) {
  alert('No canvas');
} else {
  new Game(gameElement as HTMLCanvasElement);
}
