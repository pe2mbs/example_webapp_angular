import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        console.log('AuthGuard.constructor()');
        return;
    }
    canActivate() {
        console.log('AuthGuard.canActivate()');
        if (this.authService.isLoggedIn()) {
            console.log('true');
            return (true);
        }
        console.log('false - login');
        this.router.navigate(['/login']);
        return (false);
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth-guard.service.js.map