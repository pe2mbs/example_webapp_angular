from flask import jsonify
import dateutil.parser
import webapp2.api as API
from dateutil.tz import gettz

class NewsMixinInterface( object ):
    tzinfos = { "UTC": 0, "UTC": gettz( "Universal Time Coordinated" ) }


    def __init__( self ):
        self.registerRoute( 'getnews', self.getNews, { 'methods': [ 'GET' ] } )


    def getNews( self ):
        API.app.logger.debug( 'GET: {}/getnews by {}'.format( self._uri, self._lock_cls().user ) )
        recordList = []
        for record in API.db.session.query( self._model_cls ).all():
            obj = record.dictionary
            if record.N_END_DATE is None:
                obj[ 'N_PERIOD' ] = "({})".format( record.N_START_DATE )

            else:
                obj[ 'N_PERIOD' ] = "({} - {})".format( record.N_START_DATE, record.N_END_DATE )

            recordList.append( obj )

        API.app.logger.debug( 'getNews => count: {}'.format( len( recordList ) ) )
        interval = API.app.config.get( 'TICKER_INTERVAL', 180 )
        return jsonify( N_NEWS = recordList, N_TOTAL_ITEMS = len( recordList ), N_POLL_INTERVAL = interval )

    # def beforeUpdate( self, record ):
    #     result = self._schema_cls.load( record )
    #     API.app.logger.debug( 'beforeUpdate => {}'.format( result ) )
    #
    #     record[ 'N_START_DATE' ] = dateutil.parser.parse( record[ 'N_START_DATE' ], tzinfos = self.tzinfos ).date()
    #     record[ 'N_END_DATE' ] = dateutil.parser.parse( record[ 'N_END_DATE' ], tzinfos = self.tzinfos ).date()
    #     return record