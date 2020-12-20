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
import { TrackingDataService } from './service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TrackingRecord } from './model';
import { PytSelectList } from '../../common/crud-dataservice';
import { ScreenBaseComponent } from 'src/app/common/crud-screen-component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-tracking-screen',
    templateUrl: './screen.component.html',
    styles: [ '.editor-screen { height: calc( 100% - 300px )!important; }' ],
    styleUrls: [ '../../common/common-mat-card.scss' ]
})
export class ScreenTrackingComponent extends ScreenBaseComponent<TrackingRecord> implements OnInit, OnDestroy
{
    public T_ACTIONList = [
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

    constructor( private route: ActivatedRoute
               , private router: Router
               , public dataService: TrackingDataService
  )
    {
        super();
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
                    T_ID: this.row.T_ID,
                    T_USER: this.row.T_USER,
                    T_TABLE: this.row.T_TABLE,
                    T_ACTION: this.row.T_ACTION,
                    T_RECORD_ID: this.row.T_RECORD_ID,
                    T_CHANGE_DATE_TIME: this.row.T_CHANGE_DATE_TIME,
                    T_CONTENTS: this.row.T_CONTENTS,
                } );
                this.updateFixedValues();
                this.dataService.lockRecord( this.row );
            } ) );
        }
        return;
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

