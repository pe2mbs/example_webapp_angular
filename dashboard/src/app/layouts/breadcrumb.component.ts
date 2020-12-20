import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  	selector: 'app-breadcrumb',
	template: '<p-breadcrumb [home]="home" [model]="menuItems"></p-breadcrumb>',
	styles: [ ':host ::ng-deep .ui-breadcrumb { border: 0ch solid white!important; }' ]
} )
export class BreadcrumbComponent
{
    static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    readonly home = {icon: 'pi pi-home', url: '/#/'};
    menuItems: MenuItem[];

    constructor( private router: Router, private activatedRoute: ActivatedRoute )
    {
        this.router.events.subscribe( event => {
            if ( event instanceof NavigationEnd ) 
            {
                this.menuItems = this.createBreadcrumbs( this.activatedRoute.root );
            }
        } );
        return;
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[]
    {
        const children: ActivatedRoute[] = route.children;
        if ( children.length === 0 )
        {
            return ( breadcrumbs );
        }
        for (const child of children)
        {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '')
            {
                url += `/${routeURL}`;
            }
            const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
            if ( !isNullOrUndefined( label ) )
            {
                breadcrumbs.push( { label, url } );
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }
}
