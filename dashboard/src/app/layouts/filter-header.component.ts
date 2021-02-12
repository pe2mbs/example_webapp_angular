import { Component,
		 EventEmitter,
		 Input,
		 ChangeDetectionStrategy,
		 Output, 
		 OnInit } from '@angular/core';
import { Directive, HostListener } from "@angular/core";
import { isNullOrUndefined, isNull } from 'util';

export interface GcConditionItem
{
	value: string;
	label: string;
	param: number;
}

export const CONDITIONS_LIST_SIMPLE: GcConditionItem[] = [
	{ value: "EQ", 		label: "Is equal ==", param: 0 },
	{ value: "!EQ", 	label: "Is not equal !=", param: 0 },
];

export const CONDITIONS_LIST: GcConditionItem[] = [
	{ value: "EQ", 		label: "Is equal ==", param: 1 },
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
	{ value: "EM", 		label: "Is empty", param: -1 },
	{ value: "!EM", 	label: "Is not empty", param: -1 },
];

export const CONDITION_FIELDS = {
	// Default value is 1
	"BT": 2,
	"EM": 0,
	"!EM": 0,
};

export interface GcFilterColumnReq
{
	column: string;
	value: string[];
	operator: string;
}

export class GcFilterColumn
{
	protected _column: string;
	protected _value: string[];
	protected _operator: string;
	protected debug: boolean;
	
	constructor( column: string, debug = false )
	{
		this._column = column;
		this._value = null;
		this._operator = null;
		this.debug = debug;
	}

	public clear()
	{
		this._value = null;
		this._operator = null;
		return;
	}

	public apply( values: any[], operator: string )
	{
		if ( this.debug )
		{
			console.log( 'FilterColumn.apply', this._column, values, operator );
		}
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

export class GcFilterEvent
{
	filter: GcFilterRecord;
}

export class GcFilterRecord
{
	protected debug: boolean;
	event: EventEmitter<GcFilterEvent> = new EventEmitter<GcFilterEvent>();
	filterColumns: GcFilterColumn[] = new Array<GcFilterColumn>();
	constructor( columns: string[], debug = false )
	{
		this.debug = debug;
		if ( this.debug )
		{
			console.log( 'constructor( columns = ', columns, ' )' );
		}
		columns.forEach( field => {
			if ( this.debug )
			{
				console.log( 'constructor => ', field );
			}
			this.filterColumns.push( new GcFilterColumn( columns[ field ] ) );
		} );
		return;
	}

	private findItem( column: string ): GcFilterColumn | null
	{
		let result = null;
		if ( this.debug )
		{
			console.log( `findItem( column = "${column}" )` );
		}
		this.filterColumns.forEach( field =>
		{
			console.log( 'findItem => ', field );
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
		const col: GcFilterColumn = this.findItem( column );
		if ( col != null )
		{
			col.clear();
		}
		return;
	}

	public set( column: string, value: any ): void
	{
		let col: GcFilterColumn = this.findItem( column );
		if ( isNull( col ) )
		{
			if ( this.debug )
			{
				console.log( `Adding filter to ${column} with value ${value}` );
			}
			this.filterColumns.push( new GcFilterColumn( column ) );
			col = this.findItem( column );
		}
		col.apply( [ value, null ], 'EQ' );
		return;
	}

	public apply( column: string, values: any[], operator: string )
	{
		const col: GcFilterColumn = this.findItem( column );
		if ( this.debug )
		{
			console.log( "apply", column, values, operator, col );
		}
		if ( col != null )
		{
			col.apply( values, operator );
		}
		return;
	}

	public getFilters(): GcFilterColumnReq[]
	{
		const columns: GcFilterColumnReq[] = new Array<GcFilterColumnReq>();
		this.filterColumns.forEach( field =>
		{
			if ( this.debug )
			{
				console.log( "getFilter", field );
			}
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
export class GcFilterItemDirective
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
	<span [class]="title_filter">
		<span *ngIf="title_filter !== ''">* </span>
		{{ title | translate }}
		<span *ngIf="title_filter !== ''"> *</span>
	</span>
	<button mat-icon-button class="btn-toggle" [matMenuTriggerFor]="menu">
		<mat-icon>keyboard_arrow_down</mat-icon>
	</button>
</div>
<mat-menu #menu>
	<div mat-menu-item mat-filter-item [disableRipple]="true" 
						class="menu-title" color="primary">
		<div fxLayout="row">
			<div fxFlex>{{ 'Field' | translate }}</div>
			<div fxFlex fxLayoutAlign="end">{{ title | translate }}</div>
		</div>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true">
		<mat-form-field>
			<mat-select [panelClass]="'mat-elevation-z10'" 
						[placeholder]="'Conditions' | translate"
						(selectionChange)="selectCondition( $event )"
						[(value)]="conditionPosition">
				<mat-option *ngFor="let condition of conditionsList" [value]="condition.value" class="cond_option">
					{{ condition.label | translate }}
				</mat-option>
			</mat-select>
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields === 0">
		<mat-form-field>
			<mat-select [panelClass]="'mat-elevation-z10'" 
						[placeholder]="'Value' | translate"
						(selectionChange)="selectValue( $event )"
						[(value)]="valuePosition">
				<mat-option *ngFor="let item of items" [value]="item.value" class="cond_option">
					{{ item.label | translate }}
				</mat-option>
			</mat-select>
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields > 0">
		<mat-form-field>
			<input matInput [placeholder]="caption[ 0 ] | translate" [(ngModel)]="value[ 0 ]">
		</mat-form-field>
	</div>
	<div mat-menu-item mat-filter-item [disableRipple]="true" *ngIf="fields === 2">
		<mat-form-field>
			<input matInput [placeholder]="caption[ 1 ] | translate " [(ngModel)]="value[ 1 ]">
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
				'.action-button { width: 50px; margin-left: 5px; margin-right: 5px;  }',
				'.title-highlight { font-weight: bolder; }'
	]
} )
export class GcFilterHeaderComponent implements OnInit
{
	public 		conditionsList: GcConditionItem[];
	public 		conditionPosition: string;
	public 		value: string[] = new Array<string>( 2 );
	public 		valuePosition: number = null;
	public 		caption: string[] = [ 'Value', 'Max. value' ];
	public 		fields: number = 1;
	public		title_filter = ""; 
	@Input()	title: string;
	@Input()	field: string;
	@Input()	items: [];
	@Input()	filterRecord: GcFilterRecord;
	@Output()	applyFilter: EventEmitter<GcFilterEvent> = new EventEmitter<GcFilterEvent>();

	constructor()
	{
		return;
	}

	public ngOnInit(): void 
	{
		if ( isNullOrUndefined( this.items ) )
		{
			this.fields = 1;
			this.conditionsList = CONDITIONS_LIST;
		}
		else
		{
			this.conditionsList = CONDITIONS_LIST_SIMPLE;
			this.fields = 0;
		}
		return;
	}
	
	public selectValue( $event ): void
	{
		console.log( "selectValue", $event );
		return;
	}

	private findConditionItem( value: string ): GcConditionItem
	{
		let item: GcConditionItem = null;
		this.conditionsList.forEach( element => {
			if ( element.value === value )
			{
				item = element;
				return;
			}
		} );
		return ( item );
	}

	public selectCondition( $event ): void
	{
		console.log( "selectCondition", $event, this.conditionPosition, this.items );
		if ( !isNullOrUndefined( this.items ) )
		{
			this.fields = 0;
		}
		else
		{
			this.fields = 1;
			this.caption[ 0 ] = 'Value';
			const item = this.findConditionItem( $event.value );
			console.log( 'item', item ) ;
			this.fields = item.param;
			if ( this.fields === 2 )
			{
				this.caption[ 0 ] = 'Min. Value';
			}
		}
		return;
	}

	public clearColumnFilter(): void
	{
		this.value = [ null, null ];
		this.conditionPosition = null;
		this.filterRecord.clear( this.field );
		this.title_filter = "";
		const e = new GcFilterEvent();
		e.filter = null;
		this.valuePosition = null;
		this.filterRecord.event.emit( e );
		return;
	}

	public applyColumnFilter(): void 
	{
		if ( isNullOrUndefined( this.items ) )
		{
			this.filterRecord.apply( this.field, 
									 this.value, 
									 this.conditionPosition );
		}									 
		else
		{
			this.filterRecord.apply( this.field, 
									 [ this.valuePosition, null ], 
									 this.conditionPosition );
		}
		this.applyFilter.emit( { filter: this.filterRecord } );
		if ( this.filterRecord.event != null )
		{
			const e = new GcFilterEvent();
			e.filter = this.filterRecord;
			this.filterRecord.event.emit( e );
		}
		this.title_filter = "title-highlight";
		return;
	}
}
