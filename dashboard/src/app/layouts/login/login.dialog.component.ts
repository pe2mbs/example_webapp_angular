import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, SignupData } from '../auth.service';
import { SignupDialogComponent } from './signup.dialog.component';


export interface Credentials 
{
    userid: string;
    password: string;
    keepsignedin: boolean;
}

@Component({
  	selector: 'app-login-dialog',
  	templateUrl: 'login.dialog.component.html',
	styles: [ '.form-field { width: 100%; }',
			  '.login-form { height: 170px; }' ]
})
export class LoginDialogComponent
{
	public showPw: boolean = false;
    public keepSignedIn: boolean;
    public invalidLogin: boolean;
	public loginForm: FormGroup;
	
	constructor( public dialogRef: MatDialogRef<LoginDialogComponent>
			   , @Inject( MAT_DIALOG_DATA ) public data: any
			   , private fb: FormBuilder
			   , private authService: AuthService
			   , private signupDialog: MatDialog ) 
	{ 
		dialogRef.disableClose = true;
		this.loginForm = this.fb.group( {
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

	public onSignupClick(): void
	{
		const signupDialogRef = this.signupDialog.open( SignupDialogComponent, {  
			autoFocus: true,
			width: '400px',
			height: '700px',
			data: null
		} );
		signupDialogRef.afterClosed().subscribe( (result: SignupData) => {
			this.authService.signup( result	).subscribe();
		} );
	}

	public onLogonClick(): void 
	{
		const credentials: Credentials = { 
			userid: this.loginForm.value.userid, 
			password: this.loginForm.value.password,
			keepsignedin: this.loginForm.value.keepSignedIn
		};
		this.authService.login( credentials ).subscribe( result => {
			if ( result ) 
			{
				this.dialogRef.close();
			} 
			else 
			{
				this.invalidLogin = true;
			}
		},
		err => {
			this.invalidLogin = true;
		} );
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
