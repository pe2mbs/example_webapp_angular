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
#   gencrud: 2021-01-10 08:21:51 version 2.1.658 by user mbertens
#
import webapp2.api as API
from webapp2.common.parameters import SerializationDictField


class TrackingSchema( API.mm.SQLAlchemySchema ):
    """Schema for the tracking table, this is generated by the gencrud.py module
    When modifing the file make sure that you remove the table from the configuration.
    """
    class Meta:
        fields = [ "T_ID", "T_USER", "T_TABLE", "T_ACTION", "T_ACTION_LABEL", "T_RECORD_ID", "T_CHANGE_DATE_TIME", "T_CONTENTS" ]

    T_ACTION_LABEL          = SerializationDictField( attribute="T_ACTION",
                                                      dictionary = {1: 'Insert', 2: 'Update', 3: 'Delete'} )

trackingSchema   = TrackingSchema()
trackingsSchema  = TrackingSchema( many = True )

