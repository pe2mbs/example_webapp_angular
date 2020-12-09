import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from './login.dialog.component';

@Component({
	selector: 'app-signin-dialog',
	template: '<div></div>'
})
export class LoginComponent implements OnInit
{
	constructor( public dialog: MatDialog 
			   , private route: ActivatedRoute
			   , private router: Router ) 
	{ 
		return;
	}

	public ngOnInit(): void
	{
		const dialogRef = this.dialog.open( LoginDialogComponent, {  
			autoFocus: true,
			width: '500px',
			height: '360px',
			data: null
		} );
	    dialogRef.afterClosed().subscribe( result => {
			console.log( `Dialog result: ${result}` );
			const returnUrl = this.route.snapshot.queryParamMap.get( 'returnUrl' );
			console.log( 'returnUrl', returnUrl );
			if ( returnUrl === undefined || returnUrl == null )
			{
				this.router.navigate( [ '/' ] );	
			}
			this.router.navigate( [ returnUrl ] );
    	} );
		return;
	}

}
