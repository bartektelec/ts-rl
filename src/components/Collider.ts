import { Component } from '../core/Component';

export const Collider = (width: number, height: number = width) => {
  return new Component('collide', {
    width,
    height,
    left: false,
    right: false,
    top: false,
    bottom: false,
  });
};
