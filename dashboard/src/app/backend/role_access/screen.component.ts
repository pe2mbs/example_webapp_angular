/*
#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2021 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
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
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { GcScreenBase } from 'src/app/gencrud/crud/curd.screen.base';
import { RoleAccessDataService } from './service';
import { RoleAccessRecord } from './model';

import { GcSelectList } from 'src/app/gencrud/crud/model';
import { RoleDataService } from '../role/service';
import { ModuleAccessDataService } from '../mod_access/service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-role_access-screen',
    templateUrl: './screen.component.html',
    styleUrls: [ '../../gencrud/common-mat-card.scss' ]
})
export class ScreenRoleAccessComponent extends GcScreenBase<RoleAccessRecord> implements OnInit
{
    public roleList: GcSelectList[];
    public mod_accessList: GcSelectList[];
    public RA_CREATEList = [
        {
            "label": "Yes",
            "value": true
        },
        {
            "label": "No",
            "value": false
        }
    ];
    public RA_READList = [
        {
            "label": "Yes",
            "value": true
        },
        {
            "label": "No",
            "value": false
        }
    ];
    public RA_UPDATEList = [
        {
            "label": "Yes",
            "value": true
        },
        {
            "label": "No",
            "value": false
        }
    ];
    public RA_DELETEList = [
        {
            "label": "Yes",
            "value": true
        },
        {
            "label": "No",
            "value": false
        }
    ];

    constructor( route: ActivatedRoute
               , dataService: RoleAccessDataService
                 , public roleService: RoleDataService
                 , public mod_accessService: ModuleAccessDataService  )
    {
        super( route, dataService );
        this.row = new RoleAccessRecord();
        this.formGroup = new FormGroup( {
            RA_R_ID: new FormControl( this.row.RA_R_ID || 0,
                                              [ Validators.required,  ]  ),
            RA_MODULE: new FormControl( this.row.RA_MODULE || '',
                                              [ Validators.required, Validators.maxLength( 50 ),  ]  ),
            RA_CREATE: new FormControl( this.row.RA_CREATE || false,
                                              [  ]  ),
            RA_READ: new FormControl( this.row.RA_READ || false,
                                              [  ]  ),
            RA_UPDATE: new FormControl( this.row.RA_UPDATE || false,
                                              [  ]  ),
            RA_DELETE: new FormControl( this.row.RA_DELETE || false,
                                              [  ]  ),
            R_REMARK: new FormControl( this.row.R_REMARK || '',
                                              [  ]  ),
        } );
        return;
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.registerSubscription( this.roleService.getSelectList( 'R_ID'
                                    , 'R_ROLE'
                                     ).subscribe( dataList => {
            this.roleList = dataList;
        } ) );
        this.registerSubscription( this.mod_accessService.getSelectList( 'MA_MODULE'
                                    , 'MA_DESCRIPTION'
                                     ).subscribe( dataList => {
            this.mod_accessList = dataList;
        } ) );
        return;
    }

    protected updateFormGroup( record: RoleAccessRecord ): void
	{
		this.formGroup.patchValue( {
            RA_R_ID: this.row.RA_R_ID,
            RA_MODULE: this.row.RA_MODULE,
            RA_CREATE: this.row.RA_CREATE,
            RA_READ: this.row.RA_READ,
            RA_UPDATE: this.row.RA_UPDATE,
            RA_DELETE: this.row.RA_DELETE,
            R_REMARK: this.row.R_REMARK,
		} );
		return;
	}

    public get RA_ID()
    {
        return ( this.row.RA_ID );
    }

    public get RA_R_ID()
    {
        return ( this.formGroup.get( 'RA_R_ID' ) );
    }

    public get RA_MODULE()
    {
        return ( this.formGroup.get( 'RA_MODULE' ) );
    }

    public get RA_CREATE()
    {
        return ( this.formGroup.get( 'RA_CREATE' ) );
    }

    public get RA_READ()
    {
        return ( this.formGroup.get( 'RA_READ' ) );
    }

    public get RA_UPDATE()
    {
        return ( this.formGroup.get( 'RA_UPDATE' ) );
    }

    public get RA_DELETE()
    {
        return ( this.formGroup.get( 'RA_DELETE' ) );
    }

    public get R_REMARK()
    {
        return ( this.formGroup.get( 'R_REMARK' ) );
    }

}

