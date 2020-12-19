import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let SpinnerService = class SpinnerService {
    constructor() {
        this.visibility = new BehaviorSubject(false);
        return;
    }
    show() {
        this.visibility.next(true);
        return;
    }
    hide() {
        this.visibility.next(false);
        return;
    }
};
SpinnerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SpinnerService);
export { SpinnerService };
//# sourceMappingURL=spinner-service.js.map