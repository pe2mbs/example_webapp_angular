import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
	constructor( protected router: Router, 
				 protected authService: AuthService ) 
	{
		console.log( 'AuthGuard.constructor()' );
		return;
	}
 
	canActivate() 
	{
		console.log( 'AuthGuard.canActivate()' );
		if ( this.authService.isLoggedIn() ) 
		{
			console.log( 'true' );
			return ( true );
		}
		console.log( 'false - login' );
    	this.router.navigate( [ '/login' ] );
    	return ( false );
  	}
}

