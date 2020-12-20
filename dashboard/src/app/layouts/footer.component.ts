import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  	selector: 'app-footer',
  	template: `<footer>{{footerText}}</footer>`,
  	styles: ['footer { padding: 10px; }']
})
export class FooterComponent
{
	footerText: string = 'Webapp2 Python-flask angular core, \u00A9 Copyright 2017-2020 All rights reserved by Marc Bertens-Nguyen';

	constructor() 
	{ 
		if ( environment.footerText !== undefined && environment.footerText != null )
		{
			this.footerText = environment.footerText; 
		}
		return;
	}
}
