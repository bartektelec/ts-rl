import { Render } from '../components/com_draw';
import { Entity } from '../core/Entity';

export const sys_render = (
  entities: Entity[],
  ctx: CanvasRenderingContext2D
) => {
  for (const entity of entities) {
    if (entity.has('draw')) {
      const com = entity.uses.get('draw') as Render;

      ctx.fillStyle = 'white';
      ctx.font = com.font;
      ctx.fillStyle = com.style;
      ctx.fillText(com.text, com.x, com.y);
    }
  }
};
