import { Component, Input } from '@angular/core';
import { TranslateService, 
		 MissingTranslationHandler, 
		 MissingTranslationHandlerParams } from '@ngx-translate/core';

export interface Languages 
{
	image: string;
	label: string;
	code2: string;
}

const CSS_TEMPLATE1 = `.flag 
{ 
	width: 30px; 
	height: 20px; 
	padding: 0px!important; 
	margin-top: 5px;
}`;


const CSS_TEMPLATE2 = `.language 
{ 
	padding-left: 10px; text-align: top!important; 
}

.mat-menu-item 
{ 
	padding-left: 10px!important; 
	padding-right: 10px!important; 
	min-height: 32px!important;  
	max-height: 32px!important;  
	height: 32px!important;  
	line-height: 32px!important;  
}`;


@Component({
	selector: 'app-lang-switch',
	template: `<button mat-menu-item class="language-menu-item">
	<img [src]="image" class="flag"><span class="language">{{ label }}</span>
	</button>`,
	styles: [ CSS_TEMPLATE1, CSS_TEMPLATE2 ],
})
export class LanguageSwitchComponent // implements OnInit
{
	@Input()	image: string;
	@Input()	label: string;
	constructor()
	{
		return;
	}
}

@Component({
	selector: 'app-lang-switcher',
	template: `<button mat-icon-button [matMenuTriggerFor]="language">
	<img class="flag" src="/assets/{{selected.image}}" width="40">
</button>
<mat-menu #language="matMenu">
	<app-lang-switch *ngFor="let lang of languages;" 
					image="/assets/{{lang.image}}" 
					label="{{lang.label}}"
					(click)="selectLanguage( lang )">
	</app-lang-switch>
</mat-menu>` ,
	styles: [ CSS_TEMPLATE1 ]
})
export class LanguageSwitcherComponent // implements OnInit
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

export class CustomMissingTranslationHandler implements MissingTranslationHandler 
{
	handle( params: MissingTranslationHandlerParams ) 
	{
		console.log( params );
        return params.key;
    }
}
