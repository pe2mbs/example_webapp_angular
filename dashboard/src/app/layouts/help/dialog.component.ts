import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface HelpDialogData {
	name: string;
	text: Observable<string>;
}

@Component({
  	selector: 'app-dialog',
  	template: `<div class="help-contents">
  	<mat-card>
	  	<markdown [data]="data.text | async">No Help information available</markdown>
  	</mat-card>
  	<mat-card-actions align="end">
		<button mat-button cdkFocusInitial (click)="onCloseClick()">Close</button>
  	</mat-card-actions>
</div>`,
  styles: [ ':host { height: 100%; width: 100%; }',
  			'.help-contents { height: 100%; width: 100%; }',
			'mat-card { height: calc(100hv - 100px); }' 
		]
})
export class HelpDialogComponent
{
	constructor( public dialogRef: MatDialogRef<HelpDialogComponent>
			   , @Inject( MAT_DIALOG_DATA ) public data: HelpDialogData ) 
	{ 
		dialogRef.disableClose = true;
		return;
	}

	public onCloseClick(): void 
	{
		this.dialogRef.close();
	}
}
