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
#   gencrud: 2020-12-05 15:21:29 version 2.0.607 by user mbertens
#
from flask import Blueprint, request, jsonify
import webapp2.api as API
import traceback
from backend.gn_role.model import Role
from backend.gn_role.schema import gn_roleSchema, gn_rolesSchema
from backend.common import fieldConversion

db = API.db
gn_roleApi = Blueprint( 'gn_roleApi', __name__ )


# Args is for downwards compatibility !!!!!
def registerApi( *args ):
    # Set the logger for the users module
    API.app.logger.info( 'Register Role routes' )
    API.app.register_blueprint( gn_roleApi )
    try:
        import backend.gn_role.entry_points  as EP
        if hasattr( EP, 'entryPointApi' ):
            API.app.logger.info( 'Register Role entrypoint routes' )
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
    for field in ( "R_ID", ):
        if field in record:
            del record[ field ]

    return record


@gn_roleApi.route( '/api/gn_role/list/<id>/<value>', methods=[ 'GET' ] )
def getRoleListFiltered( id, value ):
    filter = { id: value }
    recordList = db.session.query( Role ).filter_by( **filter ).order_by( Role.R_ID ).all()
    result = gn_rolesSchema.jsonify( recordList )
    API.app.logger.debug( 'GET: /api/gn_role/list/{0}/{1} => {2}'.format( id, value, result ) )
    return result


@gn_roleApi.route( '/api/gn_role/list', methods=[ 'GET' ] )
def getRoleList():
    recordList = db.session.query( Role ).order_by( Role.R_ID ).all()
    result = gn_rolesSchema.jsonify( recordList )
    API.app.logger.debug( 'GET: /api/gn_role/list => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/new', methods = [ 'POST' ] )
def apiRoleNew():
    data    = request.json
    if data is None:
        return "Invalid request, missing RoleRecord", 500

    API.app.logger.info( 'POST: /api/gn_role/new {0}'.format( repr( data ) ) )
    data = removeGeneratedFieldsFromRecord( data )
    record = Role()
    for key, value in data.items():
        setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.add( record )
    API.db.session.commit()
    result = gn_roleSchema.jsonify( record )
    API.app.logger.debug( 'getRoleNew() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/get', methods = [ 'GET' ] )
def apiRoleGet():
    data    = request.json
    if data is None:
        return "Invalid request, missing RoleRecord", 500

    API.app.logger.info( 'GET: /api/gn_role/get {0}'.format( repr( data ) ) )
    record = Role.query.get( int( data[ 'R_ID' ] ) )
    result = gn_roleSchema.jsonify( record )
    API.app.logger.debug( 'getRoleGet() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/get/<int:id>', methods = [ 'GET' ] )
def apiRoleGetId( id ):
    API.app.logger.info( 'GET: /api/gn_role/get/{0}'.format( id ) )
    record = Role.query.get( int( id ) )
    result = gn_roleSchema.jsonify( record )
    API.app.logger.debug( 'getRoleGet() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/<int:id>', methods = [ 'DELETE' ] )
def apiRoleDelete( id ):
    API.app.logger.info( 'DELETE: /api/gn_role/delete {0}'.format( id ) )
    record = Role.query.get( int( id ) )
    API.db.session.delete( record )
    API.db.session.commit()
    result = jsonify( ok = True )
    API.app.logger.debug( 'getRoleDelete() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/put', methods=[ 'POST' ] )
def apiRolePut():
    data    = request.json
    if data is None:
        return "Invalid request, missing RoleRecord", 500

    API.app.logger.info( 'POST: /api/gn_role/put {0}'.format( repr( data ) ) )
    record = Role.query.get( data[ 'R_ID' ] )
    data = removeGeneratedFieldsFromRecord( data )
    for key, value in data.items():
        if key != 'R_ID' and not key.endswith( '_REL' ):
            setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.commit()
    result = gn_roleSchema.jsonify( record )
    API.app.logger.debug( 'getRolePut() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/update', methods=[ 'POST' ] )
def apiRolePatch():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_role/update {0}'.format( repr( data ) ) )
    record = Role.query.get( data[ 'R_ID' ] )
    data = removeGeneratedFieldsFromRecord( data )
    for key, value in data.items():
        if key != 'R_ID' and not key.endswith( '_REL' ):
            setattr( record, key, fieldConversion( record, key, value ) )

    API.db.session.commit()
    result = gn_roleSchema.jsonify( record )
    API.app.logger.debug( 'getRolePatch() => {0}'.format( result ) )
    return result


@gn_roleApi.route( '/api/gn_role/select', methods=[ 'POST' ] )
def apiRoleSelect():
    labels = []
    data    = request.json
    if data is None:
        data = request.args

    API.app.logger.info( 'GET /api/gn_role/select: {0}'.format( repr( data ) ) )
    value = data.get( 'value', 'R_ID' )    # primary key
    label = data.get( 'label', 'R_ROLE' )  # first field name
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
    q = db.session.query( Role ).order_by( getattr( Role, label ) )
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

    API.app.logger.debug( 'apiRoleSelect => {0}'.format( result ) )
    return jsonify( result )


@gn_roleApi.route( '/api/gn_role/lock', methods=[ 'POST' ] )
def apiRoleLock():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_role/lock {0}'.format( repr( data ) ) )
    # TODO: This needs to be implemented for correct multiuser support
    return jsonify( { 'result': 'OK' } )


@gn_roleApi.route( '/api/gn_role/unlock', methods=[ 'POST' ] )
def apiRoleUnlock():
    data    = request.json
    API.app.logger.info( 'POST: /api/gn_role/unlock {0}'.format( repr( data ) ) )
    # TODO: This needs to be implemented for correct multiuser support
    return jsonify( { 'result': 'OK' } )

