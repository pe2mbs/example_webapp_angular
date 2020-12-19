import webapp2.api as API
from sqlalchemy import and_
from webapp2.common.parameters import SerializationDictField
from backend.locking import RecordLock
from webapp2.common.crud import CrudInterface


class News( API.db.Model ):
    __tablename__   = 'news'
    N_ID            = API.db.Column( "n_id", API.db.Integer, autoincrement = True, primary_key = True )
    N_ACTIVE        = API.db.Column( "n_active", API.db.Boolean, default = False )
    N_ALERT         = API.db.Column( "n_alert", API.db.Boolean, default = False )
    N_KEEP          = API.db.Column( "n_keep", API.db.Boolean, default = False )
    N_MESSAGE       = API.db.Column( "n_message", API.db.Text, default = False )
    N_START_DATE    = API.db.Column( "n_start_date", API.db.Date, default = False )
    N_END_DATE      = API.db.Column( "n_end_date", API.db.Date, default = False )


TrueFalseDict = { True: 'Yes', False: 'No' }

class NewsRecordSchema( API.mm.SQLAlchemySchema ):
    class Meta:
        fields = [
            'N_ID', 'N_ACTIVE', 'N_ALERT', 'N_KEEP', 'N_MESSAGE', 'N_START_DATE', 'N_END_DATE'
        ]

    N_ACTIVE_LABEL  = SerializationDictField( attribute = "N_ACTIVE", dictionary = TrueFalseDict )
    N_ALERT_LABEL   = SerializationDictField( attribute = "N_ALERT", dictionary = TrueFalseDict )
    N_KEEP_LABEL    = SerializationDictField( attribute = "N_KEEP", dictionary = TrueFalseDict )


class NewsRecordLock( RecordLock ):
    def __init__(self):
        RecordLock.__init__( self, 'news', 'N_ID' )
        return


class NewsCurdInterface( CrudInterface ):
    _model_cls = News
    _lock_cls = NewsRecordLock
    _schema_cls = NewsRecordSchema()
    _schema_list_cls = NewsRecordSchema( many = True )
    _uri = '/api/news'

    def __init__( self, blue_print = None ):
        if blue_print is None:
            blue_print = API.coreApi

        CrudInterface.__init__( self, blue_print )
        self.registerRoute( 'getnews', self.getNews, { 'methods': [ 'GET' ] } )
        return

    def getNews( self ):
        API.app.logger.debug( 'GET: {}/getnews by {}'.format( self._uri, self._lock_cls().user ) )
        recordList = API.db.session.query( self._model_cls ).\
                                filter( and_( self._model_cls.N_ACTIVE,
                                              self._model_cls.N_START_DATE,
                                              self._model_cls.N_END_DATE ) ).all()
        result = self._schema_list_cls.jsonify( recordList )
        API.app.logger.debug( 'getNews => count: {}'.format( len( recordList ) ) )
        return result


news = NewsCurdInterface()