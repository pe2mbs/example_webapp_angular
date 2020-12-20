import { Injectable } from '@angular/core';
import { FilterColumnReq } from '../common/filter-header.component';


export interface BasePageInfo
{
	name: string;
	pageSize: number;
	pageIndex: number;
	filters?: FilterColumnReq[];
	miscData?: any;
}


export interface ProfileInterface
{
	user: string;
	fullname: string;
	theme: string;
	pages: BasePageInfo[];
}


export const profile: ProfileInterface =
{
	user: 'testing',
	fullname: 'Marc Bertens-Nguyen',
	theme: 'light-theme',
	pages:[
		{
			name: '',
			pageSize: 5,
			pageIndex: 1
		}
	]
};


@Injectable()
export class ProfileService 
{
	private userProfile: ProfileInterface = profile;

	constructor()
	{
		return;
	}

	getProfile( name: string ): void 
	{
		// pull from server
		this.userProfile.user = name;

		return;
	}

	public get user(): string
	{
		return ( this.userProfile.user );
	}

	public get fullname(): string
	{
		return ( this.userProfile.fullname );
	}

	public get theme(): string
	{
		return ( this.userProfile.theme );
	}

	public set theme( value: string )
	{
		this.userProfile.theme = value;	
		return;
	}

	public getPageSettings( page_name: string ): BasePageInfo | null
	{
		let page: BasePageInfo = null;
		this.userProfile.pages.forEach( element => {
			if ( element.name === page_name )
			{
				page = element;
				return;
			}
		} );
		return ( page );
	}

	public setPageSetting( page: BasePageInfo ): void 
	{
		for ( const idx in this.userProfile.pages )
		{
			if ( this.userProfile.pages[ idx ].name === page.name )
			{
				// found
				this.userProfile.pages[ idx ] = page;
				// push to server
				break;
			}
		}
		return;
	}
}
