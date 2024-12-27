import { MODAL_STYLES } from './styles';
import { createElement } from '../../utils/dom';

export function createModal(): HTMLDivElement {
  // Create overlay
  const overlay = createElement('div', MODAL_STYLES.overlay);
  
  // Create modal container
  const container = createElement('div', MODAL_STYLES.container);
  
  // Create content wrapper
  const content = createElement('div', MODAL_STYLES.content);
  
  // Create close button
  const closeButton = createElement('button', MODAL_STYLES.closeButton, {
    innerHTML: '&times;',
    onclick: () => {
      overlay.remove();
      document.body.style.overflow = 'auto';
    }
  });

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  container.append(closeButton, content);
  overlay.appendChild(container);
  
  return overlay;
}