import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DefaultComponent = class DefaultComponent {
    constructor() {
        this.sideBarOpen = true;
        return;
    }
    ngOnInit() {
        return;
    }
    doToggleSidebar($event) {
        this.sideBarOpen = !this.sideBarOpen;
        return;
    }
};
DefaultComponent = tslib_1.__decorate([
    Component({
        selector: 'app-default',
        templateUrl: './default.component.html',
        styleUrls: ['./default.component.scss']
    })
], DefaultComponent);
export { DefaultComponent };
//# sourceMappingURL=default.component.js.map