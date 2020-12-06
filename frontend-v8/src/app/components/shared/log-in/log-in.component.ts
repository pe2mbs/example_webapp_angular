import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit 
{
	form: FormGroup;
	public loginInvalid: boolean;
	private formSubmitAttempt: boolean;
	private returnUrl: string;
	
  	constructor( private fb: FormBuilder
      		   , private route: ActivatedRoute
    		   , private router: Router
			   , private authService: AuthService ) 
	{ 
		return;
	}

	ngOnInit() 
	{
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
		this.form = this.fb.group( {
		  	username: ['', Validators.required],
		  	password: ['', Validators.required]
		} );
	
		if ( this.authService.checkAuthenticated() ) 
		{
		 	this.router.navigate( [ this.returnUrl ] );
		}
		return;
	}
	
	async onSubmit() 
	{
    	this.loginInvalid = false;
    	this.formSubmitAttempt = false;
		if ( this.form.valid ) 
		{
			try 
			{
        		const username = this.form.get( 'username' ).value;
				const password = this.form.get( 'password' ).value;
				await this.authService.login( username, password );
				if ( this.authService.isAuthenticated )
				{
					this.router.navigate( [ '/screen' ] );
				}
			} 
			catch (err) 
			{
        		this.loginInvalid = true;
      		}
		} 
		else 
		{
      		this.formSubmitAttempt = true;
    	}
  	}
}
