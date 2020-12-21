import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { FilterColumnReq } from '../common/filter-header.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


export interface ProfilePageInfo
{
	name: string;
	pageSize?: number;
	pageIndex?: number;
	tabIndex?: number;
	filters?: FilterColumnReq[];
	miscData?: any;
}


export interface ProfileInterface
{
	user: string;
	role: number;
	locale: string;
	pageSize: number;
	fullname: string;
	theme: string;
	pages: ProfilePageInfo[];
}


export let profile: ProfileInterface =
{
	user: 'testing',
	role: 1,
	locale: 'nl_NL',
	pageSize: 10,
	fullname: 'Marc Bertens-Nguyen',
	theme: 'light-theme',
	pages:[
		{
			name: 'RoleTable',
			pageSize: 5,
			pageIndex: 1
		},
		{
			name: 'RoleScreen',
			tabIndex: 1
		},
		{
			name: 'UserTable',
			pageSize: 10,
			pageIndex: 1
		},
		{
			name: 'UserScreen',
			tabIndex: 2
		},
	]	
};


@Injectable()
export class ProfileService
{
	// private userProfile: ProfileInterface = profile;
	protected dirty: boolean = false;
	public changeEvent: EventEmitter<ProfileService> = new EventEmitter<ProfileService>(); 

	constructor( private _httpClient: HttpClient, authService: AuthService )
	{
		this.getProfile( authService.currentUser.username );
		return;
	}

	getProfile( name: string ): void 
	{
		// pull from server
		profile.user = name;
		this.restoreProfile();
		setInterval( () => { 
			if ( this.dirty )
			{
				this.storeProfile();
			}
		}, 30000 );
		return;
	}

	public get user(): string
	{
		return ( profile.user );
	}

	public get fullname(): string
	{
		return ( profile.fullname );
	}

	public get role(): number
	{
		return ( profile.role );
	}

	public get pageSize(): number
	{
		return ( profile.pageSize );
	}

	public get locale(): string
	{
		return ( profile.locale );
	}

	public get theme(): string
	{
		return ( profile.theme );
	}

	public set theme( value: string )
	{
		if ( value !== profile.theme )
		{
			this.dirty = true;
		}
		profile.theme = value;	
		return;
	}

	public getPageSettings( page_name: string ): ProfilePageInfo | null
	{
        let page: ProfilePageInfo = null;
        if ( profile.pages != undefined && profile.pages != null )
        {
            profile.pages.forEach( element => {
                if ( element.name === page_name )
                {
                    page = element;
                    return;
                }
            } );
        }
		if ( page == null )
		{
			page = { name: page_name };
			profile.pages.push( page );
			this.dirty = false;
		}
		return ( page );
	}

	public setPageSetting( page: ProfilePageInfo ): void 
	{
        if ( profile.pages == undefined || profile.pages == null )
        {
            profile.pages = new Array<ProfilePageInfo>()
        }
        else
        {
            for ( const idx in profile.pages )
            {
                if ( profile.pages[ idx ].name === page.name )
                {
                    // found
                    profile.pages[ idx ] = page;
                    this.dirty = true;
                    return;
                }
            }
        }
        profile.pages.push( page );
        this.dirty = true;
        return;
	}

	public restoreProfile(): void 
	{
		this._httpClient.get<any>( `/api/profile/${profile.user}` ).subscribe( data => {
			profile = data;
			this.dirty = false;
			this.changeEvent.emit( this );
		} );
		return;
	}

	public storeProfile(): void
	{
		this.dirty = false;
		this._httpClient.post<ProfileInterface>( '/api/profile', 
									profile ).subscribe( data => {
			console.log( "storeProfile() => ", profile, data );
			
		} );
		return;
	}
}
