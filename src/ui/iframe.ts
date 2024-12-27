import { IframeOptions } from '../types';
import { createElement } from '../utils/dom';

export function createVerificationIframe(url: string, options: IframeOptions = {}): HTMLIFrameElement {
  const {
    width = '100%',
    height = '600px',
    className = 'bynn-iframe'
  } = options;

  return createElement('iframe', className, {
    src: url,
    width,
    height,
    frameBorder: '0',
    allow: 'camera *; microphone *'
  });
}