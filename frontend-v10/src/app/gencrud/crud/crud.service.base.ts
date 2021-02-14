import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GcPagingRequest, GcPagingData, GcSelectList } from './model';
import { GcBackendError } from './backend.error';
import { tap } from 'rxjs/operators';
import { GcFilterRecord } from './filter.record';
import { Injectable } from '@angular/core';


@Injectable()
export class GcCrudServiceBase<T>
{
	protected api: string;
	protected debug: boolean = false;
	protected _backend_filter: string = null;
	protected _locked: boolean = false;
    public _pageIndex: number;
    public _pageSize: number;
    public _recordCount: number;
    dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    // Temporarily stores data from dialogs
    dialogData: T;

    constructor( protected httpClient: HttpClient, api: string )
    {
		this.api = `/api/${api}`;
        return;
    }

	public getPage( page: number, 
					size: number, 
					sort_direction: string,
					sort_column: string, 
					filterRecord: GcFilterRecord ): Observable<GcPagingData> 
	{
		const pagingRequest: GcPagingRequest = {
			pageIndex: page,
			pageSize: size,
		};
		if ( sort_column != null && sort_direction != null )
		{
			pagingRequest.sorting = {
				column: sort_column,
				direction: sort_direction
			};
		}
		if ( filterRecord != null )
		{	
			pagingRequest.filters = filterRecord.getFilters();
		}
		if ( this.debug )
		{
			console.log( "pagingRequest", pagingRequest );
		}
		return this.httpClient.post<GcPagingData>( `${this.api}/pagedlist`, 
									  				pagingRequest );
	}

	public deleteRecord( record_id: number ): void
	{
		if ( this.debug )
		{
			console.log( 'deleteRecord', record_id );
		}
        this.httpClient.delete<T>( this.api + '/' + record_id ).subscribe( result => {
            if ( this.debug )
            {
                console.log ( result );
            }
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
	}

    public get uri(): string
    {
      return ( this.api );
    }

    /** CRUD METHODS */
    public getAll( _backend_filter: any ): void
    {
        let uri = '/list';
        if ( _backend_filter !== null )
        {
            this._backend_filter = _backend_filter;
            uri += '/' + _backend_filter.id + '/' + _backend_filter.value;
        }
        this.httpClient.get<T[]>( this.api + uri ).subscribe(
            data => {
                this.dataChange.next( data );
            },
            (error: HttpErrorResponse) => {

                throw new GcBackendError( error.message, error.error );
            }
        );
        return;
    }

    public list( _backend_filter: any ): Observable<T[]>
    {
        let uri = '/list';
        if ( _backend_filter !== null )
        {
            this._backend_filter = _backend_filter;
            uri += '/' + _backend_filter.id + '/' + _backend_filter.value;
        }
        return this.httpClient.get<T[]>( this.api + uri );
    }

    public getSelectListSimple( value: string, label: string, initial: any = null, final: any = null ): Observable<GcSelectList[]>
    {
        const listParams = new HttpParams().set('label', label ).set('value', value );
        if ( initial != null )
        {
            listParams.set( 'initial', initial );
        }
        if ( final != null )
        {
            listParams.set( 'final', final );
        }
        return this.httpClient.get<GcSelectList[]>( this.api + '/select', { params: listParams } );
    }

    public getSelectList( value: string, label: string, initial: any = null, final: any = null ): Observable<GcSelectList[]>
    {
        const listParams = new HttpParams().set('label', label ).set('value', value );
        if ( initial != null )
        {
            listParams.set( 'initial', initial );
        }
        if ( final != null )
        {
            listParams.set( 'final', final );
        }
        return ( Observable.create( observer => {
            this.httpClient.get<GcSelectList[]>( this.api + '/select', { params: listParams } )
            .subscribe( ( data ) => {
                    if ( this.debug )
                    {
                        console.log( 'getSelectList() => ', data );
                    }
                    observer.next( data );
                    observer.complete();
                },
                ( error: HttpErrorResponse ) => {
                    throw new GcBackendError( error.message, error.error );
                }
            );
        } ) );
    }

    public getSelectionList( value: string, label: string, initial: any = null, final: any = null ): Observable<Array<string>>
    {
        const listParams = new HttpParams().set('label', label ).set('value', value );
        if ( initial != null )
        {
            listParams.set( 'initial', initial );
        }
        if ( final != null )
        {
            listParams.set( 'final', final );
        }
        return ( Observable.create( observer => {
            this.httpClient.get<GcSelectList[]>( this.api + '/select', { params: listParams } )
            .subscribe( ( data ) => {
                    if ( this.debug )
                    {
                        console.log( 'getSelectList() => ', data );
                    }
                    const result = new Array<string>();
                    result.push( '-' );
                    data = data.sort( ( n1, n2 ) => {
                        if (n1.value > n2.value )
                        {
                            return 1;
                        }
                        else if (n1.value < n2.value )
                        {
                            return -1;
                        }
                        return 0;
                    });
                    for ( const entry of data )
                    {
                        result.push( entry.label );
                    }
                    observer.next( result );
                    observer.complete();
                },
                ( error: HttpErrorResponse ) => {
                    throw new GcBackendError( error.message, error.error );
                }
            );
        } ) );
    }

    public lockRecord( record: T ): void
    {
        this.dialogData = record;
        this.httpClient.post<T>( this.api + '/lock', record ).subscribe(result => {
            if ( this.debug )
            {
                console.log( result );
			}
			this._locked = true;
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public unlockRecord( record: T ): void
    {
		if ( !this._locked )
		{
			return;
		}
        this.dialogData = null;
        this.httpClient.post<T>( this.api + '/unlock', record ).subscribe(result => {
            if ( this.debug )
            {
                console.log( result );
			}
			this._locked = false;
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public addRecord( record: T ): void
    {
        if ( this.debug )
        {
            console.log( 'addRecord', record );
        }
        this.dialogData = record;
        this.httpClient.post<T>( this.api + '/new', record ).subscribe(result => {
            if ( this.debug )
            {
                console.log( result );
            }
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public getRecordById( id )
    {
        if ( this.debug )
        {
            console.log( 'getRecordById', id );
        }
        return this.httpClient.get<T>( this.api + '/get/' + id );
    }

    public getRecord( record: T ): void
    {
        if ( this.debug )
        {
            console.log( 'getRecord', record );
        }
        this.dialogData = record;
        this.httpClient.get<T>( this.api + '/get', record ).subscribe(result => {
            if ( this.debug )
            {
                console.log( result );
            }
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public updateRecord( record: T ): void
    {
        if ( this.debug )
        {
            console.log( 'updateRecord.orignal ', this.dialogData );
            console.log( 'updateRecord.updated ', record );
        }
        for ( const key of Object.keys( record ) )
        {
            if ( this.debug )
            {
                console.log( 'update key ' + key + ' with value ', record[ key ] );
            }
            this.dialogData[ key ] = record[ key ];
        }
        this.httpClient.post<T>( this.api + '/update', this.dialogData ).subscribe( result => {
            if ( this.debug )
            {
                console.log ( result );
            }
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public genericPut( uri: string, params: any ): void
    {
        console.log( 'genericPut', uri, params );
        this.httpClient.put( this.api + uri, params ).subscribe( result => {
            if ( this.debug )
            {
                console.log ( result );
            }
        },
        (error: HttpErrorResponse) => {
            throw new GcBackendError( error.message, error.error );
        });
        return;
    }

    public genericGet( uri: string, params: any ): Observable<any>
    {
		if ( this.debug )
		{
			console.log( 'genericGet', uri, params );
		}
        return this.httpClient.get( this.api + uri, params );
    }

    public genericPost( uri: string, body: any | null, options: any | null ): Observable<any>
    {
		if ( this.debug )
		{
			console.log( 'genericPost', this.api + uri, body, options );
		}
        return this.httpClient.post( this.api + uri, body );
    }

    public downloadFile( filename: string, reqParams: any ): Observable<any>
    {
        const options = new HttpHeaders( { 'Content-Type': 'application/octet-stream' } );
        return this.httpClient.get( this.api + '/' + filename, { headers: options,
                                                                  params: reqParams,
                                                                  responseType: 'blob' } ).pipe (
            tap( data => {
				if ( this.debug )
				{
					console.log( 'You received data' );
				}
            },
            error => {
                console.error( error );
                throw new GcBackendError( error.message, error.error );
            } )
        );
    }
}
