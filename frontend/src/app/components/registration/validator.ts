import {AbstractControl} from "@angular/forms";


export function passValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const confirmPasswordValue = control.value;

    const passControl = control.root.get('password'); // magic is this
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== confirmPasswordValue || passValue === '') {
        /*control.root.get('password').setErrors({
          error: true,
        });*/
        return {
          isError: true,
        };
      }
      /*else{
        control.root.get('password').setErrors({
          error: false,
        });
        control.root.get('confirmPassword').setErrors({
          error: false,
        });
        return {
          isError: false,
        };*/
      //}
    }
  }
  return null;
}
