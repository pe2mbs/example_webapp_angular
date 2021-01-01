var GcBreadcrumbComponent_1;
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { NavigationEnd } from '@angular/router';
let GcBreadcrumbComponent = GcBreadcrumbComponent_1 = class GcBreadcrumbComponent {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.home = { icon: 'pi pi-home', url: '/#/' };
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
            }
        });
        return;
    }
    createBreadcrumbs(route, url = '#', breadcrumbs = []) {
        const children = route.children;
        if (children.length === 0) {
            return (breadcrumbs);
        }
        for (const child of children) {
            const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }
            const label = child.snapshot.data[GcBreadcrumbComponent_1.ROUTE_DATA_BREADCRUMB];
            if (!isNullOrUndefined(label)) {
                breadcrumbs.push({ label, url });
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }
};
GcBreadcrumbComponent.ROUTE_DATA_BREADCRUMB = 'breadcrumb';
GcBreadcrumbComponent = GcBreadcrumbComponent_1 = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'gc-breadcrumb',
        template: '<p-breadcrumb class="color-primary" [home]="home" [model]="menuItems"></p-breadcrumb>',
        styles: [':host ::ng-deep .ui-breadcrumb { border: 0ch solid white!important; }']
    })
], GcBreadcrumbComponent);
export { GcBreadcrumbComponent };
//# sourceMappingURL=breadcrumb.component.js.map