import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let GcHelpService = class GcHelpService {
    constructor(httpSession) {
        this.httpSession = httpSession;
        return;
    }
    getHelp(name, fallback) {
        return (this.httpSession.get('/api/help/' + name));
    }
};
GcHelpService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GcHelpService);
export { GcHelpService };
//# sourceMappingURL=service.service.js.map