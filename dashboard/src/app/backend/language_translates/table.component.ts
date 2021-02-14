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
#   gencrud: 2021-02-14 06:07:03 version 2.1.663 by user mbertens
*/
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GcProfileService } from 'src/app/gencrud/profile/profile.service';
import { CustDataTableComponent } from 'src/app/gencrud/crud/cust.data.table.component';
import { isNullOrUndefined } from 'util';
import { TableDefintion } from 'src/app/modules/demo/table-http-example';
import { LanguageTransalatesRecord } from './model';
import { LanguageTransalatesDataService } from './service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-language_translates-table',
    template: `<app-cust-data-table
				class="card-content"
				[id]="id"
				[value]="value"
				[mode]="mode"
				[definition]="definition">
</app-cust-data-table>`,
    styleUrls: [ '../../gencrud/common-mat-card.scss' ]
})
export class LanguageTransalatesTableComponent
{
    @ViewChild( CustDataTableComponent, { static: true } )	tableComponent: CustDataTableComponent;
    @Input()	id: string;
	@Input()	value: any;
	@Input()	mode: string;

    public definition: TableDefintion<LanguageTransalatesRecord> = {
        toggleUpdate: false,
        name: 'LanguageTransalatesTable',
		helpTopic: 'language_translates-table',
		defaultSortField: 'LT_ID',
		defaultSortDirection: 'desc',
		sortDisableClear: true,
        headerButtons: [
			{
				label: 'New',
				icon: 'add',
				action: (core: any, self: any) => {
					self.addRecord();
				}
			},
		],
		footerButtons: [
		],
        rowDoubleClick: (core: any, self: any, idx: number, row: LanguageTransalatesRecord) => {
			self.editRecord( idx, row );
		},
		columns: [
            {
                columnDef: 'LT_LABEL',
				header: "Label",
				display: true,
				width: "100%",
				filter: true,
				sort: true,
                cell: (row: LanguageTransalatesRecord) => row.LT_LABEL
            },
            {
                columnDef: null,
				display: true,
				header: 'Options',
				width: '70px',
				cell: (row: LanguageTransalatesRecord) => {},
                buttons: [
                    {
						label: 'Delete',
						icon: 'delete',
						action: (core: any, self: any, idx: number, row: LanguageTransalatesRecord) => {
							core.deleteRecord( idx, row, 'LR_ID', 'Label', 'LR_LABEL' );
						}
					},
                ]
            }
        ]
    };

    constructor( dataService: LanguageTransalatesDataService
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
        this.router.navigate( ['/language_translates/edit'], {
			queryParams: { mode: 'new' }
		} );
		return;
	}

    public editRecord( idx: number, row: LanguageTransalatesRecord ): void
	{
        this.router.navigate( ['/language_translates/edit'], {
			queryParams: { 	id: 'LT_ID', mode: 'edit', value: row.LT_ID }
		} );
        return;
	}
}

