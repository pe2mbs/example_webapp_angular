import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './model';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'gc-lang-switcher',
	template: `<button mat-icon-button [matMenuTriggerFor]="language">
	<mat-icon>language</mat-icon> {{ selected.code2 | uppercase }}
</button>
<mat-menu #language="matMenu">
	<gc-lang-switch *ngFor="let lang of languages;" 
					image="/assets/{{lang.image}}" 
					label="{{ lang.code2 | uppercase }}: {{ lang.label }}"
					(click)="selectLanguage( lang )">
	</gc-lang-switch>
</mat-menu>` ,
	styleUrls: [ './switch.component.scss' ]
})
export class GcLanguageSwitcherComponent // implements OnInit
{
	public languages: Languages[] = [ 
		{ image: 'english.png', label: 'English', code2: "en" }, 
		{ image: 'netherlands.png', label: 'Nederlands', code2: "nl" }, 
		{ image: 'germany.png', label: 'Deutsche', code2: "de" }, 
		{ image: 'france.png', label: 'Français', code2: "fr" }, 
		{ image: 'italy.png', label: 'Italiano', code2: "it" }
	]; 
	public selected: Languages = null;

	constructor( public translate: TranslateService )
	{
		const langs: string[] = new Array<string>();
		this.languages.forEach( lang => {
			langs.push( lang.code2 );
		} );
		translate.addLangs( langs );
		this.selected = this.languages[ 0 ];
		translate.setDefaultLang( 'en' );
		return;
	}

	public selectLanguage( lang: Languages )
	{
		this.selected = lang;
		console.log( 'Language selected: ', this.selected );
		this.translate.use( this.selected.code2 );
		return;
	}
}
