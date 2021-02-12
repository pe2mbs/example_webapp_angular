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
#   gencrud: 2021-01-10 08:21:51 version 2.1.658 by user mbertens
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GcProfileService } from 'src/app/layouts/profile/profile.service';
import { TableDefintion } from 'src/app/modules/demo/table-http-example';
import { TrackingRecord } from './model';
import { TrackingDataService } from './service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-tracking-table',
    template: `<app-cust-data-table
				class="card-content"
				[definition]="definition">
</app-cust-data-table>`,
    styleUrls: [ '../../layouts/common-mat-card.scss' ]
})
export class TrackingTableComponent
{
    public definition: TableDefintion<TrackingRecord> = {
        toggleUpdate: false,
        name: 'TrackingTable',
		helpTopic: 'tracking-table',
		defaultSortField: 'T_ID',
		defaultSortDirection: 'desc',
		sortDisableClear: true,
        headerButtons: [
		],
		footerButtons: [
		],
        rowDoubleClick: (core: any, self: any, idx: number, row: TrackingRecord) => {
			self.editRecord( idx, row );
		},
		columns: [
            {
                columnDef: 'T_USER',
				header: "User",
				display: true,
				width: "30%",
				filter: false,
				sort: false,
                cell: (row: TrackingRecord) => row.T_USER
            },
            {
                columnDef: 'T_TABLE',
				header: "Table",
				display: true,
				width: "30%",
				filter: false,
				sort: false,
                cell: (row: TrackingRecord) => row.T_TABLE
            },
            {
                columnDef: 'T_ACTION',
				header: "Action",
				display: true,
				width: "10%",
				filter: false,
				sort: false,
				cell: (row: TrackingRecord) => row.T_ACTION_LABEL
            },
            {
                columnDef: 'T_CHANGE_DATE_TIME',
				header: "Change timestamp",
				display: true,
				width: "300px",
				filter: false,
				sort: false,
                cell: (row: TrackingRecord) => row.T_CHANGE_DATE_TIME
            },
            {
                columnDef: null,
				display: true,
				header: 'Options',
				width: '70px',
				cell: (row: TrackingRecord) => {},
                buttons: [
                    {
						label: 'Restore',
						icon: 'restore',
						action: (core: any, self: any, idx: number, row: TrackingRecord) => {
							self.restoreRecord( idx, row );
						}
					},
                ]
            }
        ]
    };

    constructor( dataService: TrackingDataService
               , profileService: GcProfileService
               , protected dialog: MatDialog
               , public router: Router
 )
    {
        this.definition.dataService = dataService;
		this.definition.profileService = profileService;
		this.definition.dialog = dialog;
		this.definition.self = this;
        return;
    }

    public addRecord(): void
	{
	    console.log( 'addRecord()' );
        this.router.navigate( ['/tracking/edit'], {
			queryParams: { mode: 'new' }
		} );
		return;
	}

    public editRecord( idx: number, row: TrackingRecord ): void
	{
        this.router.navigate( ['/tracking/edit'], {
			queryParams: { 	id: 'T_ID', mode: 'edit', value: row.T_ID }
		} );
        return;
	}
}
