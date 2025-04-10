import '../../styles/modal.css';
import { createElement } from '../../utils/dom';

export function createModal(): HTMLDivElement {
  // Create overlay
  const overlay = createElement('div', 'bynn-modal-overlay');

  // Create modal container
  const container = createElement('div', 'bynn-modal-container');

  // Create content wrapper
  const content = createElement('div', 'bynn-modal-content');

  // Create close button
  const closeButton = createElement('button', 'bynn-modal-close', {
    innerHTML: '×',
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
