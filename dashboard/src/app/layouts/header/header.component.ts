import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile.service';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
	styles: [ 'ul li { list-style: none; }',
			  'img { height: 30px; opacity: 1; padding: 5px 5px; }',
			  '.logo { margin-top: 15px;' ]
})
export class HeaderComponent implements OnInit
{
	// tslint:disable-next-line:no-output-on-prefix
	@Output() onToggleSidebar: EventEmitter<any> = new EventEmitter(); 
	headerTitle: string = 'Application';
	headerLogo: string = 'logo.png';
    themeColor: string = 'light-theme';
    
	constructor( protected profileService: ProfileService ) 
	{ 
		if ( environment.headerTitle !== undefined && environment.headerTitle != null )
		{
			this.headerTitle = environment.headerTitle;
		}
		if ( environment.headerLogo !== undefined && environment.headerLogo != null )
		{
			this.headerLogo = environment.headerLogo;
		}
		this.profileService.changeEvent.subscribe( data => {
			this.themeColor = data.theme;
		} );
		this.themeColor = this.profileService.theme;
		return;
	}

	public ngOnInit(): void
	{
		this.themeColor = this.profileService.theme;
		return;
	}

	public toggleSidebar()
	{
		this.onToggleSidebar.emit();
		return;
	}
}
