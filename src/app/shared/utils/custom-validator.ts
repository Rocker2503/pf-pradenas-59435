import { Validators } from "@angular/forms";

export const nameValidator = Validators.compose([
    Validators.required, Validators.minLength(3), Validators.pattern(new RegExp(/^[a-zA-Z ]+$/))
]);

export const emailValidator = Validators.compose([
    Validators.required, Validators.minLength(5), Validators.pattern(new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))
]);