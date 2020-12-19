import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
const HTML_TEMPLATE = `
<a mat-list-item [ngStyle]="{ 'padding-left': (depth * 12) + 'px' }" 
				 (click)="onItemSelected( item )"
				 [ngClass]="{ 'active': active, 'expanded': expanded }" 
				 id="{{ item.id }}">
	<mat-icon class="title-icon">{{ item.icon }}</mat-icon> {{ item.caption }}
	<span fxFlex *ngIf="item.children && item.children.length">
		<span fxFlex></span>
		<mat-icon [@indicatorRotate]="expanded ? 'expanded': 'collapsed'">expand_more</mat-icon>
	</span>
</a>
<div *ngIf="expanded">
	<menu-list-item *ngFor="let child of item.children" [item]="child" [depth]="depth+1">
	</menu-list-item>
</div>`;
const CSS_TEMPLATES = [
    `:host ::ng-deep .mat-list-item  
{  
	width: 100%; 
	height: 36px!important;  
	padding-top: 0px!important;
	color: mat-color( $app-primary, 50 ); 
	margin: 0px;
} 

:host ::ng-deep .mat-list-base
{
	padding-top: 4px!important;
}

.mat-list-item-content
{ 
	padding-left: 0px!important;
	padding-right: 8px!important;
}

.title-icon 
{ 
	margin-left: 10px; 
}
`
];
let MenuListItemComponent = class MenuListItemComponent {
    constructor(router) {
        this.router = router;
        this.ariaExpanded = this.expanded;
        if (this.depth === undefined) {
            this.depth = 0;
        }
        return;
    }
    ngOnInit() {
        // Check if the memu item is expanded.
        this.expanded = localStorage.getItem(this.item.id) === 'expanded';
        return;
    }
    get active() {
        return this.item.route ? this.router.isActive(this.item.route, true) : false;
    }
    onItemSelected(item) {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
            // Remember that the menu item is expanded.
            localStorage.setItem(this.item.id, this.expanded ? 'expanded' : '');
        }
        return;
    }
};
tslib_1.__decorate([
    HostBinding('attr.aria-expanded')
], MenuListItemComponent.prototype, "ariaExpanded", void 0);
tslib_1.__decorate([
    Input()
], MenuListItemComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input()
], MenuListItemComponent.prototype, "depth", void 0);
MenuListItemComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'menu-list-item',
        template: HTML_TEMPLATE,
        styles: CSS_TEMPLATES,
        animations: [
            trigger('indicatorRotate', [
                state('collapsed', style({ transform: 'rotate(0deg)' })),
                state('expanded', style({ transform: 'rotate(180deg)' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
            ])
        ]
    })
], MenuListItemComponent);
export { MenuListItemComponent };
//# sourceMappingURL=item.component.js.map