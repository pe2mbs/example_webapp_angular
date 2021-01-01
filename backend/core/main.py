import os
import yaml
import traceback
from flask import Blueprint, request, jsonify
import webapp2.api as API
API.coreApi = Blueprint( 'coreApi', __name__ )
from backend.core.exceptions import *
import backend.core.tracking as tracking
import backend.core.locking as locking
import backend.core.user as user
import backend.core.role as role

core_modules = [
    tracking,
    locking,
    user,
    role
]


@API.coreApi.route( '/api/i18n/missing', methods=[ 'POST' ] )
def missingTranslation():
    data = request.json
    if os.path.isfile( 'missing.i18n.yaml' ):
        API.app.logger.info( 'Loading missing translation' )
        with open( 'missing.i18n.yaml', 'r' ) as stream:
            missing = yaml.load( stream, Loader = yaml.Loader )

    else:
        missing = {
            'en': [],
            'nl': [],
            'it': [],
            'fr': [],
            'de': []
        }

    lang = data.get( 'language', 'en' )
    text = data.get( 'text', None )
    API.logger.info( "Language: {}".format( lang ) )
    API.logger.info( "Text: {}".format( text ) )

    if text not in missing[ lang ]:
        missing[ lang ].append( text )
        API.app.logger.info( 'Store missing translation' )
        with open( 'missing.i18n.yaml', 'w' ) as stream:
            yaml.dump( missing, stream, Dumper = yaml.Dumper )

    API.logger.info( "Missing transalation: {}".format( data ) )
    return jsonify( ok = True )


def handle_core_exception( exc ):
    return exc.description, exc.code


# These modules need to come after the Blueprint
def registerApi( *args, **kwargs ):
    # Set the logger for the users module
    API.app.logger.info( 'Register Core routes' )
    API.app.register_error_handler( InvalidRequestExecption, handle_core_exception )
    API.app.register_error_handler( RecordLockedException, handle_core_exception )
    API.app.register_blueprint( API.coreApi )

    for plugin in core_modules:
        try:
            API.app.logger.debug( 'registering plugin {0}'.format( plugin ) )
            plugin.registerApi(  *args )

        except Exception as exc:
            API.app.logger.error( traceback.format_exc() )

    return