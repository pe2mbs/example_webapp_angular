import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
let CustomHttpInterceptor = class CustomHttpInterceptor {
    constructor(spinnerService) {
        this.spinnerService = spinnerService;
        this.counter = 0;
    }
    intercept(req, next) {
        this.counter++;
        this.spinnerService.show();
        return next
            .handle(req)
            .pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.counter--;
                if (this.counter === 0) {
                    this.spinnerService.hide();
                }
            }
        }, (error) => {
            this.counter--;
            if (this.counter === 0) {
                this.spinnerService.hide();
            }
        }));
    }
};
CustomHttpInterceptor = tslib_1.__decorate([
    Injectable()
], CustomHttpInterceptor);
export { CustomHttpInterceptor };
//# sourceMappingURL=http-interceptor.js.map