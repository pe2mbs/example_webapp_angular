import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherComponent } from './layouts/theme-switcher.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit 
{
	constructor( public themeSwitch: ThemeSwitcherComponent )
	{
		return;
	}

	ngOnInit()
	{
		this.themeSwitch.setDefaultTheme();
		return;
	}
}
