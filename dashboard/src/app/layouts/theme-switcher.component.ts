import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-theme-switcher',
  	template: `<button mat-button [matMenuTriggerFor]="menu"><mat-icon>format_color_fill</mat-icon></button>
<mat-menu #menu="matMenu">
	<button mat-menu-item class="{theme.value}" type="button" *ngFor="let theme of themes" 
							(click)="selectTheme( theme.value )">
		{{ theme.label }}
	</button>
</mat-menu>`
})
export class ThemeSwitcherComponent implements OnInit 
{
	public themes = [
		{ label: 'equensWorldline', value: 'equensworldline-theme' },
		{ label: 'Light', value: 'light-theme' },
		{ label: 'Dark', value: 'dark-theme' },
		{ label: 'Purple', value: 'purple-theme' },
	];
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
		if ( localStorage.getItem( 'pxTheme' ) )
		{
			this.themeColor = localStorage.getItem( 'pxTheme' );	
		}
		else
		{
			this.themeColor = 'light-theme'; 
		}	
		const body = document.getElementsByTagName( 'body' )[ 0 ];
		body.classList.add( this.themeColor );
		return;
	}

	public selectTheme( theme: string ): void
	{
		const body = document.getElementsByTagName( 'body' )[0];
		body.classList.remove( this.themeColor );
		this.themeColor = theme;
		body.classList.add( this.themeColor );
		localStorage.setItem( 'pxTheme', this.themeColor );
		return;
	}
}
