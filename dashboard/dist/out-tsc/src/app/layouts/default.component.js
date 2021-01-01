import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let GcDefaultComponent = class GcDefaultComponent {
    constructor() {
        this.sideBarOpen = true;
        return;
    }
    doToggleSidebar($event) {
        this.sideBarOpen = !this.sideBarOpen;
        return;
    }
};
GcDefaultComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-default',
        template: `<gc-header (onToggleSidebar)="doToggleSidebar( $event )"></gc-header>
<gc-news-ticker></gc-news-ticker>      
<mat-drawer-container>
	<mat-drawer mode="side" [opened]="sideBarOpen">
		<gc-nav-sidebar></gc-nav-sidebar>
	</mat-drawer>
	<mat-drawer-content>
		<router-outlet></router-outlet>
	</mat-drawer-content>
</mat-drawer-container>
<gc-footer></gc-footer>`,
        styleUrls: ['./default.component.scss']
    })
], GcDefaultComponent);
export { GcDefaultComponent };
//# sourceMappingURL=default.component.js.map