import { FormControl, FormGroup } from '@angular/forms';

export function getFormattedPhoneNumber(phone: string): string {
  if (!phone) console.error('phone is null');
  const x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/) as any;
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
}

export function validateForm(form: FormGroup): boolean {
  const controls = Object.values(form.controls);
  controls.forEach(control => {
    control.markAsTouched();
    control.markAsDirty();
  });
  return form.valid;
}

export const RegExpConstants = {
  url: '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
  phone: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
  zipCode: '^[0-9]{5}(?:-[0-9]{4})?$',
  email: '^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
};

export function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
