import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GcDefaultComponent } from './layouts/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GcAuthGuard } from './layouts/auth/auth-guard.service';
import { TableHttpExample } from './modules/demo/table-http-example';
import { CustDataTableComponent } from './modules/demo2/cust.data.table.component';
const routes = [
    { path: '',
        component: GcDefaultComponent,
        canActivate: [GcAuthGuard],
        children: [
            {
                path: '',
                data: {
                    breadcrumb: 'Dashboard',
                },
                component: DashboardComponent
            },
            {
                path: 'demo',
                data: {
                    breadcrumb: 'Demo',
                },
                component: TableHttpExample
            },
            {
                path: 'demo2',
                data: {
                    breadcrumb: 'Demo-2',
                },
                component: CustDataTableComponent
            },
        ]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, {
                useHash: true,
                enableTracing: false
            })
        ],
        exports: [
            RouterModule
        ]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map