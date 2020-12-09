import os
from flask import jsonify
import webapp2.api as API


@API.coreApi.route( '/api/help/<helpitem>', methods=[ 'GET' ] )
def getHelp( helpitem ):
    helpPath = os.path.abspath( API.app.config.get( 'HELP_PATH', 'help' ) )

    with open( os.path.join( helpPath, "{}.md".format( helpitem ) ), 'r' ) as stream:
        result = stream.read()

    return jsonify( result )

