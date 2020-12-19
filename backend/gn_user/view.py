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
from backend.gn_user.model import User
from backend.gn_user.schema import UserSchema


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



class UserRecordLock( RecordLock ):
    def __init__(self):
        RecordLock.__init__( self, 'gn_user', 'U_ID' )
        return


class UserCurdInterface( CrudInterface ):
    _model_cls = User
    _lock_cls = UserRecordLock
    _schema_cls = UserSchema()
    _schema_list_cls = UserSchema( many = True )
    _uri = '/api/gn_user'

    def __init__( self ):
        CrudInterface.__init__( self, gn_userApi )
        return

    def beforeUpdate( self, record ):
        for field in ( "U_ID", "U_ACTIVE_LABEL", "U_ROLE_FK", "U_LOCALE_LABEL", "U_LISTITEMS_LABEL", ):
            if field in record:
                del record[ field ]

        return record


gn_user = UserCurdInterface()

