import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { GcSignupDialogComponent } from './signup.dialog.component';
let GcLoginDialogComponent = class GcLoginDialogComponent {
    constructor(dialogRef, data, fb, authService, signupDialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.authService = authService;
        this.signupDialog = signupDialog;
        this.showPw = false;
        dialogRef.disableClose = true;
        this.loginForm = this.fb.group({
            userid: new FormControl('', [Validators.required, Validators.minLength(7)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            keepSignedIn: new FormControl()
        });
        return;
    }
    onSignupClick() {
        const signupDialogRef = this.signupDialog.open(GcSignupDialogComponent, {
            autoFocus: true,
            width: '400px',
            height: 'auto',
            data: null
        });
        signupDialogRef.afterClosed().subscribe((result) => {
            this.authService.signup(result).subscribe();
        });
    }
    onLogonClick() {
        const credentials = {
            userid: this.loginForm.value.userid,
            password: this.loginForm.value.password,
            keepsignedin: this.loginForm.value.keepSignedIn
        };
        this.authService.login(credentials).subscribe(result => {
            if (result) {
                this.dialogRef.close();
            }
            else {
                this.invalidLogin = true;
            }
        }, err => {
            this.invalidLogin = true;
        });
        return;
    }
    get userid() {
        return this.loginForm.get('userid');
    }
    get password() {
        return this.loginForm.get('password');
    }
};
GcLoginDialogComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-login-dialog',
        templateUrl: 'login.dialog.component.html',
        styles: ['.form-field { width: 100%; }',
            '.login-form { height: 170px; }']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], GcLoginDialogComponent);
export { GcLoginDialogComponent };
//# sourceMappingURL=login.dialog.component.js.map