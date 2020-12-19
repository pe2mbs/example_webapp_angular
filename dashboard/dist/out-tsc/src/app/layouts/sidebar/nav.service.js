import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let NavService = class NavService {
    constructor(http) {
        this.http = http;
        return;
    }
    menuItems() {
        return (this.http.get(environment.apiUrl + '/menu'));
    }
};
NavService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], NavService);
export { NavService };
//# sourceMappingURL=nav.service.js.map