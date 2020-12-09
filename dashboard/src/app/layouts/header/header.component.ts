import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
  	styles: [ 'ul li { list-style: none; }' ]
})
export class HeaderComponent
{
	// tslint:disable-next-line:no-output-on-prefix
	@Output() onToggleSidebar: EventEmitter<any> = new EventEmitter(); 

	constructor() 
	{ 
		return;
	}

	public toggleSidebar()
	{
		this.onToggleSidebar.emit();
		return;
	}
}
