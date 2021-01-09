#
#   Python backend and Angular frontend code generation by gencrud
#   Copyright (C) 2018-2021 Marc Bertens-Nguyen m.bertens@pe2mbs.nl
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
#   gencrud: 2021-01-08 17:40:43 version 2.1.658 by user mbertens
#
from flask import Blueprint, request, jsonify
import webapp2.api as API
from webapp2.common.crud import CrudInterface, RecordLock
import traceback
from backend.language_translates.model import LanguageTransalates
from backend.language_translates.schema import LanguageTransalatesSchema


language_translatesApi = Blueprint( 'language_translatesApi', __name__ )


# Args is for downwards compatibility !!!!!
def registerApi( *args ):
    # Set the logger for the users module
    API.app.logger.info( 'Register LanguageTransalates routes' )
    API.app.register_blueprint( language_translatesApi )
    try:
        import backend.language_translates.entry_points  as EP
        if hasattr( EP, 'entryPointApi' ):
            API.app.logger.info( 'Register LanguageTransalates entrypoint routes' )
            API.app.register_blueprint( EP.entryPointApi )

        if hasattr( EP, 'registerWebSocket' ):
            EP.registerWebSocket()

    except ModuleNotFoundError as exc:
        if exc.name != 'backend.language_translates.entry_points':
            API.app.logger.error( traceback.format_exc() )

    except Exception:
        API.app.logger.error( traceback.format_exc() )

    # TODO: Here we need to add dynamically the menus for this module
    return



class LanguageTransalatesRecordLock( RecordLock ):
    def __init__(self):
        RecordLock.__init__( self, 'language_translates', 'LT_ID' )
        return


class LanguageTransalatesCurdInterface( CrudInterface ):
    _model_cls = LanguageTransalates
    _lock_cls = LanguageTransalatesRecordLock
    _schema_cls = LanguageTransalatesSchema()
    _schema_list_cls = LanguageTransalatesSchema( many = True )
    _uri = '/api/language_translates'

    def __init__( self ):
        CrudInterface.__init__( self, language_translatesApi )
        return

    def beforeUpdate( self, record ):
        for field in ( "LT_ID", ):
            if field in record:
                del record[ field ]

        return record


language_translates = LanguageTransalatesCurdInterface()

