import { Component, ViewChild, Input, OnChanges, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { GcCrudPageInfo } from 'src/app/layouts/crud/model';
import { GcFilterRecord } from 'src/app/layouts/filter-header.component';
import { TableDefintion } from '../../modules/demo/table-http-example';
import { GcCrudServiceBase } from 'src/app/layouts/crud/crud.service.base';
import { GcDeleteDialog } from 'src/app/layouts/dialog/delete.dialog';


@Component({
  selector: 'app-cust-data-table',
  templateUrl: 'cust.data.table.component.html',
  styleUrls: [ '../common-mat-card.scss' ]
})
export class CustDataTableComponent implements OnInit, AfterViewInit, OnChanges
{
	@Input() definition: TableDefintion<any>;  
	@Input() id: string;
	@Input() value: any;
	@Input() mode: string = "edit";

	@ViewChild( MatPaginator, { static: true }) top_paginator: MatPaginator;
	@ViewChild( MatPaginator, { static: true }) bot_paginator: MatPaginator;
	@ViewChild( MatSort, { static: true }) sort: MatSort;
	protected debug: boolean = false;
	public dataService: GcCrudServiceBase<any>;
	public dataSource: MatTableDataSource<any>;
	public paginatorEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
	public filterRecord: GcFilterRecord = null;
	public resultsLength: number = 0;
	public isLoadingResults: boolean = true;
	public pageData: GcCrudPageInfo = { pageIndex: 0, pageSizeOptions: [ 5,10,25,100 ], pageSize: 10, filters: [] };
	public displayedColumns: string[] = null;
	public self: CustDataTableComponent;
	public filterField = '';
	constructor( protected dialog: MatDialog )
	{
		this.debug = true;
		this.self = this;
		this.dataSource = new MatTableDataSource<any>();
		return;
	}

	private isPageEvent( event: any )
	{
		const pev: PageEvent = event as PageEvent;
		return ( pev && !isNullOrUndefined( pev.pageIndex ) );
	}

	ngOnInit() 
	{
		const filterFields = new Array<string>();
		console.log( `mode: ${this.mode} id: ${this.id} value: ${this.value}` );
		if ( this.mode === 'filter' )
		{
			// Custom filter, need to remove the column from the view
			this.filterField = this.id;
		}
		this.displayedColumns = new Array<string>();
		this.definition.columns.forEach( elem => {
			console.log( 'ngOnChanges => ', elem );
			if ( elem.display && this.filterField !== elem.columnDef )
			{
				this.displayedColumns.push( elem.header );
			}
			if ( elem.filter )
			{
				filterFields.push( elem.columnDef );
			}
		} );
		this.filterRecord = new GcFilterRecord( filterFields );
		if ( !isNullOrUndefined( this.filterRecord ) && this.mode === 'filter' )
		{
			this.filterRecord.set( this.id, this.value );
		}
		this.dataService = this.definition.dataService;
		return;
	}

	public ngOnChanges(): void
	{
		console.log( 'ngOnChanges' );
		if ( !isNullOrUndefined( this.filterRecord ) && this.mode === 'filter' )
		{
			this.filterRecord.set( this.id, this.value );
			this.filterRecord.event.emit();
		}
		return;
	}

	public refresh(): void
	{
		if ( this.debug )
		{
			console.log( 'GcTableBase.refresh' );
		}
		const o = new PageEvent();
		o.pageIndex = this.top_paginator.pageIndex;
		o.pageSize = this.top_paginator.pageSize;
		o.length = this.top_paginator.length;
		o.previousPageIndex = this.top_paginator.pageIndex;
		this.paginatorEvent.emit( o );
		return;
	}

	protected setPaginator( paginator: MatPaginator, o: PageEvent ): void
	{
		paginator.pageIndex = o.pageIndex;
		paginator.pageSize = o.pageSize;
		paginator.length = o.length;
		return;
	}

	public pagingEvent( $event, source: string )
	{
		if ( source === 'top' )
		{
			this.setPaginator( this.bot_paginator, $event );
		}
		else
		{
			this.setPaginator( this.top_paginator, $event );
		}
		this.pageData.pageIndex = $event.pageIndex;
		this.pageData.pageSize =  $event.pageSize;  
		this.pageData.filters = this.filterRecord.getFilters();
		this.definition.profileService.setParam( this.definition.name, 
												 this.pageData );
		this.paginatorEvent.emit( $event );
		return;
	}

	public ngAfterViewInit(): void
	{
		if ( this.debug )
		{
			console.log( 'GcTableBase.ngAfterViewInit' );
		}
		merge( this.paginatorEvent, this.sort.sortChange, this.filterRecord.event )
      		.pipe( startWith( {} ),
				switchMap( ($event) => {
					if ( $event instanceof PageEvent || this.isPageEvent( $event ) )
					{
						const event = $event as PageEvent;
						if ( this.debug )
						{
							console.log( "GcTableBase.PageEvent", event );
						}
						this.pageData.pageIndex = event.pageIndex;
						this.pageData.pageSize = event.pageSize;
					}
					else
					{
						if ( this.debug )
						{
							console.log( "GcTableBase.Event", $event );
						}
						this.pageData.pageIndex = 0;
					}
					if ( this.debug )
					{
						console.log( `GcTableBase.req.index: ${this.pageData.pageIndex} length: ${this.resultsLength}` );
					}
					this.isLoadingResults = true;
					return ( this.dataService.getPage( this.pageData.pageIndex,
													   this.pageData.pageSize,
													   this.sort, 
													   this.filterRecord ) );
				} ),
				map( (data: any ) => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.resultsLength = data.recordCount;
					if ( this.debug )
					{
						console.log( `GcTableBase.map.index: ${this.pageData.pageIndex} length: ${this.resultsLength}` );
						console.log( 'GcTableBase.data.records', data.records );
						console.log( 'GcTableBase.data.recordCount', data.recordCount );
						console.log( 'GcTableBase.isLoadingResults', this.isLoadingResults );
					}
					return ( data.records );
				} ),
				catchError( err => {
					console.error( "GcTableBase.catchError", err );
					this.isLoadingResults = false;
					return observableOf( [] );
				} 
			)
		).subscribe( ( data: any[] ) => {
			this.dataSource.data = data;
		} );
		return;
	}

	public deleteRecord( idx: number, row: any, id_field: string, header: string = null, fieldname: string = null ): void
	{
		if ( this.debug )
		{
			console.log( 'CustDataTableComponent.deleteRecord( idx = ', idx, 
						 ", row = ", row, 
						 ", id_field = ", id_field,
						 ", header = ", fieldname,
						 ", fieldname = ", fieldname, " )" );
		}
		this.dataService.lockRecord( row );
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.width = "auto";
		dialogConfig.data = { record: row,
			title: header,
			field: fieldname,
			id: id_field,
			value: row[ fieldname ] || null,
			mode: 'delete',
			service: this.dataService 
		};
        const dialogRef = this.dialog.open( GcDeleteDialog, dialogConfig );
        dialogRef.afterClosed().subscribe( result =>
        {
			if ( this.debug )
			{
				console.log( 'deleteItem() dialog result ', result );
			}
			this.dataService.unlockRecord( row );
            this.refresh();
		} );	
		return;
	}
}
