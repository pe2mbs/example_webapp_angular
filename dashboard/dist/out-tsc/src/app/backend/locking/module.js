var RecordLocksModule_1;
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
import { DeleteRecordLocksDialog } from './delete.dialog';
import { RecordLocksTableComponent } from './table.component';
import { RecordLocksDataService } from './service';
import { DefaultComponent } from '../../layouts/default.component';
export const lockingRoute = {
    path: '',
    component: DefaultComponent,
    children: [
        {
            path: 'locking',
            data: {
                breadcrumb: 'Locks',
                title: 'Locks'
            },
            children: [
                {
                    path: '',
                    component: RecordLocksTableComponent,
                    data: {
                        breadcrumb: 'Overview',
                        title: ''
                    }
                },
            ]
        }
    ]
};
/*
*   This NgModule is injected in the app-module.ts. This deals with declaring, importing,
*   creating entry point and providing the services for the locking screens and dialogs.
*
*   This don't clutter the app-module.ts, instead of at least 4 components that are added to the app-module.ts
*   it only adds this module and includes it in the import section.
*/
let RecordLocksModule = RecordLocksModule_1 = class RecordLocksModule {
    static forRoot() {
        return {
            ngModule: RecordLocksModule_1,
            providers: [
                RecordLocksDataService,
            ]
        };
    }
    static forChild() {
        return { ngModule: RecordLocksModule_1 };
    }
};
RecordLocksModule = RecordLocksModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
            DeleteRecordLocksDialog,
            RecordLocksTableComponent,
        ],
        entryComponents: [
            DeleteRecordLocksDialog,
        ],
        providers: [
            RecordLocksDataService,
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
            RouterModule.forChild([lockingRoute])
        ],
        exports: [
            DeleteRecordLocksDialog,
            RecordLocksTableComponent,
        ]
    })
], RecordLocksModule);
export { RecordLocksModule };
//# sourceMappingURL=module.js.map