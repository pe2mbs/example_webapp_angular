import { Injectable, EventEmitter, OnInit, Type } from '@angular/core';
import { FilterColumnReq } from '../common/filter-header.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { isArray, isNullOrUndefined, isObject, isString, isUndefined } from 'util';
import { objectEach } from 'highcharts';

export class ProfilePageInfo
{
    public readonly _type: string = "ProfilePageInfo";
    protected _name: string;
    protected _data: object = {};
    protected _dirty: boolean;
    constructor( name: string, data: string = null )
	{
        this._dirty = false;
        if ( data == null )
        {
            if ( name.startsWith( '{' ) && name.endsWith( '}' ) )
            {
                this._data = JSON.parse( data );
                this._name = this._data[ 'name' ];
            }
            else
            {
                this._name = name;    
            }
        }
        else
        {
            this._name = name;    
            this._data = JSON.parse( data );
        }
		return;
	}

    public get dirty(): boolean
    {
        return ( this._dirty );
    }

    private _set( key: string, data: any )
    {
        if ( isObject( data ) )
        {
            // Special handling
            if ( isNullOrUndefined( data._type ) )
            {
                // Regular JSON object
                this.setParam( key, data )     
            }
            else
            {
                // Special object
                if ( data[ 0 ]._type === 'ProfilePageInfo' )
                {
                    this.setParam( key, new ProfilePageInfo( data ) );
                }
            }
        }
        else if ( isArray( data ) )
        {
            if ( data.length > 0 )
            {
                let newArray = null;
                if ( isObject( data[ 0 ] ) )
                {
                    if ( isNullOrUndefined( data[ 0 ]._type ) )
                    {
                        // Simple array
                        newArray = data;
                    }
                    else 
                    {
                        if ( data[ 0 ]._type === 'ProfilePageInfo' )
                        {
                            newArray = new Array<ProfilePageInfo>();
                            data.forEach(element => {
                                newArray.push( new ProfilePageInfo( element ) );
                            });
                        }                       
                    }
                }
                else
                {
                    newArray = data;
                }
                this.setParam( key, newArray );
            }
        }
        else
        {
            this.setParam( key, data )
        }
        return;
    }

    public set( data: any )
    {
        if ( isString( data ) )
        {
            data = JSON.parse( data );
        }
        if ( data instanceof ProfilePageInfo )
        {
            // Already unpacked format
            this._data = data._data;
        }
        else if ( isObject( data ) )
        {
            // Need to unpack (JSON) object into ProfilePageInfo object
            for ( var key in data ) 
            {
                this._set( key, data[ key ] )
            }
        }
        return;
    }

    private _get( key: string, data: any ): any
    {
        if ( isObject( data ) )
        {
            if ( data instanceof ProfilePageInfo )
            {
                // Already unpacked format
                let tmp = data._data;
                tmp[ '_type' ] = 'ProfilePageInfo';
                return ( tmp );
            }
        }
        else if ( isArray( data ) )
        {
            const tmp = Array<any>();
            data.forEach( element => {
                if ( element instanceof ProfilePageInfo )
                {
                    let elem = element._data;
                    elem[ '_type' ] = 'ProfilePageInfo';
                    tmp.push( elem );
                }
                else
                {
                    tmp.push( element );
                }
            } );
            return ( tmp );
        }
        return ( data );
    }

    public get(): string
    {
        let result: any = {};
        for ( var key in this._data ) 
        {
            result[ key ] = this._get( key, this._data[ key ] );
        }
        return ( JSON.stringify( result ) );
    }


    public get name(): string
    {
        return ( this._name )
    }

    public setParam( name: string, value: any ): void
    {
        this._data[ name ] = value;
        this._dirty = true;
        return;
    }

    public getParam( name: string, default_value: any ): any
    {
        if ( !isNullOrUndefined( this._data[ name ] ) )
        {
            return ( this._data[ name ] )
        }
        this._data[ name ] = default_value; 
        return ( this._data[ name ] );
    }

    public getString( name: string, default_value: string = "" ): string
    {
        return ( this.getParam( name, default_value ) )
    }

    public setString( name: string, value: string ): void
    {
        this.setParam( name, value );
        return;
    }

    public getNumber( name: string, default_value: number = 0 ): number
    {
        return ( this.getParam( name, default_value ) )
    }

    public setNumber( name: string, value: number ): void
    {
        this.setParam( name, value );
        return;
    }

    public getElement( name: string, element_name: string ): ProfilePageInfo
    {
        const params = this.getParam( name, new Array<ProfilePageInfo>() );
        let result: ProfilePageInfo = null
        console.log( 'getElement.params', params );
        if ( !isNullOrUndefined( params ) )
        {
            params.array.forEach( element => {
                if ( !isNullOrUndefined( element ) && element instanceof ProfilePageInfo )
                {
                    if ( element.name == element_name )
                    {
                        result = element; 
                    }
                }
            } );
        }
        if ( isNullOrUndefined( result ) )
        {
            result = new ProfilePageInfo( element_name );
            params.push( result );
            this.setParam( name, params );
        }
        return ( result );
    }

    public updateElement( name: string, page: ProfilePageInfo )
    {
        const params = this.getParam( name, new Array<ProfilePageInfo>() );
        params.array.forEach( element => {
            if ( !isNullOrUndefined( element ) && element instanceof ProfilePageInfo )
            {
                if ( element.name == page.name )
                {
                    element.set( page._data );
                }
            }
        } );
        return;
    }
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
	pages:[]	
};


@Injectable()
export class ProfileService extends ProfilePageInfo
{
	public changeEvent: EventEmitter<ProfileService> = new EventEmitter<ProfileService>(); 

	constructor( private _httpClient: HttpClient, protected authService: AuthService )
	{
        super( authService.userName );
        if ( !isNullOrUndefined( authService.userName ) )
        {
            this.getProfile();
        }
		return;
	}

	getProfile(): void 
	{
		// pull from server
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
		return ( this.name );
	}

	public get fullname(): string
	{
		return ( this.getString( 'fullname', this.name ) );
	}

	public get role(): number
	{
        return ( this.getNumber( 'role', 1 ) );
	}

	public get locale(): string
	{
		return ( this.getString( 'locale', 'en_EN' ) );
	}

	public get theme(): string
	{
		return ( this.getString( 'theme', 'equensworldline-theme' ) );
	}

	public set theme( value: string )
	{       
        if ( value !== profile.theme )
		{
            this.setString( 'theme', value );
            this.changeEvent.emit( this );
		}
		return;
    }
    
	public getPageSettings( page_name: string ): ProfilePageInfo | null
	{        
        return ( this.getElement( 'pages', page_name ) );
	}

	public setPageSetting( page: ProfilePageInfo ): void 
	{
        this.updateElement( 'pages', page )
        return;
	}

	public restoreProfile(): void 
	{
		this._httpClient.get<any>( `/api/profile/${this.name}` ).subscribe( data => {
            this.set( data );		
			this.changeEvent.emit( this );
		} );
		return;
	}

	public storeProfile(): void
	{
		this._httpClient.post<ProfileInterface>( '/api/profile', this.get() ).subscribe( data => {
            console.log( "storeProfile() => ", profile, data );
		} );
		return;
	}
}
