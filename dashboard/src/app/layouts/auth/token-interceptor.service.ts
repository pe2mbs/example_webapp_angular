import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { GcAuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  	providedIn: 'root'
})
export class GcTokenInterceptorService implements HttpInterceptor 
{
  	constructor( private authService: GcAuthService ) 
	{ 
		return;
	}

	intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>
  	{
		let newHeaders = req.headers.set( 'Content-Type', 
		 								  'application/json' )
									.set( 'Accept', 
									      'application/json' );
		if ( this.authService.isLoggedIn() ) 
		{
			newHeaders = newHeaders.set( 'Authorization', 
										 'JWT ' + this.authService.token );
							 
		} 
		return next.handle( req.clone( { headers: newHeaders } ) );
  	}
}
