import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let UserProfileService = class UserProfileService {
    constructor(http) {
        this.http = http;
        this.api = '/api/gn_user/profile';
        this.internalData = {};
        http.get(this.api).subscribe(data => {
            this.internalData = data;
        });
        return;
    }
    updateToServer() {
        this.http.post(this.api, this.internalData).subscribe(result => {
            console.log("updateToServer done");
        });
        return;
    }
    getVariable(component, variable, default_value = null) {
        const name = component + '.' + variable;
        if (this.internalData[name] !== undefined || this.internalData[name] != null) {
            return (this.internalData[name]);
        }
        return (default_value);
    }
    setVariable(component, variable, value) {
        this.internalData[component + '.' + variable] = value;
        this.updateToServer();
        return;
    }
    // Public member functions for TableComponent
    getComponentSize(name) {
        return this.getVariable(name, 'size', 10);
    }
    setComponentSize(name, size) {
        this.setVariable(name, 'size', size);
        return;
    }
    getComponentIndex(name) {
        return this.getVariable(name, 'index', 1);
    }
    setComponentIndex(name, size) {
        this.setVariable(name, 'index', size);
        return;
    }
    getComponentFilter(name) {
        return this.getVariable(name, 'filter', '');
    }
    setComponentFilter(name, filter) {
        this.setVariable(name, 'filter', filter);
        return;
    }
};
UserProfileService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], UserProfileService);
export { UserProfileService };
//# sourceMappingURL=user.profile.service.js.map