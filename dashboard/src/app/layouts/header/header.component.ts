import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';
import { environment } from 'src/environments/environment';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
	styles: [ 'ul li { list-style: none; }',
			  'img { height: 30px; opacity: 1; padding: 5px 5px; }',
			  '.logo { margin-top: 15px;' ]
})
export class HeaderComponent
{
	// tslint:disable-next-line:no-output-on-prefix
	@Output() onToggleSidebar: EventEmitter<any> = new EventEmitter(); 
	headerTitle: string = 'Application';
	headerLogo: string = 'logo.png';

	constructor() 
	{ 
		if ( environment.headerTitle !== undefined && environment.headerTitle != null )
		{
			this.headerTitle = environment.headerTitle;
		}
		if ( environment.headerLogo !== undefined && environment.headerLogo != null )
		{
			this.headerLogo = environment.headerLogo;
		}
		return;
	}

	public toggleSidebar()
	{
		this.onToggleSidebar.emit();
		return;
	}
}
