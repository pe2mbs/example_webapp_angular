import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GcHelpDialogComponent, GcHelpDialogData } from './dialog.component';
import { GcHelpService } from './service.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'gc-help',
	template: `<button mat-icon-button [color]="color" (click)="helpButton()"><mat-icon>help_outline</mat-icon></button>`,
} )
export class GcHelpComponent
{
	@Input() helpitem: string;
	@Input() fallback: string;
	@Input() color: string;

	constructor( public dialog: MatDialog
		       , public service: GcHelpService ) 
	{ 
		return;
	}

	public helpButton(): void
	{
		const helpdata: GcHelpDialogData =
		{
			name: this.helpitem,
			text: this.service.getHelp( this.helpitem, this.fallback ),
		};
		console.log( 'helpButton' );
		const dialogRef = this.dialog.open( GcHelpDialogComponent, {  
			autoFocus: false,
			// maxHeight: '80vh',
			width: '80%',
			height: '80%',
			data: helpdata
		} );
	    dialogRef.afterClosed().subscribe( result => {
    	  	console.log(`Dialog result: ${result}`);
    	} );
		return;
	}
}
