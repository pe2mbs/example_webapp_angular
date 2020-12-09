import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";


interface AuthResponse
{
	result: boolean;
	token?: string;
}

export interface SignupData
{
	username: string;
	password: string;
	email: string;
	firstname: string;
	middlename: string;
	lastname: string;
}


@Injectable()
export class AuthService 
{
	private jwtHelper = new JwtHelperService();
	private _userName: string;
	private _userProfile: number;
	private _userParameters: any;
	private _userRole: string;
  	currentUser: any; 

	constructor( private http: HttpClient ) 
	{
		if ( this.isLoggedIn() )
		{
			this.currentUser = this.jwtHelper.decodeToken( this.token );
			this._userName 		= this.currentUser.username;
			this._userProfile	= this.currentUser.profile;
			this._userRole 		= this.currentUser.userrole;
		} 
		return;
  	}

	public login( credentials ): Observable<boolean>
	{
		return ( this.http.post<AuthResponse>( '/api/users/authenticate', JSON.stringify( credentials ) ).pipe( 
			map( response => {
				if ( response && response.result ) 
				{
					localStorage.setItem( 'token', response.token );
					this.currentUser = this.jwtHelper.decodeToken( response.token );
					this._userName 			= this.currentUser.username;
					this._userProfile		= this.currentUser.profile;
					this._userParameters	= this.currentUser.parameters;
					this._userRole 			= this.currentUser.userrole;
					return ( true ); 
				}
				else 
				{
					return ( false ); 
				}
			} ) 
		) );
	}
	  
	public signup( data: SignupData )
	{
		return ( this.http.post<AuthResponse>( '/api/users/signup', JSON.stringify( data ) ).pipe( 
			map( response => {
				return ( response && response.result ); 
			} )  
		) );
	}

	public logout(): void
	{
    	localStorage.removeItem( 'token' );
		this.currentUser = null;
		return;
  	}

	public isLoggedIn(): boolean
	{ 
    	const token = this.token;
		if ( !token ) 
		{
      		return ( false );
		}
		const result = this.jwtHelper.isTokenExpired( token );
		return ( !result );
	}
	  
	get userName() 
	{
		return this._userName;
	}

	get userProfile() 
	{
		return this._userProfile;
	}

	get userProfileParmeters()
	{
		return ( this._userParameters );
	}

	get userRole() 
	{
		return this._userRole;
	}

	get fullName()
	{
		if ( !this.token ) 
		{
		  	return ( false );
		}
		const jsonToken = this.jwtHelper.decodeToken( this.token );
		return ( jsonToken.fullname );
	}
	
	get token() 
	{
		return ( localStorage.getItem( 'token' ) );
	}
}
