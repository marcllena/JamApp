import {AbstractControl} from "@angular/forms";


export function passValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const confirmPasswordValue = control.value;

    const passControl = control.root.get('password'); // magic is this
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== confirmPasswordValue || passValue === '') {
        return {
          isError: true
        };
      }
    }
  }

  return null;
}
