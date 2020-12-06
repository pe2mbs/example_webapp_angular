import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  	selector: 'app-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
	// tslint:disable-next-line:no-output-on-prefix
	@Output() onToggleSidebar: EventEmitter<any> = new EventEmitter(); 

	constructor() 
	{ 
		return;
	}

	ngOnInit() 
	{
		return;
	}

	public toggleSidebar()
	{
		this.onToggleSidebar.emit();
	}
}
