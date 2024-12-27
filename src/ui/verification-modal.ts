import { IframeOptions } from '../types';
import { createModal } from './modal/modal';
import { createVerificationIframe } from './iframe';

export function showVerificationModal(url: string, iframeOptions: IframeOptions = {}): void {
  const modal = createModal();
  const content = modal.querySelector('.bynn-modal-content');
  
  if (content) {
    const iframe = createVerificationIframe(url, {
      ...iframeOptions,
      width: '100%',
      height: '100%'
    });
    
    content.appendChild(iframe);
  }
  
  document.body.appendChild(modal);
}