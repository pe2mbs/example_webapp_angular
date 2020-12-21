import { Component,
		 EventEmitter,
		 Input,
		 ChangeDetectionStrategy,
		 Output } from '@angular/core';
import { Directive, HostListener } from "@angular/core";


export const CONDITIONS_LIST = [
	{ value: "EQ", 		label: "Is equal == ", param: 1 },
	{ value: "!EQ", 	label: "Is not equal !=", param: 1 },
	{ value: "GT", 		label: "Greater than >", param: 1 },
	{ value: "GT|EQ",	label: "Greater or equal than >=", param: 1 },
	{ value: "LE", 		label: "Less than <", param: 1 },
	{ value: "LE|EQ",	label: "Less or equal than <=", param: 1 },
	{ value: "BT",		label: "Between", param: 2 },
	{ value: "SW",		label: "Startswith", param: 1 },
	{ value: "EW",		label: "Endswith", param: 1 },
	{ value: "CO",		label: "Contains", param: 1 },
	{ value: "!CO",		label: "Not contains", param: 1 },
	{ value: "EM", 		label: "Is empty", param: 0 },
	{ value: "!EM", 	label: "Is not empty", param: 0 },
];

export const CONDITION_FIELDS = {
	// Default value is 1
	"BT": 2,
	"EM": 0,
	"!EM": 0,
};

export interface FilterColumnReq
{
	column: string;
	value: string[];
	operator: string;
}

export class FilterColumn
{
	protected _column: string;
	protected _value: string[];
	protected _operator: string;
	
	constructor( column: string )
	{
		this._column = column;
		this._value = null;
		this._operator = null;
	}

	public clear()
	{
		this._value = null;
		this._operator = null;
		return;
	}

	public apply( values: string[], operator: string )
	{
		this._value = values;
		this._operator = operator;
		return;
	}

	public get column(): string
	{
		return ( this._column );
	}
	
	public get value(): string[]
	{
		return ( this._value );
	}

	public get operator(): string
	{
		return ( this._operator );
	}
}


export class FilterRecord
{
	event: EventEmitter<any> = null;
	filterColumns: FilterColumn[] = new Array<FilterColumn>();
	constructor( columns: string[] )
	{
		// tslint:disable-next-line:forin
		for ( const field in columns )
		{
			this.filterColumns.push( new FilterColumn( columns[ field ] ) );
		}
		return;
	}

	private findItem( column: string ): FilterColumn | null
	{
		let result = null;
		this.filterColumns.forEach( field =>
		{
			if ( field.column === column )
			{
				result = field;
				return;
			}
		} );
		return ( result );
	}

	public clear( column: string )
	{
		const col: FilterColumn = this.findItem( column );
		if ( col != null )
		{
			col.clear();
		}
		return;
	}

	public apply( column: string, values: string[], operator: string )
	{
		const col: FilterColumn = this.findItem( column );
		if ( col != null )
		{
			col.apply( values, operator );
		}
		return;
	}

	public getFilters(): FilterColumnReq[]
	{
		const columns: FilterColumnReq[] = new Array<FilterColumnReq>();
		this.filterColumns.forEach( field =>
		{
			if ( field.value != null || field.operator != null )
			{
				columns.push( { column: field.column,
								value: field.value,
								operator: field.operator } );
				return;
			}
		} );
		return ( columns );
	}
}

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: "[mat-filter-item]"
})
export class FilterItemDirective
{
	@HostListener( "click", [ "$event" ] ) onClick( e: MouseEvent )
	{
    	e.stopPropagation();
    	e.preventDefault();
    	return false;
  	}
}


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:component-selector
    selector: 'filter-header',
	template: `<div class="header" click-stop-propagation>
	{{ title | translate }}
	<button mat-icon-button class="btn-toggle" [matMenuTriggerFor]="menu">
		<mat-icon>keyboard_arrow_down</mat-icon>
	</button>
</div>
<mat-menu #menu>
	<div mat-menu-item mat-filter-item [disableRipple]="true" class="menu-title">
		<div fxLayout="row">
			<div fxFlex>Field</div>
			<div fxFlex fxLayoutAlign="end">{{ title | translate  }}</div>
		</div>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true">
		<mat-form-field>
			<mat-select [panelClass]="'mat-elevation-z10'" 
						placeholder='Conditions' 
						(selectionChange)="selectEvent( $event )"
						[(value)]="conditionPosition">
				<mat-option *ngFor="let condition of conditionsList" [value]="condition.value" class="cond_option">
					{{ condition.label | translate  }}
				</mat-option>
			</mat-select>
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields > 0">
		<mat-form-field>
			<input matInput [placeholder]="caption[ 0 ] | translate" [(ngModel)]="value[0]">
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields === 2">
		<mat-form-field>
			<input matInput [placeholder]="caption[ 1 ] | translate " [(ngModel)]="value[1]">
		</mat-form-field>
	</div>
	<div mat-menu-item [disableRipple]="true">
		<div fxLayout="row">
			<button mat-raised-button fxFlex class="action-button" (click)="clearColumnFilter()">{{ 'Clear' | translate }}</button>
			<button mat-raised-button color="primary" fxFlex class="action-button" (click)="applyColumnFilter()">{{ 'Search' | translate }}</button>
		</div>
	</div>
</mat-menu>`,
	styles: [ `.cond_option { font-size: inherit; line-height: 1.5em!important; height: 1.5em!important; }`,
				'.action-button { width: 50px; margin-left: 5px; margin-right: 5px;  }'
	]
} )
export class FilterHeaderComponent 
{
	public 		conditionsList = CONDITIONS_LIST;
	public 		conditionPosition: string;
	public 		value: string[] = new Array<string>( 2 );
	public 		caption: string[] = [ 'Value', 'Max. value' ];
	public 		fields: number = 1;
	@Input()	title: string;
	@Input()	field: string;
	@Input()	filterRecord: FilterRecord;
	@Output()	applyFilter: EventEmitter<any> = new EventEmitter<any>();

	constructor()
	{
		return;
	}
	
	public selectEvent( $event )
	{
		this.fields = 1;
		this.caption[ 0 ] = 'Value';
		if ( this.conditionPosition != null )
		{
			if ( this.conditionPosition in CONDITION_FIELDS )
			{ 
				this.fields = CONDITION_FIELDS[ this.conditionPosition ];
				if ( this.fields === 2 )
				{
					this.caption[ 0 ] = 'Min. Value';
				}
			}
		}
		return;
	}

	public clearColumnFilter(): void
	{
		this.value = [ null, null ];
		this.conditionPosition = null;
		this.filterRecord.clear( this.field );
		return;
	}

	public applyColumnFilter(): void 
	{
		this.filterRecord.apply( this.field, 
								 this.value, 
								 this.conditionPosition );
		this.applyFilter.emit( this.filterRecord );
		if ( this.filterRecord.event != null )
		{
			this.filterRecord.event.emit();
		}
		return;
	}
}

