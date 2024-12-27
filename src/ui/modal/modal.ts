import { MODAL_STYLES } from './styles';
import { createElement } from '../../utils/dom';
import { applyStyles } from '../../utils/styles';

export function createModal(): HTMLDivElement {
  // Create overlay
  const overlay = createElement('div', 'bynn-modal-overlay');
  applyStyles(overlay, MODAL_STYLES.overlay);
  
  // Create modal container
  const container = createElement('div', 'bynn-modal-container');
  applyStyles(container, MODAL_STYLES.container);
  
  // Create content wrapper
  const content = createElement('div', 'bynn-modal-content');
  applyStyles(content, MODAL_STYLES.content);
  
  // Create close button
  const closeButton = createElement('button', 'bynn-modal-close', {
    innerHTML: '&times;',
    onclick: () => {
      overlay.remove();
      document.body.style.overflow = 'auto';
    }
  });
  applyStyles(closeButton, MODAL_STYLES.closeButton);

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  container.append(closeButton, content);
  overlay.appendChild(container);
  
  return overlay;
}