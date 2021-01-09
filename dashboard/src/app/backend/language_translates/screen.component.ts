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
#   gencrud: 2021-01-08 17:40:44 version 2.1.658 by user mbertens
*/
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { GcScreenBase } from 'src/app/layouts/crud/curd.screen.base';
import { LanguageTransalatesDataService } from './service';
import { LanguageTransalatesRecord } from './model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-language_translates-screen',
    templateUrl: './screen.component.html',
    styleUrls: [ '../../layouts/common-mat-card.scss' ]
})
export class ScreenLanguageTransalatesComponent extends GcScreenBase<LanguageTransalatesRecord>
{

    constructor( route: ActivatedRoute
               , dataService: LanguageTransalatesDataService
  )
    {
        super( route, dataService );
        this.row = new LanguageTransalatesRecord();
        this.formGroup = new FormGroup( {
            LT_LABEL: new FormControl( this.row.LT_LABEL || '',
                                              [ Validators.required, Validators.maxLength( 256 ),  ]  ),
        } );
        return;
    }

    protected updateFormGroup( record: LanguageTransalatesRecord ): void
	{
		this.formGroup.patchValue( {
            LT_LABEL: this.row.LT_LABEL,
		} );
		return;
	}

    public get LT_ID()
    {
        return ( this.formGroup.get( 'LT_ID' ) );
    }

    public get LT_LABEL()
    {
        return ( this.formGroup.get( 'LT_LABEL' ) );
    }

}

