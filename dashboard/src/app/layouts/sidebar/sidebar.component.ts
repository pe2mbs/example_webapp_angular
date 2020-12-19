import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './model';
import { NavService } from './nav.service';

const CSS_TEMPLATE = `
:host ::ng-deep .mat-list-base
{
	padding: 0px!important;
}

.mat-list-base
{
	padding: 0px!important;
}

:host ::ng-deep .mat-list-item 
{ 
	height: 36px;
	padding: 0px;
}

menu-list-item 
{ 
	height: 36px; 
}
`;



/** @title Fixed sidenav */
@Component({
  	// tslint:disable-next-line:component-selector
  	selector: 'nav-sidebar',
  	template: '<mat-nav-list><menu-list-item *ngFor="let item of navItems" [item]="item"></menu-list-item></mat-nav-list>',
	styles: [ CSS_TEMPLATE ],
})
export class NavSidebarComponent implements OnInit 
{
    navItems: MenuItem[] = [];

    constructor( private navService: NavService,
                 private router: Router )
    {
        return;
    }

    ngOnInit(): void
    {
        this.navService.menuItems().subscribe( response => this.navItems = response );
        return;
    }
}
