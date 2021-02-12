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
#   gencrud: 2021-01-09 07:56:12 version 2.1.658 by user mbertens
*/
import { Component } from '@angular/core';
let RecordLocksTableComponent = class RecordLocksTableComponent {
    constructor(dataService, profileService, dialog, router) {
        this.dialog = dialog;
        this.router = router;
        this.definition = {
            toggleUpdate: false,
            name: 'RecordLocksTable',
            helpTopic: 'locking-table',
            defaultSortField: 'L_ID',
            defaultSortDirection: 'desc',
            sortDisableClear: true,
            headerButtons: [],
            footerButtons: [],
            rowDoubleClick: (core, self, idx, row) => {
            },
            columns: [
                {
                    columnDef: 'L_USER',
                    header: "Username",
                    display: true,
                    width: "50%",
                    filter: false,
                    sort: false,
                    cell: (row) => row.L_USER
                },
                {
                    columnDef: 'L_TABLE',
                    header: "Table",
                    display: true,
                    width: "50%",
                    filter: false,
                    sort: false,
                    cell: (row) => row.L_TABLE
                },
                {
                    columnDef: 'L_START_DATE',
                    header: "Start lock",
                    display: true,
                    width: "300px",
                    filter: false,
                    sort: false,
                    cell: (row) => row.L_START_DATE
                },
                {
                    columnDef: null,
                    display: true,
                    header: 'Options',
                    width: '70px',
                    cell: (row) => { },
                    buttons: [
                        {
                            label: 'Delete',
                            icon: 'delete',
                            action: (core, self, idx, row) => {
                                core.deleteRecord(idx, row, 'L_ID', 'User', 'L_USER');
                            }
                        },
                    ]
                }
            ]
        };
        this.definition.dataService = dataService;
        this.definition.profileService = profileService;
        this.definition.dialog = dialog;
        this.definition.self = this;
        return;
    }
    addRecord() {
        console.log('addRecord()');
        this.router.navigate(['/locking/edit'], {
            queryParams: { mode: 'new' }
        });
        return;
    }
    editRecord(idx, row) {
        this.router.navigate(['/locking/edit'], {
            queryParams: { id: 'L_ID', mode: 'edit', value: row.L_ID }
        });
        return;
    }
};
RecordLocksTableComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'app-locking-table',
        template: `<app-cust-data-table
				class="card-content"
				[definition]="definition">
</app-cust-data-table>`,
        styleUrls: ['../../layouts/common-mat-card.scss']
    })
], RecordLocksTableComponent);
export { RecordLocksTableComponent };
//# sourceMappingURL=table.component.js.map