import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GcProfileService } from './profile.service';


@Component({
  	selector: 'app-user-profile',
  	template: `<div *ngIf="!profileService.isLoggedIn(); else logged_in">
	<button mat-menu-item routerLink="/login">
		<mat-icon>login</mat-icon>Sign in
	</button>
</div>
<ng-template #logged_in>
	<div class="user-info">
		User: {{ profileService.fullname }}
	</div>
	<mat-divider></mat-divider>
	<button mat-menu-item (click)="logout()">
		<mat-icon>exit_to_app</mat-icon>Sign out
	</button>
	<button mat-menu-item *ngIf="profileService.profilePage" 
						[routerLink]="profileService.profilePage" 
						[queryParams]="profileService.profileParameters">
		<mat-icon>person_outline</mat-icon>Profile
	</button>
	<mat-divider></mat-divider>
	<div class="user-info">
		Role: {{ profileService.roleString }}
	</div>
</ng-template>`,
  	styles: [ '.user-info { padding: 10px; }' ]
})
export class GcUserProfileComponent 
{
	constructor( public profileService: GcProfileService, 
				 private cdRef: ChangeDetectorRef,
				 private router: Router ) 
	{ 
		this.profileService.changeEvent.subscribe( event => {
			this.cdRef.detectChanges();
		} );
		return;
	}

	public logout(): void
	{
		this.profileService.logout();
		this.router.navigate( ['/login' ] );
		return;
	}
}
