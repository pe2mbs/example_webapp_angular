import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
const CSS_TEMPLATE = `
:host ::ng-deep .mat-list-base
{
	padding: 0px!important;
}

.mat-list-base
{
	padding: 0px!important;
}

:host ::ng-deep .mat-list-item 
{ 
	height: 36px;
	padding: 0px;
}

menu-list-item 
{ 
	height: 36px; 
}
`;
/** @title Fixed sidenav */
let NavSidebarComponent = class NavSidebarComponent {
    constructor(navService, router) {
        this.navService = navService;
        this.router = router;
        this.navItems = [];
        return;
    }
    ngOnInit() {
        this.navService.menuItems().subscribe(response => this.navItems = response);
        return;
    }
};
NavSidebarComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'nav-sidebar',
        template: '<mat-nav-list><menu-list-item *ngFor="let item of navItems" [item]="item"></menu-list-item></mat-nav-list>',
        styles: [CSS_TEMPLATE],
    })
], NavSidebarComponent);
export { NavSidebarComponent };
//# sourceMappingURL=sidebar.component.js.map