import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoginDialogComponent } from './login.dialog.component';
let LoginComponent = class LoginComponent {
    constructor(dialog, route, router) {
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        return;
    }
    ngOnInit() {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            autoFocus: true,
            width: '500px',
            height: '360px',
            data: null
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            console.log('returnUrl', returnUrl);
            if (returnUrl === undefined || returnUrl == null) {
                this.router.navigate(['/']);
            }
            this.router.navigate([returnUrl]);
        });
        return;
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signin-dialog',
        template: '<div></div>'
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map