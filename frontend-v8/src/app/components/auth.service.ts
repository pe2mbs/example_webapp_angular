import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface UserData
{
	username: string;
	email: string;
	password: string;
	role: string;
}


@Injectable({
  	providedIn: 'root'
})
export class AuthService 
{
	private USERTABLE: UserData[] = [
		{ 	username: 'm.bertens@pe2mbs.nl', 
			email: 'm.bertens@pe2mbs.nl',
			password: '5701mb',
			role: 'Administrator' },
		{ 	username: 'mbertens', 
			email: 'm.bertens@pe2mbs.nl',
			password: '5701mb',
			role: 'Administrator' },
	];

	public isAuthenticated = new BehaviorSubject<boolean>( false );
	private authenticated: boolean = false;

	constructor( private router: Router ) 
	{ 
		return;
	}

	// tslint:disable-next-line:variable-name
	public registerUser( p_username: string, p_email: string, p_password: string, p_role: string )
	{
		const usr: UserData = {
			username: p_username, 
			email: p_email,
			password: p_password,
			role: p_role
		};

		this.USERTABLE.push( usr );
		return;
	}

	public checkAuthenticated(): boolean
	{
    	this.isAuthenticated.next( this.authenticated );
    	return this.authenticated;
	}

	public login( username: string, password: string ): Observable<boolean>
	{
		this.USERTABLE.forEach(element => {
			console.log( element );
			if ( username === element.username && password === element.password )
			{
				console.log( 'LOGIN' );
				this.authenticated = true;
				return;
			}	
			
		});
		if ( this.authenticated ) 
		{
			this.isAuthenticated.next( this.authenticated );
			return;
		}
  		throw Error( 'Wrong username/password' );
	}

	public logout() 
	{
		try
		{
		  	this.isAuthenticated.next( false );
		  	this.router.navigate( [ '/login' ] );
		} 
		catch ( err ) 
		{
		  	console.error( err );
		}
	}
}
