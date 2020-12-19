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
#   gencrud: 2020-12-18 21:35:19 version 2.1.657 by user mbertens
#
from flask import Blueprint, request, jsonify
import webapp2.api as API
from webapp2.common.crud import CrudInterface, RecordLock
import traceback
from backend.gn_role.model import Role
from backend.gn_role.schema import RoleSchema


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



class RoleRecordLock( RecordLock ):
    def __init__(self):
        RecordLock.__init__( self, 'gn_role', 'R_ID' )
        return


class RoleCurdInterface( CrudInterface ):
    _model_cls = Role
    _lock_cls = RoleRecordLock
    _schema_cls = RoleSchema()
    _schema_list_cls = RoleSchema( many = True )
    _uri = '/api/gn_role'

    def __init__( self ):
        CrudInterface.__init__( self, gn_roleApi )
        return

    def beforeUpdate( self, record ):
        for field in ( "R_ID", ):
            if field in record:
                del record[ field ]

        return record


gn_role = RoleCurdInterface()

