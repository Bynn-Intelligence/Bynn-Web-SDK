import { createElement } from '../../utils/dom';
    import { countries, Country } from '../../utils/countries';
    import { STYLES } from '../../constants';

    export async function createPhoneInput(form: HTMLFormElement, name: string, placeholder: string): Promise<void> {
      const wrapper = createElement('div', STYLES.inputWrapper);
      wrapper.setAttribute('style', 'display: flex; gap: 0.5rem;');

      // Country code select
      const select = createElement('select', STYLES.input);
      select.setAttribute('style', 'width: 180px; flex-shrink: 0;');
      select.name = `${name}_country`;
      select.required = true;

      let defaultCountry: Country | undefined;

      try {
        const response = await fetch('https://api.bynn.com/v1/echo');
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.your_country;
          defaultCountry = countries.find(country => country.code === countryCode);
        }
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }

      // Add countries to select
      countries.forEach(country => {
        const option = createElement('option', '', {
          value: country.dial_code,
          textContent: `${country.name} (${country.dial_code})`
        });

        // Set default country
        if (defaultCountry && country.code === defaultCountry.code) {
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
