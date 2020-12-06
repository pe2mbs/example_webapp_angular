from flask import Blueprint
import webapp2.api as API
import backend.core.api as CORE
CORE.coreApi = Blueprint( 'versionApi', __name__ )
# These modules need to come after the Blueprint
import backend.core.menu
import backend.core.help
import backend.core.version


def registerApi( *args, **kwargs ):
    # Set the logger for the users module
    API.app.logger.info( 'Register Core routes' )
    API.app.register_blueprint( CORE.coreApi )
    return
