import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { MenuItem } from './model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class NavService 
{
	constructor( private http: HttpClient ) 
	{ 
		return;
	}

	public menuItems(): Observable<MenuItem[]>
	{
		return ( this.http.get<MenuItem[]>( environment.apiUrl + '/menu' ) );
	}
}
