import { createElement } from '../../utils/dom';
import { countries } from '../../utils/countries';
import { STYLES } from '../../constants';

export function createPhoneInput(form: HTMLFormElement, name: string, placeholder: string): void {
  const wrapper = createElement('div', STYLES.inputWrapper);
  wrapper.setAttribute('style', 'display: flex; gap: 0.5rem;');

  // Country code select
  const select = createElement('select', STYLES.input);
  select.setAttribute('style', 'width: 180px; flex-shrink: 0;');
  select.name = `${name}_country`;
  select.required = true;

  // Add countries to select
  countries.forEach(country => {
    const option = createElement('option', '', {
      value: country.dial_code,
      textContent: `${country.name} (${country.dial_code})`
    });
    
    // Set Sweden as default
    if (country.code === 'SE') {
      option.selected = true;
    }
    
    select.appendChild(option);
  });

  // Phone number input
  const input = createElement('input', STYLES.input);
  input.setAttribute('style', 'flex: 1;');
  input.type = 'tel';
  input.name = name;
  input.required = true;
  input.placeholder = placeholder;
  input.pattern = '[0-9]{6,14}';
  input.title = 'Please enter a valid phone number';

  wrapper.append(select, input);
  form.appendChild(wrapper);
}