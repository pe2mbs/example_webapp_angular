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
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserRecord } from './model';
import { UserDataService } from './service';
import { RoleDataService } from '../role/service';
import { GcTableBase } from '../../crud/crud.table.base';
import { GcProfileService } from '../../profile/profile.service';



@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'app-user-table',
    templateUrl: './table.component.html',
    styleUrls: [ './table.component.scss',
				 '../../common-mat-card.scss' ]
})
export class UserTableComponent extends GcTableBase<UserRecord> 
{
	constructor( public router: Router
               , dialog: MatDialog
			   , profileService: GcProfileService
               , dataService: UserDataService )
    {
        super( 'UserTable',
				[ 'U_NAME', 'U_FIRST_NAME', 'U_LAST_NAME', 'U_EMAIL', 'actions' ],
				[ 'U_NAME', 'U_FIRST_NAME', 'U_LAST_NAME', 'U_EMAIL' ],
                dataService,
                profileService,
                dialog );
		console.log( 'UserTableComponent.constructor' );
		return;
    }

    public newRecord()
    {
        return ( new UserRecord() );
    }
}

