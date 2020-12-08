import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-theme-switcher',
  	templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent implements OnInit 
{
	public themes = [
		{ label: 'Light', value: 'light-theme' },
		{ label: 'Dark', value: 'dark-theme' },
		{ label: 'Extra', value: 'extra-theme' },
		{ label: 'Purple', value: 'purple-theme' },
	];
	private themeIndex: number = 0;
	// let's define default theme
	public themeColor = 'light-theme';

	constructor() 
	{
		return;
	}

	public ngOnInit(): void 
	{
	    this.setDefaultTheme();
		return;
	}

	public setDefaultTheme(): void 
	{
		// if theme is stored in storage - use it
		if ( localStorage.getItem( 'pxTheme' ) )
		{
			// set theme color to one from storage
			this.themeColor = localStorage.getItem( 'pxTheme' );
			this.themeIndex = this.themes.findIndex( x => x.value === this.themeColor );

			// add that class to body
			const body = document.getElementsByTagName( 'body' )[ 0 ];
			body.classList.add( this.themeColor );
		}
		return;
	}

	public get theme()
	{
		return ( this.themes[ this.themeIndex ].label );
	}
	
	public selectTheme( theme: string ): void
	{
		const body = document.getElementsByTagName( 'body' )[0];
		body.classList.remove( this.themeColor );
		this.themeColor = theme;
		body.classList.add( this.themeColor );
		// save it to local storage
		localStorage.setItem( 'pxTheme', this.themeColor );
		return;
	}

	public themeSwitcher(): void 
	{
		const body = document.getElementsByTagName( 'body' )[0];
		body.classList.remove( this.themeColor );
		// switch theme
		this.themeIndex++;
		if ( this.themeIndex === this.themes.length )
		{
			this.themeIndex = 0;
		} 
		this.themeColor = this.themes[ this.themeIndex ].value;
		body.classList.add( this.themeColor );
		// save it to local storage
		localStorage.setItem( 'pxTheme', this.themeColor );
	}	
}
