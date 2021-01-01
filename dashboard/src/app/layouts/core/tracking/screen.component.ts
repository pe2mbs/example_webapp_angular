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
import { TrackingDataService } from './service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingRecord } from './model';
import { GcScreenBase } from '../../crud/curd.screen.base';
import { GcSelectList } from '../../crud/model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-tracking-screen',
    templateUrl: './screen.component.html',
    styles: [ '.editor-screen { height: calc( 100% - 300px )!important; }' ],
    styleUrls: [ '../../common-mat-card.scss' ]
})
export class ScreenTrackingComponent extends GcScreenBase<TrackingRecord>
{
    public T_ACTIONList: GcSelectList[] = [
            {
                        "label": "Insert",
                        "value": 1
            },
            {
                        "label": "Update",
                        "value": 2
            },
            {
                        "label": "Delete",
                        "value": 3
            }
];

    constructor( route: ActivatedRoute
               , dataService: TrackingDataService
  )
    {
        super( route, dataService );
        this.row = new TrackingRecord();
        this.formGroup = new FormGroup( {
            T_USER: new FormControl( this.row.T_USER || '',
                                              [ Validators.required,  ]  ),
            T_TABLE: new FormControl( this.row.T_TABLE || '',
                                              [ Validators.required,  ]  ),
            T_ACTION: new FormControl( this.row.T_ACTION || 0,
                                              [ Validators.required,  ]  ),
            T_RECORD_ID: new FormControl( this.row.T_RECORD_ID || 0,
                                              [ Validators.required,  ]  ),
            T_CHANGE_DATE_TIME: new FormControl( this.row.T_CHANGE_DATE_TIME || '',
                                              [ Validators.required,  ]  ),
            T_CONTENTS: new FormControl( this.row.T_CONTENTS || '',
                                              [  ]  ),
        } );
        return;
    }

	protected updateFormGroup( record: TrackingRecord ): void
	{
		this.formGroup.patchValue( {
			T_ID: record.T_ID,
			T_USER: record.T_USER,
			T_TABLE: record.T_TABLE,
			T_ACTION: record.T_ACTION,
			T_RECORD_ID: record.T_RECORD_ID,
			T_CHANGE_DATE_TIME: record.T_CHANGE_DATE_TIME,
			T_CONTENTS: record.T_CONTENTS,
		} );
	}

    public get T_ID()
    {
        return ( this.formGroup.get( 'T_ID' ) );
    }

    public get T_USER()
    {
        return ( this.formGroup.get( 'T_USER' ) );
    }

    public get T_TABLE()
    {
        return ( this.formGroup.get( 'T_TABLE' ) );
    }

    public get T_ACTION()
    {
        return ( this.formGroup.get( 'T_ACTION' ) );
    }

    public get T_RECORD_ID()
    {
        return ( this.formGroup.get( 'T_RECORD_ID' ) );
    }

    public get T_CHANGE_DATE_TIME()
    {
        return ( this.formGroup.get( 'T_CHANGE_DATE_TIME' ) );
    }

    public get T_CONTENTS()
    {
        return ( this.formGroup.get( 'T_CONTENTS' ) );
    }
}
