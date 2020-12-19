import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let HelpService = class HelpService {
    constructor(httpSession) {
        this.httpSession = httpSession;
        return;
    }
    getHelp(name, fallback) {
        return (this.httpSession.get('/api/help/' + name));
    }
};
HelpService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], HelpService);
export { HelpService };
//# sourceMappingURL=service.service.js.map