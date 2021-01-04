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
#   gencrud: 2021-01-04 07:23:14 version 2.1.657 by user mbertens
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GcProfileService } from 'src/app/layouts/profile/profile.service';
import { TableDefintion } from 'src/app/modules/demo/table-http-example';
import { LanguageReferenceRecord } from './model';
import { DialogLanguageReferenceComponent } from './dialog.component';
import { LanguageReferenceDataService } from './service';
import { LanguagesDataService } from '../languages/service';
import { LanguageTransalatesDataService } from '../language_translates/service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-language_reference-table',
    template: `<app-cust-data-table
				class="card-content"
				[definition]="definition">
</app-cust-data-table>`,
    styleUrls: [ '../../layouts/common-mat-card.scss' ]
})
export class LanguageReferenceTableComponent
{
    public definition: TableDefintion<LanguageReferenceRecord> = {
        toggleUpdate: false,
        name: 'LanguageReferenceTable',
		helpTopic: 'language_reference-table',
		defaultSortField: 'LR_ID',
		defaultSortDirection: 'desc',
		sortDisableClear: true,
        headerButtons: [
			{
				label: 'New',
				icon: 'add',
				action: (core: any, self: any) => {
					self.self.addRecord();
				}
			},
		],
		footerButtons: [
		],
        rowDoubleClick: (core: any, self: any, idx: number, row: LanguageReferenceRecord) => {
			self.editRecord( idx, row );
		},
		columns: [
            {
                columnDef: 'LR_LA_ID',
				header: "Language",
				display: true,
				width: "15%",
				filter: false,
				sort: false,
				cell: (row: LanguageReferenceRecord) => row.LR_LA_ID
              , dataService: ( self: any ) => self.languagesService
            },
            {
                columnDef: 'TR_TEXT',
				header: "Text",
				display: true,
				width: "40%",
				filter: false,
				sort: false,
				cell: (row: LanguageReferenceRecord) => row.TR_TEXT
            },
            {
                columnDef: 'LR_LT_ID',
				header: "Text",
				display: true,
				width: "30%",
				filter: false,
				sort: false,
				cell: (row: LanguageReferenceRecord) => row.LR_LT_ID
              , dataService: ( self: any ) => self.language_translatesService
            },
            {
                columnDef: null,
				display: true,
				header: 'Options',
				width: '70px',
				cell: (row: LanguageReferenceRecord) => {},
                buttons: [
                    {
						label: 'Delete',
						icon: 'delete',
						action: (core: any, self: any, idx: number, row: LanguageReferenceRecord) => {
							core.deleteRecord( idx, row, 'TL_ID', 'Language text', 'TL_TEXT' );
						}
					},
                ]
            }
        ]
    };

    constructor( dataService: LanguageReferenceDataService
               , profileService: GcProfileService
               , protected dialog: MatDialog
               , public router: Router
                 , public languagesService: LanguagesDataService
                 , public language_translatesService: LanguageTransalatesDataService )
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
        const newRecord = new LanguageReferenceRecord();
        const options: MatDialogConfig = {
            data: { record: newRecord,
                    mode: 'add' },
            height: "562px",
        };
        const dialogRef = this.dialog.open( DialogLanguageReferenceComponent, options );
        dialogRef.afterClosed().subscribe( result =>
        {
            console.log( 'addNew() dialog result ', result );
            this.definition.profileService.changeEvent.emit();
        } );
		return;
	}

    public editRecord( idx: number, row: LanguageReferenceRecord ): void
	{
        this.definition.dataService.lockRecord( row );
        const options: MatDialogConfig = {
            data: { record: row,
                    mode: 'add' },
            height: "622px",
        };
        const dialogRef = this.dialog.open( DialogLanguageReferenceComponent, options );
        dialogRef.afterClosed().subscribe( result =>
        {
            console.log( 'editRecord() dialog result ', result );
            this.definition.dataService.unlockRecord( row );
            this.definition.profileService.changeEvent.emit();
        } );
        return;
	}
}

