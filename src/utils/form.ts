import { STYLES } from '../constants';
import { createElement } from './dom';

export function addInputField(
  form: HTMLFormElement,
  name: string,
  label: string,
  required = false
): void {
  const wrapper = createElement('div', STYLES.inputWrapper);
  
  const labelEl = createElement('label', STYLES.label, {
    htmlFor: `bynn-${name}`,
    textContent: label
  });
  
  const input = createElement('input', STYLES.input, {
    type: 'text',
    id: `bynn-${name}`,
    name,
    required,
    placeholder: label
  });
  
  wrapper.append(labelEl, input);
  form.appendChild(wrapper);
}

export function createSubmitButton(text: string): HTMLButtonElement {
  return createElement('button', STYLES.submit, {
    type: 'submit',
    textContent: text
  });
}

export function createPoweredByText(): HTMLParagraphElement {
  return createElement('p', STYLES.description, {
    textContent: 'Bynn is an identity verification provider that helps companies connect with customers.'
  });
}