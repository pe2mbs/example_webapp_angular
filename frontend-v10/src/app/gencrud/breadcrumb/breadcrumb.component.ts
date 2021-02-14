import { Component, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface BreadcrumbItems
{
	label: string;
	url: string;
}

// keyboard_arrow_right
// chevron_right
// home

@Component({
  	// tslint:disable-next-line:component-selector
  	selector: 'gc-breadcrumb',
	// template: '<p-breadcrumb class="color-primary" [home]="home2" [model]="menuItems"></p-breadcrumb>',
	templateUrl: 'breadcrumb.component.html',
	styleUrls: [ 'breadcrumb.component.scss' ]
} )
export class GcBreadcrumbComponent
{
    static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
	@Input() home: string = '/';
	public routeItems: BreadcrumbItems[] = new Array<BreadcrumbItems>();
	home_item: BreadcrumbItems = {
		label: 'home',	// This is the icon
		url: '/#/'
	};

    constructor( private router: Router, private activatedRoute: ActivatedRoute )
    {
        this.router.events.subscribe( event => {
            if ( event instanceof NavigationEnd ) 
            {
				// this.menuItems = this.createBreadcrumbs( this.activatedRoute.root );
				this.routeItems = this.createBreadcrumbs( this.activatedRoute.root );
				// console.log( "GcBreadcrumbComponent:", this.routeItems );
            }
        } );
        return;
    }

	// private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[]
    private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: BreadcrumbItems[] = []): BreadcrumbItems[]
    {
        const children: ActivatedRoute[] = route.children;
        if ( children.length === 0 )
        {
            return ( breadcrumbs );
        }
        for (const child of children)
        {
            const routeURL: string = child.snapshot.url.map( segment => segment.path ).join( '/' );
            if (routeURL !== '')
            {
                url += `/${routeURL}`;
            }
            let label = child.snapshot.data[ GcBreadcrumbComponent.ROUTE_DATA_BREADCRUMB ];
			if ( !isNullOrUndefined( label ) )
			{
				label = child.snapshot.data.title;
			}
			if ( !isNullOrUndefined( label ) && label !== '' )
            {
                breadcrumbs.push( { label, url } );
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
	}
	
	public itemClick( $event, item: BreadcrumbItems )
	{
		this.router.navigate( [ item ] );
		return;
	}
}
