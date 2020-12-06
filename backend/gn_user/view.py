#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2020 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
#
#   This library is free software; you can redistribute it and/or modify
#   it under the terms of the GNU Library General Public License GPL-2.0-only
#   as published by the Free Software Foundation.
#
#   This library is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#   Library General Public License for more details.
#
#   You should have received a copy of the GNU Library General Public
#   License GPL-2.0-only along with this library; if not, write to the
#   Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
#   Boston, MA 02110-1301 USA
#
#   gencrud: 2020-12-06 15:51:25 version 2.0.607 by user mbertens
#
from flask import Blueprint, request, jsonify
import webapp2.api as API
import traceback
from backend.gn_user.model import User
from backend.gn_user.schema import gn_userSchema, gn_usersSchema
from backend.common import fieldConversion

db = API.db
gn_userApi = Blueprint( 'gn_userApi', __name__ )


# Args is for downwards compatibility !!!!!
def registerApi( *args ):
    # Set the logger for the users module
    API.app.logger.info( 'Register User routes' )
    API.app.register_blueprint( gn_userApi )
    try:
        import backend.gn_user.entry_points  as EP
        if hasattr( EP, 'entryPointApi' ):
            API.app.logger.info( 'Register User entrypoint routes' )
            API.app.register_blueprint( EP.entryPointApi )

        if hasattr( EP, 'registerWebSocket' ):
            EP.registerWebSocket()
    except ModuleNotFoundError:
        pass

    except Exception:
        API.app.logger.error( traceback.format_exc() )

    # TODO: Here we need to add dynamically the menus for this module
    return


def removeGeneratedFieldsFromRecord( record ):
    for field in ( "U_ID", "U_ACTIVE_LABEL", "U_ROLE_FK", "U_LOCALE_LABEL", "U_LISTITEMS_LABEL", ):
        if field in record:
            del record[ field ]

    return record


@gn_userApi.route( '/api/gn_user/list/<id>/<value>', methods=[ 'GET' ] )
def getUserListFiltered( id, value ):
    filter = { id: value }
    recordList = db.session.query( User ).filter_by( **filter ).order_by( User.U_ID ).all()
    result = gn_usersSchema.jsonify( recordList )
    API.app.logger.debug( 'GET: /api/gn_user/list/{0}/{1} => {2}'.format( id, value, result ) )
    return result


@gn_userApi.route( '/api/gn_user/list', methods=[ 'GET' ] )
def getUserList():
    recordList = db.session.query( User ).order_by( User.U_ID ).all()
    result = gn_usersSchema.jsonify( recordList )
    API.app.logger.debug( 'GET: /api/gn_user/list => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/new', methods = [ 'POST' ] )
def apiUserNew():
    data    = request.json
    if data is None:
        return "Invalid request, missing UserRecord", 500

    API.app.logger.info( 'POST: /api/gn_user/new {0}'.format( repr( data ) ) )
    data = removeGeneratedFieldsFromRecord( data )
    record = User()
    for key, value in data.items():
        setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.add( record )
    API.db.session.commit()
    result = gn_userSchema.jsonify( record )
    API.app.logger.debug( 'getUserNew() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/get', methods = [ 'GET' ] )
def apiUserGet():
    data    = request.json
    if data is None:
        return "Invalid request, missing UserRecord", 500

    API.app.logger.info( 'GET: /api/gn_user/get {0}'.format( repr( data ) ) )
    record = User.query.get( int( data[ 'U_ID' ] ) )
    result = gn_userSchema.jsonify( record )
    API.app.logger.debug( 'getUserGet() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/get/<int:id>', methods = [ 'GET' ] )
def apiUserGetId( id ):
    API.app.logger.info( 'GET: /api/gn_user/get/{0}'.format( id ) )
    record = User.query.get( int( id ) )
    result = gn_userSchema.jsonify( record )
    API.app.logger.debug( 'getUserGet() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/<int:id>', methods = [ 'DELETE' ] )
def apiUserDelete( id ):
    API.app.logger.info( 'DELETE: /api/gn_user/delete {0}'.format( id ) )
    record = User.query.get( int( id ) )
    API.db.session.delete( record )
    API.db.session.commit()
    result = jsonify( ok = True )
    API.app.logger.debug( 'getUserDelete() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/put', methods=[ 'POST' ] )
def apiUserPut():
    data    = request.json
    if data is None:
        return "Invalid request, missing UserRecord", 500

    API.app.logger.info( 'POST: /api/gn_user/put {0}'.format( repr( data ) ) )
    record = User.query.get( data[ 'U_ID' ] )
    data = removeGeneratedFieldsFromRecord( data )
    for key, value in data.items():
        if key != 'U_ID' and not key.endswith( '_REL' ):
            setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.commit()
    result = gn_userSchema.jsonify( record )
    API.app.logger.debug( 'getUserPut() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/update', methods=[ 'POST' ] )
def apiUserPatch():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_user/update {0}'.format( repr( data ) ) )
    record = User.query.get( data[ 'U_ID' ] )
    data = removeGeneratedFieldsFromRecord( data )
    for key, value in data.items():
        if key != 'U_ID' and not key.endswith( '_REL' ):
            setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.commit()
    result = gn_userSchema.jsonify( record )
    API.app.logger.debug( 'getUserPatch() => {0}'.format( result ) )
    return result


@gn_userApi.route( '/api/gn_user/select', methods=[ 'GET' ] )
def apiUserSelect():
    labels = []
    data    = request.json
    if data is None:
        data = request.args

    API.app.logger.info( 'GET /api/gn_user/select: {0}'.format( repr( data ) ) )
    value = data.get( 'value', 'U_ID' )    # primary key
    label = data.get( 'label', 'U_NAME' )  # first field name
    if ',' in label:
        labels = label.strip().split( ',' )
        separator = ' '
        label = labels[ 0 ]

    elif '-' in label:
        labels = label.strip().split( '-' )
        separator = '-'
        label = labels[ 0 ]

    elif ';' in label:
        labels = label.strip().split( ';' )
        separator = '; '
        label = labels[ 0 ]

    initialItem = data.get( 'initialItem', None )
    finalItem   = data.get( 'finalItem', None )

    result = []
    q = db.session.query( User ).order_by( getattr( User, label ) )
    for record in q.all():
        if len( labels ) > 0:
            fields = [ getattr( record, lbl.strip() ) for lbl in labels ]
            result.append( { 'value': getattr( record, value ),
                             'label': separator.join( fields ) } )

        else:
            result.append( { 'value': getattr( record, value ),
                             'label': getattr( record, label ) } )

    if initialItem is not None:
        result.insert( 0, initialItem )

    if finalItem is not None:
        result.append( finalItem )

    API.app.logger.debug( 'apiUserSelect => {0}'.format( result ) )
    return jsonify( result )


@gn_userApi.route( '/api/gn_user/lock', methods=[ 'POST' ] )
def apiUserLock():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_user/lock {0}'.format( repr( data ) ) )
    # TODO: This needs to be implemented for correct multiuser support
    return jsonify( { 'result': 'OK' } )


@gn_userApi.route( '/api/gn_user/unlock', methods=[ 'POST' ] )
def apiUserUnlock():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_user/unlock {0}'.format( repr( data ) ) )
    # TODO: This needs to be implemented for correct multiuser support
    return jsonify( { 'result': 'OK' } )

