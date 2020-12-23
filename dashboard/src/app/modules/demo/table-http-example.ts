import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ExampleHttpDatabase } from './table-http-service';
import { FilterRecord } from '../../common/filter-header.component';
import { Router } from '@angular/router';
import { ProfileService, ProfilePageInfo } from 'src/app/layouts/profile.service';


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
	protected objData: ProfilePageInfo = null;
	constructor( private objectName: string,
				 public dataService: ExampleHttpDatabase, 
				 displayedColumns: string[],
				 public profileService: ProfileService )
	{
		this.filterRecord = new FilterRecord( displayedColumns );
		this.paginatorEvent = new EventEmitter<PageEvent>();
		this.displayedColumns = displayedColumns;
		this.objData = this.profileService.getPageSettings( objectName );
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
		this.objData.setNumber( 'pageIndex', $event.pageIndex );
		this.objData.setNumber( 'pageSize', $event.pageSize );  
		this.objData.setParam( 'filters', this.filterRecord.getFilters() );
		this.profileService.setPageSetting( this.objData );
		this.paginatorEvent.emit( $event );
		return;
	}

	public firstPage(): void
	{
		this.top_paginator.pageIndex = 0;
		this.bot_paginator.pageIndex = 0;
		const o = new PageEvent();
		o.pageIndex = 0;
		o.pageSize = this.top_paginator.pageSize;
		o.length = this.top_paginator.length;
		o.previousPageIndex = this.top_paginator.pageIndex;
		this.paginatorEvent.emit( o );
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
				} 
			)
		).subscribe( data => this.records = data );
		return;
	}
	  
	public refresh(): void
	{
		this.paginatorEvent.emit( null );
		return;
	}
}	

export class TrackingRecord
{
    T_ID: number;
    T_USER: string;
    T_TABLE: string;
    T_ACTION: number;
    T_RECORD_ID: number;
    T_CHANGE_DATE_TIME: Date;
    T_CONTENTS: string;
    T_ACTION_LABEL: string;
}

/**
 * @title Table retrieving data through HTTP
 */
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'table-http-example',
	styleUrls: [ 'table-http-example.css', 
				 '../../common/common-mat-card.scss' ],
	templateUrl: 'table-http-example.html'
})
// tslint:disable-next-line:component-class-suffix
export class TableHttpExample extends CardTableBase<TrackingRecord>  
{
	constructor( private _service: ExampleHttpDatabase,
				 public router: Router,
				 profileService: ProfileService ) 
	{
		super( 	'DemoTable',
				_service,
				[ 'T_USER', 'T_CHANGE_DATE_TIME', 'T_TABLE', 'T_ACTION_LABEL' ],
				profileService );
		return; 
	}
}
