import * as tslib_1 from "tslib";
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
let GcHeaderComponent = class GcHeaderComponent {
    constructor(profileService, cdRef) {
        this.profileService = profileService;
        this.cdRef = cdRef;
        // tslint:disable-next-line:no-output-on-prefix
        this.onToggleSidebar = new EventEmitter();
        this.headerTitle = 'Application';
        this.headerLogo = 'logo.png';
        this.themeColor = 'light-theme';
        this.timeStamp = (new Date()).getTime();
        if (environment.headerTitle !== undefined && environment.headerTitle != null) {
            this.headerTitle = environment.headerTitle;
        }
        if (environment.headerLogo !== undefined && environment.headerLogo != null) {
            this.headerLogo = environment.headerLogo;
        }
        this.subscribeThemeChange();
        this.themeColor = this.profileService.theme;
        return;
    }
    subscribeThemeChange() {
        this.profileService.changeEvent.subscribe(data => {
            console.log('Theme change');
            if (this.themeColor !== data.theme) {
                console.log('Theme change-detectChanges');
                this.timeStamp = (new Date()).getTime();
                this.themeColor = data.theme;
                this.cdRef.detectChanges();
            }
        });
        return;
    }
    ngOnInit() {
        this.themeColor = this.profileService.theme;
        return;
    }
    toggleSidebar() {
        this.onToggleSidebar.emit();
        return;
    }
};
tslib_1.__decorate([
    Output()
], GcHeaderComponent.prototype, "onToggleSidebar", void 0);
GcHeaderComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-header',
        templateUrl: './header.component.html',
        styles: ['ul li { list-style: none; }',
            'img { height: 30px; opacity: 1; padding: 5px 5px; }',
            '.logo { margin-top: 15px; }']
    })
], GcHeaderComponent);
export { GcHeaderComponent };
//# sourceMappingURL=header.component.js.map