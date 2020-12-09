import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-footer',
  	template: `<footer>
	Webapp2 Python-flask angular core, &copy; 2019-2020 All rights reserved by Marc Bertens-Nguyen
</footer>`,
  	styles: ['footer { padding: 10px; }']
})
export class FooterComponent
{
	constructor() 
	{ 
		return;
	}
}
