import { Component } from '@angular/core';

const CSS_TEMPLATE = `
:host 
{ 
	display: flex; 
	flex-direction: column; 
	height: 100%; 
	overflow: hidden!important;
}	

::ng-deep .mat-drawer-inner-container 
{	 
	overflow: hidden!important;  
}

mat-drawer-container 
{ 
	height: 100%; 
	overflow: hidden!important;
}

.mat-drawer 
{ 
	width: 260px; 
	max-width: 300px; 
	overflow: hidden!important; 
}

mat-drawer-content 
{ 
	padding-left: 5px; 
}`;


@Component({
  	selector: 'app-default',
      template: `<app-header (onToggleSidebar)="doToggleSidebar( $event )"></app-header>
<news-ticker></news-ticker>      
<mat-drawer-container>
	<mat-drawer mode="side" [opened]="sideBarOpen">
		<nav-sidebar></nav-sidebar>
	</mat-drawer>
	<mat-drawer-content>
		<router-outlet></router-outlet>
	</mat-drawer-content>
</mat-drawer-container>
<app-footer></app-footer>`,
  	styles: [ CSS_TEMPLATE ]
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
