from flask import Blueprint
import webapp2.api as API
API.coreApi = Blueprint( 'versionApi', __name__ )

# These modules need to come after the Blueprint
def registerApi( *args, **kwargs ):
    # Set the logger for the users module
    API.app.logger.info( 'Register Core routes' )
    API.app.register_blueprint( API.coreApi )
    return