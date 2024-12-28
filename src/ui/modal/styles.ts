import { MODAL_CONFIG } from './config';

export const MODAL_STYLES = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    zIndex: MODAL_CONFIG.zIndex.overlay.toString(),
    backdropFilter: 'blur(8px)'
  },
  container: {
    position: 'relative',
    width: '95%',
    maxWidth: '960px',
    maxHeight: '90vh',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: `modalEnter ${MODAL_CONFIG.animation.duration} ${MODAL_CONFIG.animation.timing}`
  },
  content: {
    height: '100%',
    padding: '1.5rem',
    overflow: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    width: '32px',
    height: '32px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    color: 'var(--neutral-600)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: MODAL_CONFIG.zIndex.closeButton.toString()
  }
};
