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
#   gencrud: 2020-12-06 15:51:25 version 2.0.607 by user mbertens
*/
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from './service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { UserRecord } from './model';
import { PytSelectList } from '../../common/crud-dataservice';
import { RoleDataService } from '../gn_role/service';
import { ScreenBaseComponent } from 'src/app/common/crud-screen-component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-gn_user-screen',
    templateUrl: './screen.component.html'
    styleUrls: [ '../../common/common-mat-card.scss' ]
})
export class ScreenUserComponent extends ScreenBaseComponent<UserRecord> implements OnInit, OnDestroy
{
    public U_ACTIVEList = [
            {
                        "label": "Yes",
                        "value": true
            },
            {
                        "label": "No",
                        "value": false
            }
];
    public gn_roleList: PytSelectList[];
    public hide_U_HASH_PASSWORD: boolean  = true;
    public U_LOCALEList = [
            {
                        "label": "nl_NL",
                        "value": 1
            }
];
    public U_LISTITEMSList = [
            {
                        "label": "5 Records",
                        "value": 5
            },
            {
                        "label": "10 Records",
                        "value": 10
            },
            {
                        "label": "25 Records",
                        "value": 25
            },
            {
                        "label": "100 Records",
                        "value": 100
            }
];

    constructor( private route: ActivatedRoute
               , private router: Router
               , public dataService: UserDataService
                 , public gn_roleService: RoleDataService  )
    {
        super();
        this.row = new UserRecord();
        this.formGroup = new FormGroup( {
            U_ACTIVE: new FormControl( this.row.U_ACTIVE || false,
                                              [  ]  ),
            U_NAME: new FormControl( this.row.U_NAME || '',
                                              [ Validators.required, Validators.maxLength( 30 ),  ]  ),
            U_ROLE: new FormControl( this.row.U_ROLE || 0,
                                              [  ]  ),
            U_HASH_PASSWORD: new FormControl( this.row.U_HASH_PASSWORD || '',
                                              [ Validators.required, Validators.maxLength( 255 ),  ]  ),
            U_MUST_CHANGE: new FormControl( this.row.U_MUST_CHANGE || false,
                                              [  ]  ),
            U_FIRST_NAME: new FormControl( this.row.U_FIRST_NAME || '',
                                              [ Validators.required, Validators.maxLength( 50 ),  ]  ),
            U_MIDDLE_NAME: new FormControl( this.row.U_MIDDLE_NAME || '',
                                              [ Validators.maxLength( 50 ),  ]  ),
            U_LAST_NAME: new FormControl( this.row.U_LAST_NAME || '',
                                              [ Validators.required, Validators.maxLength( 50 ),  ]  ),
            U_EMAIL: new FormControl( this.row.U_EMAIL || '',
                                              [ Validators.required, Validators.maxLength( 100 ),  ]  ),
            U_REMARK: new FormControl( this.row.U_REMARK || '',
                                              [  ]  ),
            U_LOCALE: new FormControl( this.row.U_LOCALE || 0,
                                              [  ]  ),
            U_LISTITEMS: new FormControl( this.row.U_LISTITEMS || 0,
                                              [  ]  ),
        } );
        return;
    }

    ngOnInit()
    {
        if ( this.id === undefined || this.id === null )
        {
            this.registerSubscription( this.route.queryParams.subscribe( params => {
                console.log( params );
                this.id             = params.id;    // Contains the key field, currently only the primary key is supported.
                this.value          = params.value; // Contains val value for the key field.
                this.mode           = params.mode;  // edit or new, filter only supported on the table component.
                this.updateFixedValues( params );
            } ) );
        }
        if ( this.value != null || this.value !== undefined )
        {
            this.registerSubscription( this.dataService.getRecordById( this.value ).subscribe( record => {
                this.row = record;
                this.formGroup.patchValue( {
                    U_ID: this.row.U_ID,
                    U_ACTIVE: this.row.U_ACTIVE,
                    U_NAME: this.row.U_NAME,
                    U_ROLE: this.row.U_ROLE,
                    U_HASH_PASSWORD: this.row.U_HASH_PASSWORD,
                    U_MUST_CHANGE: this.row.U_MUST_CHANGE,
                    U_FIRST_NAME: this.row.U_FIRST_NAME,
                    U_MIDDLE_NAME: this.row.U_MIDDLE_NAME,
                    U_LAST_NAME: this.row.U_LAST_NAME,
                    U_EMAIL: this.row.U_EMAIL,
                    U_ACCESS_TOKEN: this.row.U_ACCESS_TOKEN,
                    U_REFRESH_TOKEN: this.row.U_REFRESH_TOKEN,
                    U_TOKEN_DT: this.row.U_TOKEN_DT,
                    U_CREATE_DT: this.row.U_CREATE_DT,
                    U_MOD: this.row.U_MOD,
                    U_MOD_USER: this.row.U_MOD_USER,
                    U_REMARK: this.row.U_REMARK,
                    U_LOCALE: this.row.U_LOCALE,
                    U_LISTITEMS: this.row.U_LISTITEMS,
                } );
                this.updateFixedValues();
                this.dataService.lockRecord( this.row );
            } ) );
        }
        this.registerSubscription( this.gn_roleService.getSelectList( 'R_ID'
                                    , 'R_ROLE'
                                     ).subscribe( dataList => {
            this.gn_roleList = dataList;
        } ) );
        return;
    }

    public get U_ID()
    {
        return ( this.formGroup.get( 'U_ID' ) );
    }

    public get U_ACTIVE()
    {
        return ( this.formGroup.get( 'U_ACTIVE' ) );
    }

    public get U_NAME()
    {
        return ( this.formGroup.get( 'U_NAME' ) );
    }

    public get U_ROLE()
    {
        return ( this.formGroup.get( 'U_ROLE' ) );
    }

    public get U_HASH_PASSWORD()
    {
        return ( this.formGroup.get( 'U_HASH_PASSWORD' ) );
    }

    public get U_MUST_CHANGE()
    {
        return ( this.formGroup.get( 'U_MUST_CHANGE' ) );
    }

    public get U_FIRST_NAME()
    {
        return ( this.formGroup.get( 'U_FIRST_NAME' ) );
    }

    public get U_MIDDLE_NAME()
    {
        return ( this.formGroup.get( 'U_MIDDLE_NAME' ) );
    }

    public get U_LAST_NAME()
    {
        return ( this.formGroup.get( 'U_LAST_NAME' ) );
    }

    public get U_EMAIL()
    {
        return ( this.formGroup.get( 'U_EMAIL' ) );
    }

    public get U_ACCESS_TOKEN()
    {
        return ( this.formGroup.get( 'U_ACCESS_TOKEN' ) );
    }

    public get U_REFRESH_TOKEN()
    {
        return ( this.formGroup.get( 'U_REFRESH_TOKEN' ) );
    }

    public get U_TOKEN_DT()
    {
        return ( this.formGroup.get( 'U_TOKEN_DT' ) );
    }

    public get U_CREATE_DT()
    {
        return ( this.formGroup.get( 'U_CREATE_DT' ) );
    }

    public get U_MOD()
    {
        return ( this.formGroup.get( 'U_MOD' ) );
    }

    public get U_MOD_USER()
    {
        return ( this.formGroup.get( 'U_MOD_USER' ) );
    }

    public get U_REMARK()
    {
        return ( this.formGroup.get( 'U_REMARK' ) );
    }

    public get U_LOCALE()
    {
        return ( this.formGroup.get( 'U_LOCALE' ) );
    }

    public get U_LISTITEMS()
    {
        return ( this.formGroup.get( 'U_LISTITEMS' ) );
    }

}

