import { Render } from '../components/com_draw';
import { FpsCounter } from '../components/com_fps';
import { Entity } from '../core/Entity';

export const sys_fps = (entities: Entity[]) => {
  for (const entity of entities) {
    console.log('checking entity', entity);

    if (!entity.has('fps') || !entity.has('draw')) continue;
    const com_fps = entity.uses.get('fps') as FpsCounter;
    const com_draw = entity.uses.get('draw') as Render;

    const now = performance.now();
    com_fps.count++;

    if (com_fps.last <= now - 1000) {
      com_draw.text = String(com_fps.count);
      com_fps.last = now;
      com_fps.count = 0;
    }
  }
};
