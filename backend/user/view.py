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
import json
import jwt
from datetime import timedelta, datetime
from flask import Blueprint, request, jsonify
from sqlalchemy.orm.exc import NoResultFound
import webapp2.api as API
from webapp2.common.crud import CrudInterface, RecordLock
import traceback
from backend.user.model import User
from backend.user.schema import UserSchema


userApi = Blueprint( 'userApi', __name__ )


# Args is for downwards compatibility !!!!!
def registerApi( *args ):
    # Set the logger for the users module
    API.app.logger.info( 'Register User routes' )
    API.app.register_blueprint( userApi )
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
        RecordLock.__init__( self, 'user', 'U_ID' )
        return


class UserCurdInterface( CrudInterface ):
    _model_cls = User
    _lock_cls = UserRecordLock
    _schema_cls = UserSchema()
    _schema_list_cls = UserSchema( many = True )
    _uri = '/api/user'

    def __init__( self ):
        CrudInterface.__init__( self, userApi )
        self.registerRoute( 'profile/<username>', self.restoreProfile, methods = [ 'GET' ] )
        self.registerRoute( 'profile', self.storeProfile, methods = [ 'POST' ] )
        self.registerRoute( 'authenticate', self.getUserAuthenticate, methods = [ 'POST' ] )
        self.registerRoute( 'signup', self.getUserSignup, methods = [ 'POST' ] )
        self.registerRoute( 'logout', self.logout, methods = [ 'POST' ] )
        return

    def beforeUpdate( self, record ):
        for field in ( "U_ID", "U_ACTIVE_LABEL", "U_ROLE_FK", "U_LOCALE_LABEL", "U_LISTITEMS_LABEL", ):
            if field in record:
                del record[ field ]

        return record

    def logout( self ):
        return jsonify( ok = True )

    def restoreProfile( self, username ):
        userRecord: User = API.db.session.query( User ).filter( User.U_NAME == username ).one()
        if userRecord.U_REMARK is None:
            userRecord.U_REMARK = ''

        if userRecord.U_REMARK.startswith( '{' ) and userRecord.U_REMARK.endswith( '}' ):
            # TODO: This needs to be moved to it own field U_PROFILE
            data = json.loads( userRecord.U_REMARK )

        else:
            data = { }

        profileData = { 'locale': userRecord.U_LOCALE, 'pageSize': userRecord.U_LISTITEMS, 'user': userRecord.U_NAME,
            'fullname': "{} {}".format( userRecord.U_FIRST_NAME, userRecord.U_LAST_NAME ), 'role': userRecord.U_ROLE, 'roleString': userRecord.U_ROLE_FK.R_ROLE,
            'theme': data.get( 'theme', 'light-theme' ), 'objects': data.get( 'objects', { } ), 'profilePage': '/gn_user/edit',
            'profileParameters': { 'id': 'U_ID', 'mode': 'edit', 'value': userRecord.U_ID, } }
        API.logger.info( "RESTORE.PROFILE: {}".format( profileData ) )
        return jsonify( profileData )

    def storeProfile( self ):
        profileData = request.json
        username = profileData.get( 'user', None )
        userRecord: User = API.db.session.query( User ).filter( User.U_NAME == username ).one()
        data = { 'theme': profileData.get( 'theme', 'light-theme' ), 'objects': profileData.get( 'objects', { } ) }
        userRecord.U_REMARK = json.dumps( data )
        API.logger.info( "STORE.PROFILE: {}".format( data ) )
        API.db.session.commit()
        return jsonify( ok = True )

    def createToken( self, username, fullname, userrole, keepsignedin ):
        """
            “exp” (Expiration Time) Claim
            “nbf” (Not Before Time) Claim
            “iss” (Issuer) Claim
            “aud” (Audience) Claim
            “iat” (Issued At) Claim
        """
        if keepsignedin:
            expiration = timedelta( days = 365 )

        else:
            expiration = timedelta( days = 1 )

        message = { 'username': username, 'fullname': fullname, 'userrole': userrole, 'parameters': { 'id': 'U_ID', 'mode': 'edit', 'value': 3 },
                    'profile': '/gn_user/edit', 'iss': 'http://sts20029.internal.zone/', 'iat': datetime.utcnow(), 'exp': datetime.utcnow() + expiration }
        key = 'verysecretkey'
        return jwt.encode( message, key, algorithm = 'HS256' )

    def getUserAuthenticate( self ):
        data = request.json
        API.app.logger.info( data )
        if data is None:
            return "Invalid request, missing user data", 500

        username = data.get( 'userid', None )
        passwd = data.get( 'password', None )
        keepsignedin = data.get( 'keepsignedin', False )
        try:
            userRecord: User = API.db.session.query( User ).filter( User.U_NAME == username ).one()
            if userRecord.U_ACTIVE:
                API.app.logger.debug( "User '{}' password '{}' == '{}'".format( username, userRecord.U_HASH_PASSWORD, passwd ) )
                if userRecord.U_HASH_PASSWORD == passwd:
                    if userRecord.U_MIDDLE_NAME not in (None, ""):
                        fullname = userRecord.U_FIRST_NAME + " " + userRecord.U_MIDDLE_NAME + " " + userRecord.U_LAST_NAME

                    else:
                        fullname = userRecord.U_FIRST_NAME + " " + userRecord.U_LAST_NAME

                    userrole = userRecord.U_ROLE_FK.R_ROLE
                    return jsonify( result = True, token = self.createToken( username, fullname, userrole, keepsignedin ) )

                else:
                    API.app.logger.error( "User '{}' password verify fail".format( username ) )

            else:
                API.app.logger.error( "User '{}' not active".format( username ) )

        except NoResultFound:
            API.app.logger.error( "User '{}' not found".format( username ) )

        except Exception:
            API.app.logger.error( traceback.format_exc() )

        return jsonify( result = False )

    def getUserSignup( self ):
        data = request.json
        API.app.logger.info( data )
        if data is None:
            return "Invalid request, missing user data", 500

        username = data.get( 'username', None )
        passwd = data.get( 'password', None )
        email = data.get( 'email', None )
        firstname = data.get( 'firstname', None )
        middlename = data.get( 'middlename', None )
        lastname = data.get( 'lastname', None )
        try:
            userRecord: User = API.db.session.query( User ).filter( User.U_NAME == username ).one()
            if userRecord.U_EMAIL == email and userRecord.U_FIRST_NAME == firstname and userRecord.U_LAST_NAME == lastename and userRecord.U_MIDDLE_NAME == middlename:
                # just reset the password
                userRecord.U_HASH_PASSWORD = passwd
                API.db.session.commit()
                return jsonify( result = True )

        except NoResultFound:
            try:
                API.db.session.add( User( U_NAME = username,
                                          U_FIRST_NAME = firstname,
                                          U_LAST_NAME = lastname,
                                          U_MIDDLE_NAME = middlename,
                                          U_EMAIL = email,
                                          U_HASH_PASSWORD = passwd,
                                          U_ROLE = 1,  # Should be the default Role
                                          U_ACTIVE = True,
                                          U_LISTITEMS = 25,
                                          U_LOCALE = 1 ) )  # Should be the default locale
                API.db.session.commit()
                return jsonify( result = True )

            except Exception:
                API.app.logger.error( traceback.format_exc() )

        except Exception:
            API.app.logger.error( traceback.format_exc() )

        return jsonify( result = False )


gn_user = UserCurdInterface()

