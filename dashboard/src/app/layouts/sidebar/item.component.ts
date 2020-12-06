import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavService } from './nav.service';
import { MenuItem } from './model';


@Component({
  	// tslint:disable-next-line:component-selector
  	selector: 'menu-list-item',
  	template: `<a mat-list-item [ngStyle]="{ 'padding-left': (depth * 12) + 'px' }" 
  								(click)="onItemSelected( item )"
  								[ngClass]="{ 'active': item.route ? router.isActive( item.route, true ): false, 'expanded': expanded }" id="{{ item.id }}">
<mat-icon>{{ item.icon }}</mat-icon> {{ item.caption }}
<span fxFlex *ngIf="item.children && item.children.length">
	<span fxFlex></span>
	<mat-icon [@indicatorRotate]="expanded ? 'expanded': 'collapsed'">expand_more</mat-icon>
</span>
</a>
<div *ngIf="expanded">
	<menu-list-item *ngFor="let child of item.children" [item]="child" [depth]="depth+1">
	</menu-list-item>
</div>`,
  	styles: [':host { .mat-list-item { height: 36px; } }'],
  	animations: [
    	trigger('indicatorRotate', [
      		state( 'collapsed', style( { transform: 'rotate(0deg)' } ) ),
      		state( 'expanded', style( { transform: 'rotate(180deg)' } ) ),
      		transition('expanded <=> collapsed',
        		animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      		),
    	] )
  	]
} )
export class MenuListItemComponent
{
	expanded: boolean;
	@HostBinding( 'attr.aria-expanded' ) ariaExpanded = this.expanded;
	@Input() item: MenuItem;
	@Input() depth: number;
	constructor( public navService: NavService,
				 public router: Router)
	{
		if ( this.depth === undefined )
		{
			this.depth = 0;
		}
		return;
	}

	onItemSelected( item: MenuItem )
	{
		if ( !item.children || !item.children.length )
		{
			this.router.navigate( [ item.route ] );
		}
		if ( item.children && item.children.length )
		{
			this.expanded = !this.expanded;
		}
		return;
	}
}
