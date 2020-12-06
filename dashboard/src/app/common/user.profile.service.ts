import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UserProfileService
{
	private api = '/api/gn_user/profile';
	private internalData: any = {};

	constructor( private http: HttpClient )
    {
		http.get<any>( this.api ).subscribe( data => {
			this.internalData = data;
		} );
        return;
	}

	private updateToServer(): void 
	{
		this.http.post<any>( this.api, this.internalData ).subscribe( result => {
			console.log( "updateToServer done" );
		} );
		return;
	}

	public getVariable( component: string, variable: string, default_value: any = null ): any
	{
		const name = component + '.' + variable;
		if ( this.internalData[ name ] !== undefined || this.internalData[ name ] != null ) 
		{
			return ( this.internalData[ name ] );
		}
		return ( default_value );
	}

	public setVariable( component: string, variable: string, value: any ): void
	{
		this.internalData[ component + '.' + variable ] = value;
		this.updateToServer();
		return;
	}

	// Public member functions for TableComponent
	public getComponentSize( name: string ): number
	{
		return this.getVariable( name, 'size', 10 );
	}

	public setComponentSize( name: string, size: number )
	{
		this.setVariable( name, 'size', size ); 
		return;
	}

	public getComponentIndex( name: string ): number
	{
		return this.getVariable( name, 'index', 1 );
	}

	public setComponentIndex( name: string, size: number )
	{
		this.setVariable( name, 'index', size ); 
		return;
	}

	public getComponentFilter( name: string ): number
	{
		return this.getVariable( name, 'filter', '' );
	}

	public setComponentFilter( name: string, filter: string )
	{
		this.setVariable( name, 'filter', filter ); 
		return;
	}

}
