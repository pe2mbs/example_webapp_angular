import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.jwtHelper = new JwtHelperService();
        if (this.isLoggedIn()) {
            this.currentUser = this.jwtHelper.decodeToken(this.token);
            this._userName = this.currentUser.username;
            this._userProfile = this.currentUser.profile;
            this._userRole = this.currentUser.userrole;
        }
        return;
    }
    login(credentials) {
        return (this.http.post('/api/users/authenticate', JSON.stringify(credentials)).pipe(map(response => {
            if (response && response.result) {
                localStorage.setItem('token', response.token);
                this.currentUser = this.jwtHelper.decodeToken(response.token);
                this._userName = this.currentUser.username;
                this._userProfile = this.currentUser.profile;
                this._userParameters = this.currentUser.parameters;
                this._userRole = this.currentUser.userrole;
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
        return this._userName;
    }
    get userProfile() {
        return this._userProfile;
    }
    get userProfileParmeters() {
        return (this._userParameters);
    }
    get userRole() {
        return this._userRole;
    }
    get fullName() {
        if (!this.token) {
            return (false);
        }
        const jsonToken = this.jwtHelper.decodeToken(this.token);
        return (jsonToken.fullname);
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