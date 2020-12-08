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
#   gencrud: 2020-12-06 17:30:48 version 2.0.607 by user mbertens
*/
import { EventEmitter } from '@angular/core';
import { CrudDataSource } from '../../common/crud-datasource';
import { CrudDataService, PytSelectList } from '../../common/crud-dataservice';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRecord } from './model';
import { RoleDataService } from '../gn_role/service';


export class UserDataSource extends CrudDataSource<UserRecord>
{
    constructor( public dataService: CrudDataService<UserRecord>
                 , _paginator: MatPaginator
                 , _sort: MatSort
                 , _event: EventEmitter<PageEvent>
                 , _backend_filter: any
                 , public gn_roleService: RoleDataService )
    {
        super( dataService, _paginator, _sort, _event, _backend_filter );
        return;
    }

    sortActive( active: string, a: any, b: any ): string[]
    {
        switch ( active ) 
        {
        case 'U_ACTIVE':
            return ( [ a.U_ACTIVE_LABEL, b.U_ACTIVE_LABEL ] );
        case 'U_NAME':
            return ( [ a.U_NAME, b.U_NAME ] );
        case 'U_ROLE':
            // TODO: fix the the resolved items
            return ( [ a.U_ROLE_FK.R_ROLE, b.U_ROLE_FK.R_ROLE ] );
        case 'U_FIRST_NAME':
            return ( [ a.U_FIRST_NAME, b.U_FIRST_NAME ] );
        case 'U_EMAIL':
            return ( [ a.U_EMAIL, b.U_EMAIL ] );
        case 'U_LAST_NAME':
            return ( [ a.U_LAST_NAME, b.U_LAST_NAME ] );
        }
        return ( [ null, null ] );        
    }

    public makeSearchString( record: any ): string
    {
        let searchString: string = '';
        searchString += record.U_ACTIVE_LABEL;
        searchString += record.U_NAME;
        searchString += record.U_ROLE_FK.R_ROLE;
        searchString += record.U_FIRST_NAME;
        searchString += record.U_EMAIL;
        searchString += record.U_LAST_NAME;
        return ( searchString.toLowerCase() );
    }
}

