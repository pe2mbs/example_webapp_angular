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
#   gencrud: 2020-12-06 17:30:48 version 2.0.607 by user mbertens
*/
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../material.module';
import { GenCrudModule } from '../../common/gencrud.module';
import { SpinnerService } from '../../common/spinner-service';
import { CustomHttpInterceptor } from '../../common/http-interceptor';

import { ScreenUserComponent } from './screen.component';

import { DeleteUserDialog } from './delete.dialog';
import { UserTableComponent } from './table.component';
import { UserDataService } from './service';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { AuthGuard } from 'src/app/layouts/auth-guard.service';


export const gn_userRoute: Route = {
    path: '',
	component: DefaultComponent,
	canActivate: [ AuthGuard ],
    children: [
        {
            path:           'gn_user',
            data:
            {
                breadcrumb: 'Users',
                title:      'Users'
            },
            children: [
                {
                    path: '',
                    component: UserTableComponent,
                    data:
                    {
                        breadcrumb: '',
                        title:      ''
                    }
                },
                {
                    path: 'new',
                    component: ScreenUserComponent,
                    data:
                    {
                        breadcrumb: 'New',
                        title:      'New'
                    }
                },
                {
                    path: 'edit',
                    component: ScreenUserComponent,
                    data:
                    {
                        breadcrumb: 'Edit',
                        title:      'Edit'
                    }
                },
            ]
        }
    ]
};

/*
*   This NgModule is injected in the app-module.ts. This deals with declaring, importing,
*   creating entry point and providing the services for the gn_user screens and dialogs.
*
*   This don't clutter the app-module.ts, instead of at least 4 components that are added to the app-module.ts
*   it only adds this module and includes it in the import section.
*/
@NgModule( {
    declarations: [
        DeleteUserDialog,
        ScreenUserComponent,
        UserTableComponent,
    ],
    entryComponents: [
        DeleteUserDialog,
    ],
    providers: [
        UserDataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        },
        SpinnerService,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        GenCrudModule,
        RouterModule.forChild( [ gn_userRoute ] )
    ],
    exports: [
        ScreenUserComponent,
        DeleteUserDialog,
        UserTableComponent,
    ]
} )
export class UserModule
{
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserModule,
            providers: [
                UserDataService,
            ]
        };
    }
    static forChild(): ModuleWithProviders
    {
        return { ngModule: UserModule };
    }
}

