import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GcLoginDialogComponent } from './login.dialog.component';
let GcLoginComponent = class GcLoginComponent {
    constructor(dialog, route, router) {
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        return;
    }
    ngOnInit() {
        const dialogRef = this.dialog.open(GcLoginDialogComponent, {
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
GcLoginComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-signin-dialog',
        template: '<div></div>'
    })
], GcLoginComponent);
export { GcLoginComponent };
//# sourceMappingURL=login.component.js.map