import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
const CSS_TEMPLATE = `
:host 
{ 
	display: flex; 
	flex-direction: column; 
	height: 100%; 
	overflow: hidden!important;
}	

::ng-deep .mat-drawer-inner-container 
{	 
	overflow: hidden!important;  
}

mat-drawer-container 
{ 
	height: 100%; 
	overflow: hidden!important;
}

.mat-drawer 
{ 
	width: 260px; 
	max-width: 300px; 
	overflow: hidden!important; 
}

mat-drawer-content 
{ 
	padding-left: 5px; 
}`;
let DefaultComponent = class DefaultComponent {
    constructor() {
        this.sideBarOpen = true;
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
        template: `<app-header (onToggleSidebar)="doToggleSidebar( $event )"></app-header>
<mat-drawer-container>
	<mat-drawer mode="side" [opened]="sideBarOpen">
		<nav-sidebar></nav-sidebar>
	</mat-drawer>
	<mat-drawer-content>
		<router-outlet></router-outlet>
	</mat-drawer-content>
</mat-drawer-container>
<app-footer></app-footer>`,
        styles: [CSS_TEMPLATE]
    })
], DefaultComponent);
export { DefaultComponent };
//# sourceMappingURL=default.component.js.map