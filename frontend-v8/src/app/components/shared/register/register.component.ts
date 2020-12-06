import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
{
	Roles: any = [ 'Test engineer', 'Team lead', 'Administator' ];
	form: FormGroup;
  	constructor( private fb: FormBuilder, private authService: AuthService ) 
  	{ 
		return;
	}

	ngOnInit() 
	{
		this.form = this.fb.group( {
			username: 	[ '', Validators.required ],
			email: 		[ '', Validators.email ],
			password: 	[ '', Validators.required ],
			role: 		[ '', Validators.required ]
	  } );
		return;
	}
	  
	public onSubmit()
	{
		if ( this.form.valid ) 
		{
			try 
			{
        		const username = this.form.get( 'username' ).value;
				const password = this.form.get( 'password' ).value;
				const email = this.form.get( 'email' ).value;
				const role = this.form.get( 'role' ).value;
				this.authService.registerUser( username, email, password, role );
			}
			catch (err) 
			{
				console.log( err );
			}
		}
		return;
	}
}
