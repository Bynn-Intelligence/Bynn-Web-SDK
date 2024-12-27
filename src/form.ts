import { BynnParams, FormOptions } from './types';
import { STYLES, DEFAULT_TEXT } from './constants';

export function createForm(
  containerId: string,
  params: BynnParams,
  options: FormOptions
): HTMLFormElement {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Element ${containerId} does not exist`);
  }

  container.innerHTML = '';
  const form = document.createElement('form');
  form.className = STYLES.form;

  if (!params.person.givenName) {
    addInputField(form, 'givenName', 'Given name', true);
  }
  if (!params.person.lastName) {
    addInputField(form, 'lastName', 'Last name', true);
  }
  if (!params.vendorData) {
    addInputField(
      form,
      'vendorData',
      options.formLabel?.vendorData || 'Order number',
      true
    );
  }

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = STYLES.submit;
  submitBtn.textContent = options.submitBtnText || DEFAULT_TEXT.submitBtnText;
  form.appendChild(submitBtn);

  const poweredBy = document.createElement('p');
  poweredBy.className = STYLES.description;
  poweredBy.textContent = 'Bynn is an identity verification provider that helps companies connect with customers.';
  form.appendChild(poweredBy);

  container.appendChild(form);
  return form;
}

function addInputField(
  form: HTMLFormElement,
  name: string,
  label: string,
  required = false
): void {
  const wrapper = document.createElement('div');
  wrapper.className = STYLES.inputWrapper;

  const labelEl = document.createElement('label');
  labelEl.htmlFor = `bynn-${name}`;
  labelEl.className = STYLES.label;
  labelEl.textContent = label;
  wrapper.appendChild(labelEl);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = `bynn-${name}`;
  input.name = name;
  input.className = STYLES.input;
  input.required = required;
  input.placeholder = label;
  wrapper.appendChild(input);

  form.appendChild(wrapper);
}