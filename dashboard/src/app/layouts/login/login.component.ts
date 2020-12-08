import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


export interface Credentials 
{
    userid: string;
    password: string;
    keepsignedin: boolean;
}


@Component({
    selector: 'app-signin-dialog',
    templateUrl: './login.component.html',
	styles: [ `.login-card 
{ 
	
}

mat-form-field
{
	width: 100%;
}	
	` ]
})
export class LoginComponent 
{
    public showPw: boolean = false;
    public keepSignedIn: boolean;
    public invalidLogin: boolean;
    public loginForm: FormGroup;

    constructor( private fb: FormBuilder,
				 private router: Router,
        		 private authService: AuthService,
        		 private route: ActivatedRoute ) 
	{ 
		this.loginForm = fb.group( {
			userid : new FormControl(
				'',
				[Validators.required, Validators.minLength( 7 ) ]
			),
			password : new FormControl(
				'',
				[Validators.required, Validators.minLength( 6 ) ]
			),
			keepSignedIn : new FormControl()
		} );
		return;
	}

	public onSubmit(): void 
	{
		const credentials: Credentials = { 
				userid: this.loginForm.value.userid, 
				password: this.loginForm.value.password,
				keepsignedin: this.loginForm.value.keepSignedIn
		};
		this.authService.login( credentials ).subscribe( 
			result => {
				if ( result ) 
				{
					const returnUrl = this.route.snapshot.queryParamMap.get( 'returnUrl' );
					console.log( 'returnUrl', returnUrl );
					if ( returnUrl === undefined || returnUrl == null )
					{
						this.router.navigate( [ '/' ] );	
					}
					this.router.navigate( [ returnUrl ] );
				} 
				else 
				{
					this.invalidLogin = true;
            	}
        	},
        	err => {
				this.invalidLogin = true;
        } );

    }

	public onCancel(): void 
	{
		return;
    }

	get userid() 
	{
        return this.loginForm.get( 'userid' );
    }

	get password() 
	{
        return this.loginForm.get( 'password' );
    }
}
