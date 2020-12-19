var BreadcrumbComponent_1;
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
let BreadcrumbComponent = BreadcrumbComponent_1 = class BreadcrumbComponent {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.home = { icon: 'pi pi-home', url: '/#/' };
        return;
    }
    ngOnInit() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
        });
        return;
    }
    createBreadcrumbs(route, url = '#', breadcrumbs = []) {
        const children = route.children;
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }
            const label = child.snapshot.data[BreadcrumbComponent_1.ROUTE_DATA_BREADCRUMB];
            if (!isNullOrUndefined(label)) {
                breadcrumbs.push({ label, url });
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }
};
BreadcrumbComponent.ROUTE_DATA_BREADCRUMB = 'breadcrumb';
BreadcrumbComponent = BreadcrumbComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-breadcrumb',
        template: '<p-breadcrumb [home]="home" [model]="menuItems"></p-breadcrumb>',
    })
], BreadcrumbComponent);
export { BreadcrumbComponent };
//# sourceMappingURL=breadcrumb.component.js.map