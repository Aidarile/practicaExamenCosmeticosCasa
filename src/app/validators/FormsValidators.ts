import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidators {
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
        if((control.value != null) && (control.value.trim().length == 0)){
            return {notOnlyWhiteSpace: true}
        } else  {
            return null;
        }
    }

    static allowedData(files: RegExp): ValidatorFn {
        return (ControlContainer: AbstractControl): ValidationErrors | null => {
            const allowed = files.test(ControlContainer.value)
            return allowed? null : {allowedFiles: true}
        }
    }

    static forbiddenNameValidator(nameRe: RegExp): ValidatorFn{
        return(control: AbstractControl): ValidationErrors | null => {
         const forbidden = nameRe.test(control.value);
         return forbidden ? {forbiddenName: true} : null }}
}