import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-user-profile',
  	templateUrl: './user.profile.component.html',
  	styleUrls: ['./user.profile.component.scss']
})
export class UserProfileComponent implements OnInit 
{
	constructor( public auth: AuthService,
				 private router: Router ) 
	{ 
		console.log( "UserProfileComponent.constructor", this.auth );
		return;
	}

	ngOnInit() 
	{
		console.log( "UserProfileComponent.ngOnInit", this.auth );
		return;
	}

	public logout(): void 
	{
		this.auth.logout();
		this.router.navigate( [ '\login' ] );
	}
}
