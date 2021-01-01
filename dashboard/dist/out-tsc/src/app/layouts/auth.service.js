import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { isNullOrUndefined } from 'util';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.changeEvent = new EventEmitter();
        this.jwtHelper = new JwtHelperService();
        if (this.isLoggedIn()) {
            this.currentUser = this.jwtHelper.decodeToken(this.token);
        }
        return;
    }
    login(credentials) {
        return (this.http.post('/api/users/authenticate', JSON.stringify(credentials)).pipe(map(response => {
            if (response && response.result) {
                localStorage.setItem('token', response.token);
                this.currentUser = this.jwtHelper.decodeToken(response.token);
                this.changeEvent.emit(this);
                return (true);
            }
            else {
                return (false);
            }
        })));
    }
    signup(data) {
        return (this.http.post('/api/users/signup', JSON.stringify(data)).pipe(map(response => {
            return (response && response.result);
        })));
    }
    logout() {
        localStorage.removeItem('token');
        this.currentUser = null;
        this.changeEvent.emit(this);
        return;
    }
    isLoggedIn() {
        const token = this.token;
        if (!token) {
            return (false);
        }
        const result = this.jwtHelper.isTokenExpired(token);
        return (!result);
    }
    get userName() {
        if (isNullOrUndefined(this.currentUser)) {
            return ('');
        }
        return (this.currentUser.username);
    }
    get fullName() {
        if (isNullOrUndefined(this.currentUser)) {
            return ('');
        }
        return (this.currentUser.fullname);
    }
    get token() {
        return (localStorage.getItem('token'));
    }
};
AuthService = tslib_1.__decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map