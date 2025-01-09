import { IframeOptions } from '../types';
import { createModal } from './modal/modal';
import { createElement } from '../utils/dom';
import { applyStyles } from '../utils/styles';

function createVerificationIframe(url: string, options: IframeOptions = {}): HTMLIFrameElement {
  const {
    width = '100%',
    height = '80vh',
    className = 'bynn-iframe'
  } = options;

  const iframe = createElement('iframe', className, {
    src: url,
    width,
    height,
    frameBorder: '0',
    allow: 'camera *; microphone *'
  });

  // Add message listener for iframe resizing
  const handleMessage = (event: MessageEvent) => {
    try {
      // Verify origin matches the iframe URL origin for security
      const iframeOrigin = new URL(url).origin;
      if (event.origin !== iframeOrigin) return;

      // Handle resize message from child frame
      if (
          event.data &&
          typeof event.data === 'object' &&
          event.data.type === 'resize'
      ) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        if (typeof event.data.width === 'number') {
          const maxWidth = Math.min(960, Math.floor(viewportWidth * 0.95));
          const finalWidth = Math.min(event.data.width, maxWidth);

          applyStyles(iframe, {
            width: `${finalWidth}px`,
            transition: 'width 200ms ease'
          });

          // Update modal container width
          const modalContainer = document.querySelector('.bynn-modal-container');
          if (modalContainer instanceof HTMLElement) {
            applyStyles(modalContainer, {
              width: `${finalWidth}px`,
              transition: 'width 200ms ease'
            });
          }

          // Center the iframe
          if (iframe.parentElement instanceof HTMLElement) {
            applyStyles(iframe.parentElement, {
              display: 'flex',
              justifyContent: 'center'
            });
          }
        }
      }
    } catch (error) {
      console.error('Error handling iframe message:', error);
    }
  };

  window.addEventListener('message', handleMessage);

  // Clean up listener when iframe is removed
  const cleanup = () => {
    window.removeEventListener('message', handleMessage);
  };

  iframe.addEventListener('remove', cleanup);
  window.addEventListener('unload', cleanup);

  return iframe;
}

export function showVerificationModal(url: string, iframeOptions: IframeOptions = {}): void {
  const modal = createModal();
  const content = modal.querySelector('.bynn-modal-content');

  if (content && content instanceof HTMLElement) {
    applyStyles(content, {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '90vh',
      position: 'relative'
    });

    const iframe = createVerificationIframe(url, {
      ...iframeOptions,
      width: '100%',
      height: '100%',
      className: 'bynn-iframe'
    });

    content.appendChild(iframe);
  }

  document.body.appendChild(modal);
}
