import { MatPaginator, MatSort, PageEvent, MatDialog, MatTableDataSource } from '@angular/material';
import { AfterViewInit, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
// Gencrud components
import { GcSubscribers } from '../subscribers';
import { GcProfileService } from '../profile/profile.service';
import { GcFilterRecord } from '../filter-header.component';
import { GcCrudPageInfo } from './model';
import { GcCrudServiceBase } from './crud.service.base';
import { GcDeleteDialog } from '../dialog/delete.dialog';
import { ComponentType } from '@angular/cdk/overlay';


export interface TableButton
{
	label: string;
	icon: string;
	action: any;
}

export interface TableColumn2
{
	columnDef: string;
	header: string;
	display: boolean;
	cell: any;
	width?: string;
	filter?: boolean;
	sort?: boolean;
	buttons?: TableButton[];
}

export class GcTableBaseAuto<T> extends GcSubscribers implements AfterViewInit
{
	@ViewChild( MatPaginator, { static: false } ) top_paginator: MatPaginator;
	@ViewChild( MatPaginator, { static: false } ) bot_paginator: MatPaginator;
	@ViewChild( MatSort, { static: false } ) sort: MatSort;
	public paginatorEvent: EventEmitter<PageEvent>;
	public resultsLength = 0;
	public isLoadingResults = true;
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<T>;
	public records: T[];
	public filterRecord: GcFilterRecord = null;
	public pageData: GcCrudPageInfo = { pageIndex: 0, pageSizeOptions: [ 5,10,25,100 ], pageSize: 10, filters: [] };
	protected subscriber: Subscription;
	constructor( private objectName: string,
				 public tableColumns: TableColumn2[],
				 public dataService: GcCrudServiceBase<T>, 
				 public profileService: GcProfileService,
				 public dialog: MatDialog,
				 protected addEditDialog: ComponentType<T> = null,
				 private ref: ChangeDetectorRef = null )
	{
		super();
		const filterFields = new Array<string>();
		this.displayedColumns = new Array<string>();
		this.tableColumns.forEach( element => {
			this.displayedColumns.push( element.columnDef );
			if ( element.filter )
			{
				filterFields.push( element.columnDef );
			}
		} );
		this.filterRecord = new GcFilterRecord( filterFields );
		this.paginatorEvent = new EventEmitter<PageEvent>();
		this.dataSource = new MatTableDataSource<T>();
		console.log( 'GcTableBase.constructor' );
		return;
	}

	protected setPaginator( paginator: MatPaginator, o: PageEvent ): void
	{
		paginator.pageIndex = o.pageIndex;
		paginator.pageSize = o.pageSize;
		paginator.length = o.length;
		return;
	}

	public pagingEvent( $event, source )
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
		this.profileService.setParam( this.objectName, this.pageData );
		this.paginatorEvent.emit( $event );
		return;
	}

	private isPageEvent( event )
	{
		const pev: PageEvent = event as PageEvent;
		return ( !isNullOrUndefined( pev.pageIndex ) );
	}

	public ngAfterViewInit(): void
	{
		console.log( 'GcTableBase.ngAfterViewInit' );
		console.log( 'sort', this.sort );
		this.pageData = this.profileService.getParam( this.objectName, this.pageData );
		this.registerSubscription( this.profileService.changeEvent.subscribe( event => {
			const pageData = this.profileService.getParam( this.objectName, this.pageData );
			if ( pageData.pageIndex !== this.pageData.pageIndex || pageData.pageSize !== this.pageData.pageSize )
			{
				console.log( 'GcTableBase.profileService.changeEvent' );
				const o = new PageEvent();
				o.pageIndex = pageData.pageIndex;
				o.pageSize = pageData.pageSize;
				o.length = this.resultsLength;
				this.paginatorEvent.emit( o );
			}
		} ) );
		this.registerSubscription( merge( this.sort.sortChange, 
										  this.paginatorEvent, 
										  this.filterRecord.event )
      		.pipe( startWith( {} ),
				switchMap( ($event) => {
					if ( $event instanceof PageEvent || this.isPageEvent( $event ) )
					{
						const event = $event as PageEvent;
						console.log( "GcTableBase.PageEvent", event );
						this.pageData.pageIndex = event.pageIndex;
						this.pageData.pageSize = event.pageSize;
					}
					else
					{
						console.log( "GcTableBase.Event", $event );
						this.pageData.pageIndex = 0;
					}
					console.log( `GcTableBase.req.index: ${this.pageData.pageIndex} length: ${this.resultsLength}` );
					this.isLoadingResults = true;
					return this.dataService.getPage( this.pageData.pageIndex,
													 this.pageData.pageSize,
													 this.sort, 
													 this.filterRecord );
				} ),
				map( data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.resultsLength = data.recordCount;
					console.log( `GcTableBase.map.index: ${this.pageData.pageIndex} length: ${this.resultsLength}` );
					console.log( 'GcTableBase.data.records', data.records );
					console.log( 'GcTableBase.data.recordCount', data.recordCount );
					console.log( 'GcTableBase.isLoadingResults', this.isLoadingResults );
					return ( data.records );
				} ),
				catchError( () => {
					this.isLoadingResults = false;
					return observableOf( [] );
				} 
			)
		).subscribe( data => {
			this.records = data;
			this.dataSource.data = data; 
			if ( this.ref != null )
			{
				this.ref.detectChanges();
			}
		} ) );
		return;
	}
	  
	public refresh(): void
	{
		console.log( 'GcTableBase.refresh' );
		const o = new PageEvent();
		o.pageIndex = this.top_paginator.pageIndex;
		o.pageSize = this.top_paginator.pageSize;
		o.length = this.top_paginator.length;
		o.previousPageIndex = this.top_paginator.pageIndex;
		this.paginatorEvent.emit( o );
		return;
	}

	public deleteRecord( i: number, record: T, fieldname: string = null ): void
	{
		console.log( 'GcTableBase.deleteRecord' );
        this.dataService.lockRecord( record );
        const dialogRef = this.dialog.open( GcDeleteDialog,
        {
            data: { record,
                    label: record[ fieldname ] || null,
                    mode: 'delete' }
        } );

        dialogRef.afterClosed().subscribe( result =>
        {
			console.log( 'deleteItem() dialog result ', result );
			this.dataService.unlockRecord( record );
            if ( result === 1 )
            {
                this.refresh();
            }
		} );	
		return;
	}

	public newRecord()
	{
		console.log( 'GcTableBase.newRecord - not implemented' );
	}

	public addRecord(): void
    {
		console.log( 'GcTableBase.addRecord' );
        const nRecord = this.newRecord();
        const dialogRef = this.dialog.open( this.addEditDialog,
        {
            data: { record: nRecord,
                    mode: 'add' },
        } );
        const height: number = ( 6 * 72 ) + 130;
        dialogRef.afterClosed().subscribe( result =>
        {
            console.log( 'addNew() dialog result ', result );
            if ( result === 1 )
            {
                // After dialog is closed we're doing frontend updates
                this.refresh();
            }
        } );
        dialogRef.updateSize( '85%', height.toString() + 'px' );
        return;
	}

	public editRecord( foundIndex: number, edit_record: T ): void
    {
		console.log( 'GcTableBase.editRecord' );
        this.dataService.lockRecord( edit_record );
        const height: number = ( 6 * 72 ) + 190;
        const dialogRef = this.dialog.open( this.addEditDialog,
        {
            data: { record:     edit_record,
                    mode:       'edit' },
        } );
        dialogRef.updateSize( '85%', height.toString() + 'px' );
        dialogRef.afterClosed().subscribe( result =>
        {
			console.log( 'editRecord() dialog result ', result );
			this.dataService.unlockRecord( edit_record );
            this.refresh();
        } );
        return;
    }
}	
