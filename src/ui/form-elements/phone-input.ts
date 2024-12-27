import { createElement } from '../../utils/dom';
import { countries } from '../../utils/countries';
import { STYLES } from '../../constants';

export function createPhoneInput(form: HTMLFormElement, name: string, placeholder: string): void {
  const wrapper = createElement('div', STYLES.inputWrapper);
  wrapper.style.display = 'flex';
  wrapper.style.gap = '0.5rem';

  // Country code select
  const select = createElement('select', STYLES.input, {
    name: `${name}_country`,
    required: true,
    style: 'width: 180px; flex-shrink: 0;'
  });

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
  const input = createElement('input', STYLES.input, {
    type: 'tel',
    name,
    required: true,
    placeholder,
    pattern: '[0-9]{6,14}',
    title: 'Please enter a valid phone number',
    style: 'flex: 1;'
  });

  wrapper.append(select, input);
  form.appendChild(wrapper);
}