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
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleDataService } from './service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { RoleRecord } from './model';
import { ScreenBaseComponent } from 'src/app/common/crud-screen-component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-gn_role-screen',
    templateUrl: './screen.component.html',
    styleUrls: [ '../../common/common-mat-card.scss' ]
})
export class ScreenRoleComponent extends ScreenBaseComponent<RoleRecord> implements OnInit, OnDestroy
{

    constructor( private route: ActivatedRoute
               , private router: Router
               , public dataService: RoleDataService
  )
    {
        super();
        this.row = new RoleRecord();
        this.formGroup = new FormGroup( {
            R_ROLE: new FormControl( this.row.R_ROLE || '',
                                              [ Validators.required, Validators.maxLength( 255 ),  ]  ),
            R_REMARK: new FormControl( this.row.R_REMARK || '',
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
                    R_ID: this.row.R_ID,
                    R_ROLE: this.row.R_ROLE,
                    R_REMARK: this.row.R_REMARK,
                } );
                this.updateFixedValues();
                this.dataService.lockRecord( this.row );
            } ) );
        }
        return;
    }

    public get R_ID()
    {
        return ( this.formGroup.get( 'R_ID' ) );
    }

    public get R_ROLE()
    {
        return ( this.formGroup.get( 'R_ROLE' ) );
    }

    public get R_REMARK()
    {
        return ( this.formGroup.get( 'R_REMARK' ) );
    }

}

