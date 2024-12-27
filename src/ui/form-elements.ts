import { STYLES } from '../constants';
import { createElement } from '../utils/dom';
import { createPhoneInput } from './form-elements/phone-input';

export function addInputField(
  form: HTMLFormElement,
  name: string,
  placeholder: string,
  required = false
): void {
  if (name === 'phone_number') {
    createPhoneInput(form, name, placeholder);
    return;
  }

  const wrapper = createElement('div', STYLES.inputWrapper);
  
  const input = createElement('input', STYLES.input, {
    type: 'text',
    id: `bynn-${name}`,
    name,
    required,
    placeholder
  });
  
  wrapper.appendChild(input);
  form.appendChild(wrapper);
}

export function createSubmitButton(text: string): HTMLButtonElement {
  return createElement('button', STYLES.submit, {
    type: 'submit',
    textContent: text
  });
}

export function createPoweredByText(): HTMLParagraphElement {
  const paragraph = createElement('p', STYLES.description);
  
  const bynnLink = createElement('a', '', {
    href: 'https://bynn.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    textContent: 'Bynn'
  });
  
  const postText = document.createTextNode(' provides identity verification solutions that enable businesses to seamlessly authenticate their users.');
  
  paragraph.append(bynnLink, postText);
  
  return paragraph;
}