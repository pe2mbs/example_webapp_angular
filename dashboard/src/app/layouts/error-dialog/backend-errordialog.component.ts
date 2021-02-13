import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  	selector: 'app-root',
  	templateUrl: './errordialog.component.html'
})
export class BackendErrorDialogComponent 
{
  	title = 'Backend error';
  	constructor( private dialogRef: MatDialogRef<BackendErrorDialogComponent>, @Inject( MAT_DIALOG_DATA ) public data: string ) 
	{
		return;
	}
	  
	public closeDialog()
	{
		this.dialogRef.close( 0 );
		return;
	}
}