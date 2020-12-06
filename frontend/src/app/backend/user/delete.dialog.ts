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
#   gencrud: 2020-11-29 07:57:50 version 2.0.607 by user mbertens
*/
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../../common/dialog';
import { UserDataService } from './service'

@Component({
    selector: 'app-user-delete-dialog',
    templateUrl: '../../common/delete.dialog.html',
    styleUrls: ['../../common/dialog.scss']
})
export class DeleteUserDialog extends BaseDialog
{
    title: string       = "User";
    constructor( dialogRef: MatDialogRef<DeleteUserDialog>,
                 @Inject( MAT_DIALOG_DATA ) public data: any, 
                 dataService: UserDataService )
    { 
        super( dialogRef, dataService )
        return;
    }

    onSaveClick(): void
    {
        this.dataService.deleteRecord( this.data.record.D_USER_ID );
        return;
    }
}

