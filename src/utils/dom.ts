import { STYLES } from '../constants';

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  attributes: Partial<HTMLElementTagNameMap[K]> = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  Object.assign(element, attributes);
  return element;
}

export function getContainer(containerId: string): HTMLElement {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Element ${containerId} does not exist`);
  }
  return container;
}
