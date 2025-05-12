import '../../styles/modal.css';
import { createElement } from '../../utils/dom';

export function createModal(): {
  modalElement: HTMLDivElement;
  closeModal: () => void;
} {
  // Create overlay
  const overlay = createElement('div', 'bynn-modal-overlay');

  // Create modal container
  const container = createElement('div', 'bynn-modal-container');

  // Create content wrapper
  const content = createElement('div', 'bynn-modal-content');

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';

  container.append(content);
  overlay.appendChild(container);

  let clickHandler: ((event: MouseEvent) => void) | null = null;

  const closeModal = () => {
    if (clickHandler) {
      overlay.removeEventListener('click', clickHandler);
      clickHandler = null;
    }

    overlay.remove();

    document.body.style.overflow = '';
  };

  clickHandler = (event: MouseEvent) => {
    if (event.target === overlay) {
      closeModal();
    }
  };

  overlay.addEventListener('click', clickHandler);

  return { modalElement: overlay, closeModal };
}
