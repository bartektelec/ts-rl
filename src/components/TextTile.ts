import { Component } from '../core/Component';

export const TextTile = (text: string, font: string = '16px sans-serif') =>
  new Component('text-tile', { text, font });
