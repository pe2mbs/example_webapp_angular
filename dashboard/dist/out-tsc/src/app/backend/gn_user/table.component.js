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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TableBaseComponent } from '../../common/crud-table-component';
import { UserRecord } from './model';
import { DeleteUserDialog } from './delete.dialog';
import { UserDataSource } from './datasource';
let UserTableComponent = class UserTableComponent extends TableBaseComponent {
    constructor(httpClient, route, dialog, router, dataService, spinnerService, gn_roleService) {
        super('UserTable', null, DeleteUserDialog, route, dialog, dataService);
        this.httpClient = httpClient;
        this.route = route;
        this.dialog = dialog;
        this.router = router;
        this.dataService = dataService;
        this.spinnerService = spinnerService;
        this.gn_roleService = gn_roleService;
        this.filterRecord = new UserRecord();
        this.searchValue = {};
        this.displayedColumns = ['U_NAME', 'U_FIRST_NAME', 'U_LAST_NAME', 'U_EMAIL', 'actions'];
        return;
    }
    deleteRecord(i, record, field_name = null) {
        super.deleteRecord(i, record, field_name, record.U_ID);
    }
    loadData() {
        this.dataSource = new UserDataSource(this.dataService, this.bot_paginator, this.sort, this.paginatorEvent, this.backendFilter, this.gn_roleService);
        return;
    }
    newRecord() {
        return (new UserRecord());
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
        // tslint:disable-next-line:component-selector
        selector: 'app-gn_user-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss',
            '../../common/common-mat-card.scss']
    })
], UserTableComponent);
export { UserTableComponent };
//# sourceMappingURL=table.component.js.map