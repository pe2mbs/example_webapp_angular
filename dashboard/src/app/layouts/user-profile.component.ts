import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-user-profile',
  	template: `<div *ngIf="!auth.isLoggedIn(); else logged_in">
	<button mat-menu-item routerLink="/login">
		<mat-icon>login</mat-icon>Sign in
	</button>
</div>
<ng-template #logged_in>
	<div class="user-info">
		User: {{ auth.fullName }}
	</div>
	<mat-divider></mat-divider>
	<button mat-menu-item (click)="logout()">
		<mat-icon>exit_to_app</mat-icon>Sign out
	</button>
	<button mat-menu-item *ngIf="auth.userProfile" [routerLink]="auth.userProfile" [queryParams]="auth.userProfileParmeters">
		<mat-icon>person_outline</mat-icon>Profile
	</button>
	<mat-divider></mat-divider>
	<div class="user-info">
		Role: {{ auth.userRole }}
	</div>
</ng-template>`,
  	styles: ['.user-info { padding: 10px; color: white; }' ]
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
