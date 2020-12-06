import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-default',
  	templateUrl: './default.component.html',
  	styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit 
{
	public sideBarOpen: boolean = true;

	constructor() 
	{ 
		return;
	}

	public ngOnInit(): void
	{
		return;
	}

	public doToggleSidebar( $event ): void
	{
		this.sideBarOpen = !this.sideBarOpen;
		return;
	}
}
