import { COLORS } from '../styles/theme';
import { createModal } from '../modal/modal';
import { createElement } from '../../utils/dom';

export function showErrorModal(message: string): void {
  const modal = createModal();
  const content = modal.querySelector('.bynn-modal-content');
  
  if (content) {
    const alert = createElement('div', 'bynn-error-alert');
    alert.setAttribute('style', `
      background-color: ${COLORS.error.light};
      color: ${COLORS.error.text};
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
    `);
    
    const text = createElement('p', '', {
      textContent: message
    });
    
    alert.appendChild(text);
    content.appendChild(alert);
  }
  
  document.body.appendChild(modal);
}