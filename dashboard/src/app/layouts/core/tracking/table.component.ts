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
import { MatDialog } from '@angular/material/dialog';
import { TrackingRecord } from './model';
import { TrackingDataService } from './service';
import { GcTableBase } from '../../crud/crud.table.base';
import { GcProfileService } from '../../profile/profile.service';
import { Router } from '@angular/router';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'app-tracking-table',
    templateUrl: './table.component.html',
    styleUrls: [ './table.component.scss',
				 '../../common-mat-card.scss' ]
})
export class TrackingTableComponent extends GcTableBase<TrackingRecord>
{
    displayedColumns = [ 'T_USER', 'T_TABLE', 'T_ACTION', 'T_CHANGE_DATE_TIME' ];
	constructor( dialog: MatDialog
		       , public router: Router
			   , dataService: TrackingDataService
			   , profileService: GcProfileService,
 )
    {
        super( 'TrackingTable',
				[ 'T_USER', 'T_TABLE', 'T_ACTION', 'T_CHANGE_DATE_TIME' ],
				[ 'T_USER', 'T_TABLE', 'T_ACTION', 'T_CHANGE_DATE_TIME' ],
                dataService,
                profileService,
                dialog );
        return;
    }

    public newRecord()
    {
        return ( new TrackingRecord() );
    }
}
