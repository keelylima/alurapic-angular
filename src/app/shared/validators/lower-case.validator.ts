import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {
  // diferente de branco
  if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
    return { lowerCase: true };
  }
  return null;
}
