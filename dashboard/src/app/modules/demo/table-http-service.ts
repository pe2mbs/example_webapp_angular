import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterRecord, FilterColumnReq } from '../../common/filter-header.component';
import { MatSort } from '@angular/material/sort';

export interface PagingData
{
	pageIndex: number;
	pageSize: number;
	recordCount: number;
	records: any[];
}

export interface SortingRequest
{
	column: string;
	direction?: string; 
}

export interface PagingRequest
{
	pageIndex: number;
	pageSize: number;
	sorting?: SortingRequest;
	filters?: FilterColumnReq[];
}

@Injectable()
export class ExampleHttpDatabase 
{
	/** An example database that the data source uses to retrieve data for the table. */
	constructor( private _httpClient: HttpClient ) 
	{
		return;
	}

	public getPage( page: number, size: number, 
					sort: MatSort = null,
					filterRecord: FilterRecord ): 
											Observable<PagingData> 
	{
		const pagingRequest: PagingRequest = {
			pageIndex: page,
			pageSize: size,
		};
		if ( sort != null )
		{
			pagingRequest.sorting = {
				column: sort.active,
				direction: sort.direction
			};
		}
		if ( filterRecord != null )
		{	
			pagingRequest.filters = filterRecord.getFilters();
		}
		return this._httpClient.post<PagingData>( '/api/tracking/pagedlist', 
												  pagingRequest );
  	}
}

