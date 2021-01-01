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
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RoleRecord } from './model';
import { RoleDataService } from './service';
import { GcTableBase } from '../../crud/crud.table.base';
import { GcProfileService } from '../../profile/profile.service';
import { Router } from '@angular/router';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'app-role-table',
    templateUrl: './table.component.html',
    styleUrls: [ './table.component.scss',
				 '../../common-mat-card.scss' ]
})
export class RoleTableComponent extends GcTableBase<RoleRecord>
{
	constructor( public httpClient: HttpClient
			   , public router: Router		
               , dialog: MatDialog
			   , public profileService: GcProfileService
               , public dataService: RoleDataService )
    {
		super( 'RoleTable',
				[ 'R_ROLE', 'actions' ],
				[ 'R_ROLE' ],
				dataService,
				profileService,
				dialog );
        return;
	}
	
	public newRecord()
    {
        return ( new RoleRecord() );
   	}
}

