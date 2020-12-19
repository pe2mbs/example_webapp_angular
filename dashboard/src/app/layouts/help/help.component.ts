import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent, HelpDialogData } from './dialog.component';
import { HelpService } from './service.service';

@Component({
	selector: 'app-help',
	template: `<button mat-icon-button [color]="color" (click)="helpButton()"><mat-icon>help_outline</mat-icon></button>`,
} )
export class HelpComponent
{
	@Input() helpitem: string;
	@Input() fallback: string;
	@Input() color: string;

	constructor( public dialog: MatDialog
		       , public service: HelpService ) 
	{ 
		return;
	}

	public helpButton(): void
	{
		const helpdata: HelpDialogData =
		{
			name: this.helpitem,
			text: this.service.getHelp( this.helpitem, this.fallback ),
		};
		console.log( 'helpButton' );
		const dialogRef = this.dialog.open( HelpDialogComponent, {  
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
