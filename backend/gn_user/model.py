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
#   gencrud: 2020-12-05 15:37:30 version 2.0.607 by user mbertens
#
import webapp2.api as API
from sqlalchemy import event
import webapp2.common   as common


# Needed during version migration
db = API.db

class User( API.db.Model
                ):
    """Model for the gn_user table, this is generated by the gencrud.py module
    When modifing the file make sure that you remove the table from the configuration.
    """
    __tablename__        = 'gn_user'
    U_ID                 = db.Column( "u_id", db.Integer, autoincrement = True, primary_key = True )
    U_ACTIVE             = db.Column( "u_active", db.Boolean, default = False )
    U_NAME               = db.Column( "u_name", db.String( 30 ), nullable = False )
    U_ROLE               = db.Column( "u_role", db.Integer, db.ForeignKey( "gn_role.r_id" ) )
    U_HASH_PASSWORD      = db.Column( "u_hash_password", db.String( 255 ), nullable = False )
    U_MUST_CHANGE        = db.Column( "u_must_change", db.Boolean, default = False )
    U_FIRST_NAME         = db.Column( "u_first_name", db.String( 50 ), nullable = False )
    U_MIDDLE_NAME        = db.Column( "u_middle_name", db.String( 50 ), nullable = True )
    U_LAST_NAME          = db.Column( "u_last_name", db.String( 50 ), nullable = False )
    U_EMAIL              = db.Column( "u_email", db.String( 100 ), nullable = False )
    U_ACCESS_TOKEN       = db.Column( "u_access_token", db.String( 512 ), nullable = True )
    U_REFRESH_TOKEN      = db.Column( "u_refresh_token", db.String( 512 ), nullable = True )
    U_TOKEN_DT           = db.Column( "u_token_dt", db.DateTime, nullable = True )
    U_CREATE_DT          = db.Column( "u_create_dt", db.DateTime, nullable = True )
    U_MOD                = db.Column( "u_mod", db.DateTime, nullable = False, default = common.getCurrentUtcDateTime() )
    U_MOD_USER           = db.Column( "u_mod_user", db.String( 30 ), nullable = False, default = common.getCurrentUser() )
    U_REMARK             = db.Column( "u_remark", db.LONGTEXT, nullable = True )
    U_LOCALE             = db.Column( "u_locale", db.Integer )
    U_LISTITEMS          = db.Column( "u_listitems", db.Integer, default = 10 )

    U_ROLE_FK            = db.relationship( 'Role', backref = 'gn_user', lazy = True )
    db.UniqueConstraint( 'U_NAME', name='U_NAME_IDX' )

    def memoryInstance( self ):
        return UserMemory( self )

    def toDict( self ):
        return self.dictionary

    @property
    def dictionary( self ):
        return {
             "U_ID": self.U_ID,
             "U_ACTIVE": self.U_ACTIVE,
             "U_NAME": self.U_NAME,
             "U_ROLE": self.U_ROLE,
             "U_HASH_PASSWORD": self.U_HASH_PASSWORD,
             "U_MUST_CHANGE": self.U_MUST_CHANGE,
             "U_FIRST_NAME": self.U_FIRST_NAME,
             "U_MIDDLE_NAME": self.U_MIDDLE_NAME,
             "U_LAST_NAME": self.U_LAST_NAME,
             "U_EMAIL": self.U_EMAIL,
             "U_ACCESS_TOKEN": self.U_ACCESS_TOKEN,
             "U_REFRESH_TOKEN": self.U_REFRESH_TOKEN,
             "U_TOKEN_DT": self.U_TOKEN_DT,
             "U_CREATE_DT": self.U_CREATE_DT,
             "U_MOD": self.U_MOD,
             "U_MOD_USER": self.U_MOD_USER,
             "U_REMARK": self.U_REMARK,
             "U_LOCALE": self.U_LOCALE,
             "U_LISTITEMS": self.U_LISTITEMS,
        }

    def toSql( self ):
        data = self.dictionary
        values = repr( data.values() ).split( '[' )[ 1 ].split( ']' )[ 0 ]
        return "INSERT INTO {} ( {} ) VALUES ( {} )".format( self.__tablename__,
                                                             ", ".join( data.keys() ),
                                                             values )

    def __repr__( self ):
        result_fields = []
        result_fields.append( "U_ID = {}".format( self.U_ID ) )
        result_fields.append( "U_ACTIVE = {}".format( self.U_ACTIVE ) )
        result_fields.append( "U_NAME = {}".format( self.U_NAME ) )
        result_fields.append( "U_ROLE = {}".format( self.U_ROLE ) )
        result_fields.append( "U_HASH_PASSWORD = {}".format( self.U_HASH_PASSWORD ) )
        result_fields.append( "U_MUST_CHANGE = {}".format( self.U_MUST_CHANGE ) )
        result_fields.append( "U_FIRST_NAME = {}".format( self.U_FIRST_NAME ) )
        result_fields.append( "U_MIDDLE_NAME = {}".format( self.U_MIDDLE_NAME ) )
        result_fields.append( "U_LAST_NAME = {}".format( self.U_LAST_NAME ) )
        result_fields.append( "U_EMAIL = {}".format( self.U_EMAIL ) )
        result_fields.append( "U_ACCESS_TOKEN = {}".format( self.U_ACCESS_TOKEN ) )
        result_fields.append( "U_REFRESH_TOKEN = {}".format( self.U_REFRESH_TOKEN ) )
        result_fields.append( "U_TOKEN_DT = {}".format( self.U_TOKEN_DT ) )
        result_fields.append( "U_CREATE_DT = {}".format( self.U_CREATE_DT ) )
        result_fields.append( "U_MOD = {}".format( self.U_MOD ) )
        result_fields.append( "U_MOD_USER = {}".format( self.U_MOD_USER ) )
        result_fields.append( "U_REMARK = {}".format( self.U_REMARK ) )
        result_fields.append( "U_LOCALE = {}".format( self.U_LOCALE ) )
        result_fields.append( "U_LISTITEMS = {}".format( self.U_LISTITEMS ) )
        return "<User {}>".format( ", ".join( result_fields ) )

    def __str__( self ):
        return self.__repr__()

# standard decorator style
@event.listens_for( User, 'before_update')
def receive_before_commit( mapper, connection, record ):
    record.U_MOD = common.getCurrentUtcDateTime()
    record.U_MOD_USER = common.getCurrentUser()
    return


class UserMemory( object ):
    def __init__( self, record = None, *args, **kwargs ):
        self.clear()
        self.set( record, **kwargs )
        return

    def clear( self ):
        self.U_ID                     = None
        self.U_ACTIVE                 = None
        self.U_NAME                   = None
        self.U_ROLE                   = None
        self.U_HASH_PASSWORD          = None
        self.U_MUST_CHANGE            = None
        self.U_FIRST_NAME             = None
        self.U_MIDDLE_NAME            = None
        self.U_LAST_NAME              = None
        self.U_EMAIL                  = None
        self.U_ACCESS_TOKEN           = None
        self.U_REFRESH_TOKEN          = None
        self.U_TOKEN_DT               = None
        self.U_CREATE_DT              = None
        self.U_MOD                    = None
        self.U_MOD_USER               = None
        self.U_REMARK                 = None
        self.U_LOCALE                 = None
        self.U_LISTITEMS              = None
        return

    def set( self, record = None, **kwargs ):
        if isinstance( record, User ):
            self.U_ID                 = record.U_ID
            self.U_ACTIVE             = record.U_ACTIVE
            self.U_NAME               = record.U_NAME
            self.U_ROLE               = record.U_ROLE
            self.U_HASH_PASSWORD      = record.U_HASH_PASSWORD
            self.U_MUST_CHANGE        = record.U_MUST_CHANGE
            self.U_FIRST_NAME         = record.U_FIRST_NAME
            self.U_MIDDLE_NAME        = record.U_MIDDLE_NAME
            self.U_LAST_NAME          = record.U_LAST_NAME
            self.U_EMAIL              = record.U_EMAIL
            self.U_ACCESS_TOKEN       = record.U_ACCESS_TOKEN
            self.U_REFRESH_TOKEN      = record.U_REFRESH_TOKEN
            self.U_TOKEN_DT           = record.U_TOKEN_DT
            self.U_CREATE_DT          = record.U_CREATE_DT
            self.U_MOD                = record.U_MOD
            self.U_MOD_USER           = record.U_MOD_USER
            self.U_REMARK             = record.U_REMARK
            self.U_LOCALE             = record.U_LOCALE
            self.U_LISTITEMS          = record.U_LISTITEMS
        for key, value in kwargs.items():
            setattr( self, key, value )

        return

    @classmethod
    def fetch( cls, *args, **kwargs ):
        query = API.db.session.query( User )
        for condition in args:
            query = query.filter( condition )

        return cls( query.one() )

    @classmethod
    def fetch_many( cls, *args, **kwargs ):
        result = []
        query = API.db.session.query( User )
        for condition in args:
            query = query.filter( condition )

        if 'order_by' in kwargs:
            query = query.order_by( kwargs[ 'order_by' ] + " " + kwargs.get( 'order_dir', 'asc' ) )

        return [ cls( record ) for record in query.all() ]

    def __repr__( self ):
        result = "<UserMemory "
        result += "U_ID = {}, ".format( self.U_ID )
        result += "U_ACTIVE = {}, ".format( self.U_ACTIVE )
        result += "U_NAME = {}, ".format( self.U_NAME )
        result += "U_ROLE = {}, ".format( self.U_ROLE )
        result += "U_HASH_PASSWORD = {}, ".format( self.U_HASH_PASSWORD )
        result += "U_MUST_CHANGE = {}, ".format( self.U_MUST_CHANGE )
        result += "U_FIRST_NAME = {}, ".format( self.U_FIRST_NAME )
        result += "U_MIDDLE_NAME = {}, ".format( self.U_MIDDLE_NAME )
        result += "U_LAST_NAME = {}, ".format( self.U_LAST_NAME )
        result += "U_EMAIL = {}, ".format( self.U_EMAIL )
        result += "U_ACCESS_TOKEN = {}, ".format( self.U_ACCESS_TOKEN )
        result += "U_REFRESH_TOKEN = {}, ".format( self.U_REFRESH_TOKEN )
        result += "U_TOKEN_DT = {}, ".format( self.U_TOKEN_DT )
        result += "U_CREATE_DT = {}, ".format( self.U_CREATE_DT )
        result += "U_MOD = {}, ".format( self.U_MOD )
        result += "U_MOD_USER = {}, ".format( self.U_MOD_USER )
        result += "U_REMARK = {}, ".format( self.U_REMARK )
        result += "U_LOCALE = {}, ".format( self.U_LOCALE )
        result += "U_LISTITEMS = {}, ".format( self.U_LISTITEMS )
        result += ">"
        return result

    def __str__( self ):
        return self.__repr__()

    @property
    def dictionary( self ):
        return {
             "U_ID": self.U_ID,
             "U_ACTIVE": self.U_ACTIVE,
             "U_NAME": self.U_NAME,
             "U_ROLE": self.U_ROLE,
             "U_HASH_PASSWORD": self.U_HASH_PASSWORD,
             "U_MUST_CHANGE": self.U_MUST_CHANGE,
             "U_FIRST_NAME": self.U_FIRST_NAME,
             "U_MIDDLE_NAME": self.U_MIDDLE_NAME,
             "U_LAST_NAME": self.U_LAST_NAME,
             "U_EMAIL": self.U_EMAIL,
             "U_ACCESS_TOKEN": self.U_ACCESS_TOKEN,
             "U_REFRESH_TOKEN": self.U_REFRESH_TOKEN,
             "U_TOKEN_DT": self.U_TOKEN_DT,
             "U_CREATE_DT": self.U_CREATE_DT,
             "U_MOD": self.U_MOD,
             "U_MOD_USER": self.U_MOD_USER,
             "U_REMARK": self.U_REMARK,
             "U_LOCALE": self.U_LOCALE,
             "U_LISTITEMS": self.U_LISTITEMS,
        }

