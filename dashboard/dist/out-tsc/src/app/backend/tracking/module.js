var TrackingModule_1;
import * as tslib_1 from "tslib";
/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2020 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
#
#   This library is free software; you can redistribute it and/or modify
#   it under the terms of the GNU Library General Public License GPL-2.0-only
#   as published by the Free Software Foundation.
#
#   This library is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#   Library General Public License for more details.
#
#   You should have received a copy of the GNU Library General Public
#   License GPL-2.0-only along with this library; if not, write to the
#   Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
#   Boston, MA 02110-1301 USA
#
#   gencrud: 2020-12-18 21:35:19 version 2.1.657 by user mbertens
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenCrudModule } from '../../common/gencrud.module';
import { DefaultModule } from '../../layouts/default.module';
import { SpinnerService } from '../../common/spinner-service';
import { CustomHttpInterceptor } from '../../common/http-interceptor';
import { ScreenTrackingComponent } from './screen.component';
import { TrackingTableComponent } from './table.component';
import { TrackingDataService } from './service';
import { DefaultComponent } from '../../layouts/default.component';
export const trackingRoute = {
    path: '',
    component: DefaultComponent,
    children: [
        {
            path: 'tracking',
            data: {
                breadcrumb: 'Tracking',
                title: 'Tracking'
            },
            children: [
                {
                    path: '',
                    component: TrackingTableComponent,
                    data: {
                        breadcrumb: 'Overview',
                        title: ''
                    }
                },
                {
                    path: 'edit',
                    component: ScreenTrackingComponent,
                    data: {
                        breadcrumb: 'Edit',
                        title: 'Edit'
                    }
                },
            ]
        }
    ]
};
/*
*   This NgModule is injected in the app-module.ts. This deals with declaring, importing,
*   creating entry point and providing the services for the tracking screens and dialogs.
*
*   This don't clutter the app-module.ts, instead of at least 4 components that are added to the app-module.ts
*   it only adds this module and includes it in the import section.
*/
let TrackingModule = TrackingModule_1 = class TrackingModule {
    static forRoot() {
        return {
            ngModule: TrackingModule_1,
            providers: [
                TrackingDataService,
            ]
        };
    }
    static forChild() {
        return { ngModule: TrackingModule_1 };
    }
};
TrackingModule = TrackingModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
            ScreenTrackingComponent,
            TrackingTableComponent,
        ],
        entryComponents: [],
        providers: [
            TrackingDataService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: CustomHttpInterceptor,
                multi: true
            },
            SpinnerService,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DefaultModule,
            GenCrudModule,
            RouterModule.forChild([trackingRoute])
        ],
        exports: [
            ScreenTrackingComponent,
            TrackingTableComponent,
        ]
    })
], TrackingModule);
export { TrackingModule };
//# sourceMappingURL=module.js.map