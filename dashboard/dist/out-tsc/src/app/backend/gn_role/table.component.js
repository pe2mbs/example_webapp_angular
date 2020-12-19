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
import { RoleRecord } from './model';
import { DeleteRoleDialog } from './delete.dialog';
import { RoleDataSource } from './datasource';
let RoleTableComponent = class RoleTableComponent extends TableBaseComponent {
    constructor(httpClient, route, dialog, router, dataService, spinnerService) {
        super('RoleTable', null, DeleteRoleDialog, route, dialog, dataService);
        this.httpClient = httpClient;
        this.route = route;
        this.dialog = dialog;
        this.router = router;
        this.dataService = dataService;
        this.spinnerService = spinnerService;
        this.filterRecord = new RoleRecord();
        this.searchValue = {};
        this.displayedColumns = ['R_ROLE', 'actions'];
        return;
    }
    deleteRecord(i, record, field_name = null) {
        super.deleteRecord(i, record, field_name, record.R_ID);
    }
    loadData() {
        this.dataSource = new RoleDataSource(this.dataService, this.bot_paginator, this.sort, this.paginatorEvent, this.backendFilter);
        return;
    }
    newRecord() {
        return (new RoleRecord());
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
RoleTableComponent = tslib_1.__decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        // tslint:disable-next-line:component-selector
        selector: 'app-gn_role-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss',
            '../../common/common-mat-card.scss']
    })
], RoleTableComponent);
export { RoleTableComponent };
//# sourceMappingURL=table.component.js.map