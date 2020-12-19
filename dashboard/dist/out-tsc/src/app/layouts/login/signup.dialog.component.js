import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
let SignupDialogComponent = class SignupDialogComponent {
    constructor(dialogRef, data, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.showPw = false;
        dialogRef.disableClose = true;
        this.signupForm = this.fb.group({
            userid: new FormControl('', [Validators.required, Validators.minLength(7)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            middlename: new FormControl(''),
            lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        });
        return;
    }
    get userid() {
        return this.signupForm.get('userid');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get firstname() {
        return this.signupForm.get('firstname');
    }
    get middlename() {
        return this.signupForm.get('middlename');
    }
    get lastname() {
        return this.signupForm.get('lastname');
    }
    onSignupClick() {
        // Here we need to send the information to the server 
        // When ever the data matches but the password failed
        // The server application sends a e-mail to the user 
        // with a new password, which he/she must change on first 
        // login.
        const signupData = {
            username: this.userid.value,
            password: this.password.value,
            email: this.email.value,
            firstname: this.firstname.value,
            middlename: this.middlename.value,
            lastname: this.lastname.value
        };
        this.dialogRef.close(signupData);
        return;
    }
    onCancelClick() {
        this.dialogRef.close(null);
        return;
    }
};
SignupDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signup',
        templateUrl: 'signup.dialog.component.html',
        styles: ['.form-field { width: 100%; }',
            '.login-form { height: 570px; }']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], SignupDialogComponent);
export { SignupDialogComponent };
//# sourceMappingURL=signup.dialog.component.js.map