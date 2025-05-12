import { FormOptions, FormField } from '../types';
    import { STYLES } from '../constants';
    import { createElement, getContainer } from '../utils/dom';
    import { addInputField, createSubmitButton, createPoweredByText } from './form-elements';

    export async function createVerificationForm(
      containerId: string,
      options: FormOptions,
      fields: FormField[]
    ): Promise<HTMLFormElement> {
      const container = getContainer(containerId);

      container.classList.add('data-bynn-sdk');

      container.innerHTML = '';
      
      const form = createElement('form', STYLES.form);
      
      // Add fields based on configuration
      for (const field of fields) {
        if (field.visible !== false) {
          // Only add visible fields to the form
          await addInputField(form, field.name, field.label || formatFieldLabel(field.name), true);
        } else {
          // Add hidden fields with values
          const hiddenInput = createElement('input', '', {
            type: 'hidden',
            name: field.name,
            value: field.value || ''
          });
          form.appendChild(hiddenInput);
        }
      }

      const submitBtn = createSubmitButton(options.submitBtnText || 'Start Verification');
      const poweredBy = createPoweredByText();
      
      form.append(submitBtn, poweredBy);
      container.appendChild(form);
      return form;
    }

    function formatFieldLabel(fieldName: string): string {
      return fieldName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
