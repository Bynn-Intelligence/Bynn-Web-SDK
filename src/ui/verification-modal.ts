import { IframeOptions, BynnConfig, VerificationMessage } from '../types';
import { createModal } from './modal/modal';
import { createElement } from '../utils/dom';
import { applyStyles } from '../utils/styles';

export function showVerificationModal(
    url: string,
    session_id: string,
    config: BynnConfig,
    iframeOptions: IframeOptions = {}
): void {
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

    // Create iframe wrapper for better control
    const wrapper = createElement('div', 'bynn-iframe-wrapper');

    // Message handler for both resize and verification status
    const handleMessage = (event: MessageEvent) => {
      try {
        console.log('Received message:', event.data, 'from origin:', event.origin);

        // Verify origin matches the iframe URL origin for security
        const iframeOrigin = new URL(url).origin;
        if (event.origin !== iframeOrigin) {
          console.log('Origin mismatch. Expected:', iframeOrigin, 'Received:', event.origin);
          return;
        }

        if (!event.data || typeof event.data !== 'object') return;

        // Check if we're on mobile
        const isMobile = window.innerWidth <= 640;

        // Handle resize message (only for non-mobile)
        if (event.data.type === 'resize' && !isMobile) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Handle width resize
          if (typeof event.data.width === 'number') {
            const maxWidth = Math.min(960, Math.floor(viewportWidth * 0.95));
            const finalWidth = Math.min(event.data.width, maxWidth);

            iframe.style.width = `${finalWidth}px`;
            iframe.style.transition = 'width 200ms ease';

            // Update modal container width
            const modalContainer = document.querySelector('.bynn-modal-container');
            if (modalContainer instanceof HTMLElement) {
              modalContainer.style.width = `${finalWidth}px`;
              modalContainer.style.transition = 'width 200ms ease';
            }
          }

          // Handle height resize
          if (typeof event.data.height === 'number') {
            const maxHeight = Math.floor(viewportHeight * 0.9);
            const finalHeight = Math.min(event.data.height, maxHeight);

            iframe.style.height = `${finalHeight}px`;
            iframe.style.transition = 'height 200ms ease';

            // Update modal container height
            const modalContainer = document.querySelector('.bynn-modal-container');
            if (modalContainer instanceof HTMLElement) {
              modalContainer.style.height = `${finalHeight}px`;
              modalContainer.style.transition = 'height 200ms ease';
            }
          }
        }

        // Handle verification status message
        if (event.data.type === 'bynn-verification') {
          console.log('Received verification message:', event.data);

          const data = event.data as VerificationMessage;
          console.log('Processing verification status:', data.status);

          switch (data.status) {
            case 'timeout':
              if (config.onTimeout) {
                config.onTimeout(session_id);
              }
              modal.remove();
              break;
            case 'cancel':
              if (config.onCancel) {
                config.onCancel(session_id);
              }
              modal.remove();
              break;
            case 'complete':
              if (config.onComplete) {
                config.onComplete(session_id);
              }
              modal.remove();
              break;
            case 'error':
              if (config.onError) {
                config.onError(session_id, data.error || 'Unknown error');
              }
              break;
            case 'start':
              if (config.onStart) {
                config.onStart(data.sessionId || session_id);
              }
              break;
          }
        }
      } catch (error) {
        console.error('Error handling iframe message:', error);
      }
    };

    const iframe = createElement('iframe', 'bynn-iframe', {
      src: url,
      width: '100%',
      height: '100%',
      frameBorder: '0',
      allow: 'camera *; microphone *'
    });

    window.addEventListener('message', handleMessage);

    // Clean up listener when iframe is removed
    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
    };

    iframe.addEventListener('remove', cleanup);
    window.addEventListener('unload', cleanup);

    // Handle modal close button
    const closeButton = modal.querySelector('.bynn-modal-close');
    if (closeButton) {
      const originalOnClick = closeButton.onclick;
      closeButton.onclick = (e: MouseEvent) => {
        if (typeof originalOnClick === 'function') {
          originalOnClick.call(closeButton, e);
        }
        if (config.onCancel) {
          config.onCancel(session_id);
        }
        cleanup();
      };
    }

    // Add iframe to wrapper, then wrapper to content
    wrapper.appendChild(iframe);
    content.appendChild(wrapper);
  }

  document.body.appendChild(modal);
}
