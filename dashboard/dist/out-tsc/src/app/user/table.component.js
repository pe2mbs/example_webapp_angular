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
#   gencrud: 2020-11-29 07:57:50 version 2.0.607 by user mbertens
*/
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableBaseComponent } from '../../common/crud-table-component';
import { UserRecord } from './model';
import { DeleteUserDialog } from './delete.dialog';
import { UserDataSource } from './datasource';
let UserTableComponent = class UserTableComponent extends TableBaseComponent {
    constructor(httpClient, route, dialog, router, dataService, spinnerService, roleService) {
        super('UserTable', null, DeleteUserDialog, route, dialog, dataService);
        this.httpClient = httpClient;
        this.route = route;
        this.dialog = dialog;
        this.router = router;
        this.dataService = dataService;
        this.spinnerService = spinnerService;
        this.roleService = roleService;
        this.displayedColumns = [
            'D_USER_NAME',
            'D_FIRST_NAME',
            'D_LAST_NAME',
            'D_ENABLED',
            'actions'
        ];
        return;
    }
    deleteRecord(i, record, field_name = null) {
        super.deleteRecord(i, record, field_name, record.D_USER_ID);
    }
    loadData() {
        this.dataSource = new UserDataSource(this.dataService, this.bot_paginator, this.sort, this.paginatorEvent, this.backendFilter, this.roleService);
        return;
    }
    newRecord() {
        return (new UserRecord);
    }
    setFilter(filter) {
        this.dataSource.filter = filter;
        return;
    }
    lockRecord(record) {
        this.dataService.lockRecord(record);
        return;
    }
    unlockRecord(record) {
        this.dataService.unlockRecord(record);
        return;
    }
};
UserTableComponent = tslib_1.__decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'app-user-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss']
    })
], UserTableComponent);
export { UserTableComponent };
//# sourceMappingURL=table.component.js.map