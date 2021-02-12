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
#   gencrud: 2021-01-13 05:37:59 version 2.1.658 by user mbertens
#
import webapp2.api as API
from webapp2.common.dbmem import DbBaseMemory
from webapp2.common.crudmixin import CrudModelMixin




class LanguageTransalates( API.db.Model, CrudModelMixin ):
    """Model for the language_translates table, this is generated by the gencrud.py module
    When modifing the file make sure that you remove the table from the configuration.
    """
    __field_list__       = ['LT_ID', 'LT_LABEL']
    __tablename__        = 'language_translates'
    LT_ID                = API.db.Column( "lt_id", API.db.Integer, autoincrement = True, primary_key = True )
    LT_LABEL             = API.db.Column( "lt_label", API.db.String( 256 ), nullable = False )

    API.db.UniqueConstraint( 'LT_LABEL', name='LT_LABEL_IDX' )

    def memoryInstance( self ):
        return LanguageTransalatesMemory( self )


class LanguageTransalatesMemory( DbBaseMemory ):
    __model_cls__   = LanguageTransalates

