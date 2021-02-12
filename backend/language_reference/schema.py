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
from webapp2.common.parameters import SerializationDictField


class LanguageReferenceSchema( API.mm.SQLAlchemySchema ):
    """Schema for the language_reference table, this is generated by the gencrud.py module
    When modifing the file make sure that you remove the table from the configuration.
    """
    class Meta:
        fields = [ "LR_ID", "LR_LA_ID", "LR_LA_ID_FK", "TR_TEXT", "LR_LT_ID", "LR_LT_ID_FK" ]

    LR_LA_ID_FK             = API.mm.Nested( 'LanguagesSchema' )
    LR_LT_ID_FK             = API.mm.Nested( 'LanguageTransalatesSchema' )

language_referenceSchema   = LanguageReferenceSchema()
language_referencesSchema  = LanguageReferenceSchema( many = True )

