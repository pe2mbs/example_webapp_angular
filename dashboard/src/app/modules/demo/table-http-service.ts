import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GcCrudServiceBase } from 'src/app/layouts/crud/crud.service.base';
import { TrackingRecord } from './model';


@Injectable()
export class ExampleHttpDatabase extends GcCrudServiceBase<TrackingRecord>
{
	/** An example database that the data source uses to retrieve data for the table. */
	constructor( _httpClient: HttpClient ) 
	{
		super( _httpClient, 'tracking' );
		return;
	}
}

