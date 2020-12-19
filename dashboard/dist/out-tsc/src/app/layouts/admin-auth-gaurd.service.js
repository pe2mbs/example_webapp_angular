import * as tslib_1 from "tslib";
import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
let AdminAuthGuard = class AdminAuthGuard extends AuthGuard {
    canActivate() {
        console.log('AdminAuthGuard.canActivate()');
        const isAuthenticated = super.canActivate();
        if (!isAuthenticated) {
            console.log('false');
            return (false);
        }
        if (this.authService.currentUser.admin) {
            console.log('true');
            return (true);
        }
        console.log('false - no access');
        this.router.navigate(['/no-access']);
        return false;
    }
};
AdminAuthGuard = tslib_1.__decorate([
    Injectable()
], AdminAuthGuard);
export { AdminAuthGuard };
//# sourceMappingURL=admin-auth-gaurd.service.js.map