import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nonZero() : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = <number>control.value;
        if(value == 0){
            return {
                nonZero: {
                    message: 'Il valore non deve essere zero'
                }
            }
        }
        return null;
    }
}