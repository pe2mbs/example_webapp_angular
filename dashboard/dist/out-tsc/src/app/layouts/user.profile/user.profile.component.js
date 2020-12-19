import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let UserProfileComponent = class UserProfileComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        console.log("UserProfileComponent.constructor", this.auth);
        return;
    }
    ngOnInit() {
        console.log("UserProfileComponent.ngOnInit", this.auth);
        return;
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['\login']);
    }
};
UserProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-profile',
        templateUrl: './user.profile.component.html',
        styleUrls: ['./user.profile.component.scss']
    })
], UserProfileComponent);
export { UserProfileComponent };
//# sourceMappingURL=user.profile.component.js.map