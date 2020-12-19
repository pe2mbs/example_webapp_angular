import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let TokenInterceptorService = class TokenInterceptorService {
    constructor(authService) {
        this.authService = authService;
        console.log('TokenInterceptorService.constructor()');
        return;
    }
    intercept(req, next) {
        let newHeaders = req.headers.set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        console.log('TokenInterceptorService.intercept()');
        if (this.authService.isLoggedIn()) {
            console.log('TokenInterceptorService.intercept() with token');
            newHeaders = newHeaders.set('Authorization', 'Bearer ' + this.authService.token);
        }
        else {
            // Als we niet ingelogd zijn dan ook het token niet meesturen.
            console.log('TokenInterceptorService.intercept() without token');
        }
        return next.handle(req.clone({ headers: newHeaders }));
    }
};
TokenInterceptorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TokenInterceptorService);
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map