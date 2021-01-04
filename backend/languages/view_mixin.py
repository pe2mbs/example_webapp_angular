from flask import Blueprint, request, jsonify
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