import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class HelpService 
{
	constructor( private httpSession: HttpClient ) 
	{ 
		return;
	}

	public getHelp( name: string ): Observable<string>
	{
		return ( this.httpSession.get<string>( '/api/help/' + name ) );
	}
}
