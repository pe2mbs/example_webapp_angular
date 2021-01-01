import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { GcAuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class GcTokenInterceptorService implements HttpInterceptor 
{
  	constructor( private authService: GcAuthService ) 
	{ 
		// console.log( 'TokenInterceptorService.constructor()' );
		return;
	}

	intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>
  	{
		let newHeaders = req.headers.set( 'Content-Type', 
		 								  'application/json' )
									.set( 'Accept', 
									      'application/json' );
		// console.log( 'TokenInterceptorService.intercept()' );
		if ( this.authService.isLoggedIn() ) 
		{
			// console.log( 'TokenInterceptorService.intercept() with token' );
			newHeaders = newHeaders.set( 'Authorization', 
										 'Bearer ' + this.authService.token );
		} 
		// else
		// {
		// 	// Als we niet ingelogd zijn dan ook het token niet meesturen.
		// 	console.log( 'TokenInterceptorService.intercept() without token' );
		// }
    	return next.handle( req.clone( { headers: newHeaders } ) );
  	}
}
