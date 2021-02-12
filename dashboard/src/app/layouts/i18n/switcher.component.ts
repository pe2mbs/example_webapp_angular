import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './model';
import { LanguagesDataService } from 'src/app/backend/languages/service';

class LanguageObject implements Languages
{
	public label;
	public code2;
	public image;
}


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'gc-lang-switcher',
	template: `<button mat-icon-button [matMenuTriggerFor]="language">
	<mat-icon>language</mat-icon> {{ selected.code2 | uppercase }}
</button>
<mat-menu #language="matMenu">
	<gc-lang-switch *ngFor="let lang of languages;" 
					image="/assets/{{lang.image}}" 
					label="{{ lang.label }}"
					(click)="selectLanguage( lang )">
	</gc-lang-switch>
</mat-menu>` ,
	styleUrls: [ './switch.component.scss' ]
})
export class GcLanguageSwitcherComponent // implements OnInit
{
	private flags: any = { nl: 'dutch.png',
						   de: 'german.png',
						   en: 'english.png',
						   fr: 'french.png',
						   it: 'italian.png',
						   cs: 'czech.png',
						   ca: 'catalan.png',
						   bg: 'bulgarian.png',
						   et: 'estonian.png',
						   eo: 'esperanto.png',
						   eu: 'basque.png',
						   fi: 'finnish.png',
						   hi: 'hindi.png',
						   hu: 'hungarian.png',
						   hy: 'armenian.png',
						   lv: 'latvian.png',
						   lt: 'lithuanian.png',
						   lb: 'luxembourgish.png',
						   nn: 'norwegian.png',
						   nb: 'norwegian.png',
						   pl: 'polish.png',
						   ro: 'romanian.png',
						   ru: 'russian.png',
						   sk: 'slovak.png',
						   sl: 'slovenian.png',
						   sv: 'swedish.png',
						   uk: 'ukrainian.png',
						   vi: 'vietnamese.png',
						   wa: 'walloon.png',
	};

	public languages: Languages[] = [ 
		{ image: 'english.png', label: 'English', code2: "en" }, 
		{ image: 'dutch.png', label: 'Nederlands', code2: "nl" }, 
	]; 
	public selected: Languages = null;

	constructor( public translate: TranslateService, private languageService: LanguagesDataService )
	{
		const langs: string[] = new Array<string>();
		this.languages.forEach( lang => {
			langs.push( lang.code2 );
		} );
		translate.addLangs( langs );
		this.languageService.list( null ).subscribe( data => {
			const newlangs: string[] = new Array<string>();
			this.languages = new Array<Languages>();
			// tslint:disable-next-line:no-shadowed-variable
			data.forEach( element => {
				newlangs.push( element.LA_CODE2 );
				const lang: LanguageObject = new LanguageObject();
				lang.label = element.LA_LABEL;
				lang.code2 = element.LA_CODE2;
				lang.image = this.flags[ element.LA_CODE2 ];
				this.languages.push( lang );
			});
		} );
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
