import * as tslib_1 from "tslib";
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
let HeaderComponent = class HeaderComponent {
    constructor() {
        // tslint:disable-next-line:no-output-on-prefix
        this.onToggleSidebar = new EventEmitter();
        this.headerTitle = 'Application';
        this.headerLogo = 'logo.png';
        if (environment.headerTitle !== undefined && environment.headerTitle != null) {
            this.headerTitle = environment.headerTitle;
        }
        if (environment.headerLogo !== undefined && environment.headerLogo != null) {
            this.headerLogo = environment.headerLogo;
        }
        return;
    }
    toggleSidebar() {
        this.onToggleSidebar.emit();
        return;
    }
};
tslib_1.__decorate([
    Output()
], HeaderComponent.prototype, "onToggleSidebar", void 0);
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styles: ['ul li { list-style: none; }',
            'img { height: 30px; opacity: 1; padding: 5px 5px; }',
            '.logo { margin-top: 15px;']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map