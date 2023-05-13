import { Component } from '../core/Component';

export const Draw = (
  width: number,
  height: number,
  fillStyle: string = 'white'
) => new Component('draw', { width, height, fillStyle });
