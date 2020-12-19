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
import { EventEmitter } from '@angular/core';
import { CrudDataSource } from '../../common/crud-datasource';
import { CrudDataService, PytSelectList } from '../../common/crud-dataservice';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrackingRecord } from './model';


export class TrackingDataSource extends CrudDataSource<TrackingRecord>
{
    constructor( public dataService: CrudDataService<TrackingRecord>
                 , _paginator: MatPaginator
                 , _sort: MatSort
                 , _event: EventEmitter<PageEvent>
                 , _backend_filter: any
 )
    {
        super( dataService, _paginator, _sort, _event, _backend_filter );
        return;
    }

    sortActive( active: string, a: any, b: any ): string[]
    {
        switch ( active ) 
        {
        case 'T_USER':
            return ( [ a.T_USER, b.T_USER ] );
        case 'T_TABLE':
            return ( [ a.T_TABLE, b.T_TABLE ] );
        case 'T_ACTION':
            return ( [ a.T_ACTION_LABEL, b.T_ACTION_LABEL ] );
        case 'T_CHANGE_DATE_TIME':
            return ( [ a.T_CHANGE_DATE_TIME, b.T_CHANGE_DATE_TIME ] );
        }
        return ( [ null, null ] );        
    }

    public makeSearchString( record: any ): string
    {
        let searchString: string = '';
        searchString += record.T_USER;
        searchString += record.T_TABLE;
        searchString += record.T_ACTION_LABEL;
        searchString += record.T_CHANGE_DATE_TIME;
        return ( searchString.toLowerCase() );
    }
}

