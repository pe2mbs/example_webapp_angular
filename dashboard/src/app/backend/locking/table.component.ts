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
import { Component, ElementRef, OnInit, OnDestroy, ViewChild, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from '../../common/spinner-service';
import { TableBaseComponent } from '../../common/crud-table-component';
import { RecordLocksRecord } from './model';
import { DeleteRecordLocksDialog } from './delete.dialog';
import { RecordLocksDataService } from './service';
import { RecordLocksDataSource } from './datasource';
import { environment } from './../../../environments/environment';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'app-locking-table',
    templateUrl: './table.component.html',
    styleUrls: [ './table.component.scss',
                 '../../common/common-mat-card.scss' ]
})
export class RecordLocksTableComponent extends TableBaseComponent<RecordLocksRecord> implements OnInit, OnDestroy
{
    public filterRecord: RecordLocksRecord = new RecordLocksRecord();
    public searchValue: any = {};
    displayedColumns = [ 'L_USER', 'L_TABLE', 'L_START_DATE', 'actions' ];
    constructor( public httpClient: HttpClient
                 , public route: ActivatedRoute
                 , public dialog: MatDialog
                 , public router: Router
                 , public dataService: RecordLocksDataService
                 , public spinnerService: SpinnerService
 )
    {
        super( 'RecordLocksTable',
                null,
                DeleteRecordLocksDialog,
                route,
                dialog,
                dataService );
        return;
    }

    public deleteRecord( i: number, record: RecordLocksRecord, field_name: string = null ): void
    {
        super.deleteRecord( i, record, field_name, record.L_ID );
    }

    public loadData(): void
    {
        this.dataSource = new RecordLocksDataSource( this.dataService
                                                , this.bot_paginator
                                                , this.sort
                                                , this.paginatorEvent
                                                , this.backendFilter
                                               );
        return;
    }


    public newRecord()
    {
        return ( new RecordLocksRecord() );
    }

    public setFilter( filter: string )
    {
        this.dataSource.filter = filter;
        return;
    }

    public lockRecord( record: RecordLocksRecord ): void
    {
        this.dataService.lockRecord( record );
        return;
    }

    public unlockRecord( record: RecordLocksRecord ): void
    {
        this.dataService.unlockRecord( record );
        return;
    }
}

