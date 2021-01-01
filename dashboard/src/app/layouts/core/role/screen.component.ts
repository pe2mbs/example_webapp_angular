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
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleDataService } from './service';
import { ActivatedRoute } from '@angular/router';
import { RoleRecord } from './model';
import { GcScreenBase } from '../../crud/curd.screen.base';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-role-screen',
    templateUrl: './screen.component.html',
    styles: [ '.editor-screen { height: calc( 100% - 75px )!important; }' ],
    styleUrls: [ '../../common-mat-card.scss' ]
})
export class ScreenRoleComponent extends GcScreenBase<RoleRecord>
{
    constructor( route: ActivatedRoute
               , dataService: RoleDataService )
    {
        super( route, dataService );
        this.row = new RoleRecord();
        this.formGroup = new FormGroup( {
            R_ROLE: new FormControl( this.row.R_ROLE || '',
                                              [ Validators.required, Validators.maxLength( 255 ),  ]  ),
            R_REMARK: new FormControl( this.row.R_REMARK || '',
                                              [  ]  ),
        } );
        return;
    }
	
	protected updateFormGroup( record: RoleRecord ): void
	{
		this.formGroup.patchValue( {
            R_ID: this.row.R_ID,
            R_ROLE: this.row.R_ROLE,
            R_REMARK: this.row.R_REMARK,
		} );
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
