from flask import request, jsonify
from sqlalchemy.orm.exc import NoResultFound
import webapp2.api as API
from backend.languages.model import Languages
from backend.language_reference.model import LanguageReference
from backend.language_translates.model import LanguageTransalates

class LanguagesViewMixin( object ):
    def __init__( self ):
        self.registerRoute( 'i18n/<language>', self.getLanguage, methods = [ 'GET' ] )
        self.registerRoute( 'i18n/missing', self.missingTranslation, methods = [ 'POST' ] )

        return

    def missingTranslation( self ):
        language = request.json.get( 'language' )
        text = request.json.get( 'text' )
        API.logger.info( "Missing '{}' for language {}".format( text, language ) )
        languageRecord: Languages = None
        try:
            languageRecord: Languages = API.db.session.query( Languages ).filter( Languages.LA_CODE2 == language ).one()

        except NoResultFound:
            return jsonify( ok = False )

        try:
            translateRecord: LanguageTransalates = API.db.session.query( LanguageTransalates ).\
                                filter( LanguageTransalates.LT_LABEL == text ).one()

        except NoResultFound:
            translateRecord = LanguageTransalates( LT_LABEL = text )
            API.db.session.add( translateRecord )
            API.db.session.commit()

        if languageRecord.LA_CODE2 != 'en':
            return jsonify( ok = True )

        try:
            API.db.session.query( LanguageReference ). \
                filter( LanguageReference.LR_LA_ID == languageRecord.LA_ID ). \
                filter( LanguageReference.LR_LT_ID == translateRecord.LT_ID )

        except NoResultFound:
            referenceRecord = LanguageReference( LR_LA_ID = languageRecord.LA_ID,
                                                 LR_LT_ID = translateRecord.LT_ID,
                                                 TR_TEXT = text )
            API.db.session.add( referenceRecord )
            API.db.session.commit()

        return jsonify( ok = True )

    def getLanguage( self, language ):
        result = {}
        try:
            languageRecord:Languages = API.db.session.query( Languages ).filter( Languages.LA_CODE2 == language ).one()

        except:
            API.logger.error( "Language: {} NOT FOUND".format( language ) )
            return jsonify( {} )

        query = API.db.session.query( LanguageTransalates, LanguageReference ).\
                    join( LanguageReference, LanguageReference.LR_LT_ID == LanguageTransalates.LT_ID ).\
                    filter( LanguageReference.LR_LA_ID == languageRecord.LA_ID )

        if query.count():
            result = { recordSet.LanguageTransalates.LT_LABEL: recordSet.LanguageReference.TR_TEXT for recordSet in query.all() }

        return jsonify( result )