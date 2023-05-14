import { TextTile } from '../components/TextTile';
import { FpsCounter } from '../components/FpsCounter';
import { Entity } from '../core/Entity';
import { Game } from '../core/Game';

const getFpsEntity = (e: Entity) => {
  const fps = e.get(FpsCounter);
  const text = e.get(TextTile);

  if (!fps || !text) return null;
  return { fps, text };
};

export const sys_fps = (world: Game) => {
  const entities = world.query(FpsCounter);

  for (const entity of entities) {
    const target = getFpsEntity(entity);
    if (!target) continue;

    const now = performance.now();
    target.fps.data.count++;

    if (target.fps.data.last < now - 1000) {
      target.text.data.text = String(target.fps.data.count);
      target.fps.data.last = now;
      target.fps.data.count = 0;
    }
  }
};
