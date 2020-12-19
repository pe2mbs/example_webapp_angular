import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ExampleHttpDatabase } from './table-http-service';
import { FilterRecord } from '../common/filter-header.component';
import { Router } from '@angular/router';

export class CardTableBase<T> implements AfterViewInit
{
	@ViewChild( MatPaginator, { static: false } ) top_paginator: MatPaginator;
	@ViewChild( MatPaginator, { static: false } ) bot_paginator: MatPaginator;
	@ViewChild( MatSort, { static: false } ) sort: MatSort;
	public paginatorEvent: EventEmitter<PageEvent>;
	public pageSizeOptions = [ 5, 10, 25, 100 ];
	public resultsLength = 0;
	public pageIndex = 0;
	public pageSize = 5;
	public isLoadingResults = true;
	public displayedColumns: string[];
	public records: any[] = [];
	public filterRecord: FilterRecord = null;
	constructor( public dataService: ExampleHttpDatabase, displayedColumns: string[] )
	{
		this.filterRecord = new FilterRecord( displayedColumns );
		this.paginatorEvent = new EventEmitter<PageEvent>();
		this.displayedColumns = displayedColumns;
		return;
	}

	public pagingEvent( $event, source )
	{
		if ( source === 'top' )
		{
			this.bot_paginator.pageIndex = $event.pageIndex;
			this.bot_paginator.pageSize = $event.pageSize;
			this.bot_paginator.length = $event.length;
		}
		else
		{
			this.top_paginator.pageIndex = $event.pageIndex;
			this.top_paginator.pageSize = $event.pageSize;
			this.top_paginator.length = $event.length;
		}
		this.pageIndex = $event.pageIndex;
		this.pageSize = $event.pageSize; 
		this.paginatorEvent.emit( $event );
		return;
	}

	public firstPage(): void
	{
		this.top_paginator.pageIndex = 0;
		this.bot_paginator.pageIndex = 0;
		return;
	}

	public ngAfterViewInit(): void
	{
		this.filterRecord.event = this.paginatorEvent;
    	// If the user changes the sort order, reset back to the first page.
    	this.sort.sortChange.subscribe( () => this.firstPage() );
    	merge(this.sort.sortChange, this.paginatorEvent )
      		.pipe( startWith( {} ),
        		   switchMap( () => {
          				this.isLoadingResults = true;
						return this.dataService.getPage( this.pageIndex,
														 this.pageSize,
														 this.sort, 
														 this.filterRecord );
        			} ),
        			map( data => {
          				// Flip flag to show that loading has finished.
          				this.isLoadingResults = false;
          				this.resultsLength = data.recordCount;
          				return ( data.records );
        			} ),
        			catchError( () => {
          				this.isLoadingResults = false;
          				return observableOf( [] );
        			} )
      	).subscribe( data => this.records = data );
	  }
	  
	public refresh(): void
	{
		this.paginatorEvent.emit( null );
		return;
	}
}	

export class RecordLocksRecord
{
    L_ID: number;
    L_USER: string;
    L_TABLE: string;
    L_RECORD_ID: number;
    L_START_DATE: Date;

}

/**
 * @title Table retrieving data through HTTP
 */
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'table-http-example',
	styleUrls: [ 'table-http-example.css', 
				 '../common/common-mat-card.scss' ],
	templateUrl: 'table-http-example.html'
})
// tslint:disable-next-line:component-class-suffix
export class TableHttpExample extends CardTableBase<RecordLocksRecord>  
{
	constructor( private _service: ExampleHttpDatabase,
				 public router: Router ) 
	{
		super( _service,
			   [ 'L_USER', 'L_START_DATE', 'L_TABLE', 'L_RECORD_ID' ] );
		return; 
	}
}
