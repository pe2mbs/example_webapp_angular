import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class CustomLoader implements TranslateLoader 
{
    getTranslation( lang: string ): Observable<any> 
    {
        console.log( "CustomLoader ", lang );
        let obj = {};
        if ( lang == 'en' )
        {
            obj[ 'Table' ] = 'Tabel';
            obj[ 'User' ] = 'Gebruiker';
            obj[ 'Change date' ] = 'Datum wijziging';
            obj[ 'No results' ] = 'Geen rijen gevonden';          
        }
        return of( obj );
    }
}