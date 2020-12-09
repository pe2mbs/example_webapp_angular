import { Component } from '@angular/core';

@Component({
  	selector: 'app-default',
	  template: `<app-header (onToggleSidebar)="doToggleSidebar( $event )"></app-header>
<mat-drawer-container>
	<mat-drawer mode="side" [opened]="sideBarOpen">
		<nav-sidebar></nav-sidebar>
	</mat-drawer>
	<mat-drawer-content>
		<router-outlet></router-outlet>
	</mat-drawer-content>
</mat-drawer-container>
<app-footer></app-footer>`,
  	styles: [ ':host { display: flex; flex-direction: column; height: 100%; }',
	  		  'mat-drawer { min-width: 200px; }',
	  		  'mat-drawer-container { height: 100%; }',
	  		  'mat-drawer-content { padding: 10px; }']
})
export class DefaultComponent 
{
	public sideBarOpen: boolean = true;

	constructor() 
	{ 
		return;
	}

	public doToggleSidebar( $event ): void
	{
		this.sideBarOpen = !this.sideBarOpen;
		return;
	}
}
