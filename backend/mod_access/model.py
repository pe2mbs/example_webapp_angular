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
#   gencrud: 2021-01-15 07:32:07 version 2.1.663 by user mbertens
#
import webapp2.api as API
from webapp2.common.dbmem import DbBaseMemory
from webapp2.common.crudmixin import CrudModelMixin




class ModuleAccess( API.db.Model, CrudModelMixin ):
    """Model for the mod_access table, this is generated by the gencrud.py module
    When modifing the file make sure that you remove the table from the configuration.
    """
    __field_list__       = ['MA_ID', 'MA_MODULE', 'MA_DESCRIPTION']
    __tablename__        = 'mod_access'
    MA_ID                = API.db.Column( "ma_id", API.db.Integer, autoincrement = True, primary_key = True )
    MA_MODULE            = API.db.Column( "ma_module", API.db.String( 50 ), nullable = False )
    MA_DESCRIPTION       = API.db.Column( "ma_description", API.db.String( 50 ), nullable = False )


    def memoryInstance( self ):
        return ModuleAccessMemory( self )


class ModuleAccessMemory( DbBaseMemory ):
    __model_cls__   = ModuleAccess
