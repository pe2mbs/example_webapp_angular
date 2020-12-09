import traceback
from flask import Blueprint, jsonify, request
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime, timedelta
import webapp2.api as API
import backend.gn_user as user
import jwt


entryPointApi = Blueprint( 'gn_userEntryPointApi', __name__ )

@entryPointApi.route( '/api/gn_user/profile', methods=[ 'GET' ] )
def getUserProfile():
    return jsonify( {
        'User': 'A480226',
        'Role': 1,
        'RoleTable.index': 0,
        'RoleTable.size': 25,
        'RoleTable.filter': '',
        'UserTable.index': 0,
        'UserTable.size': 25,
        'UserTable.filter': ''
    } )


def createToken( username, fullname, userrole, keepsignedin ):
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

    message = { 'username': username,
                'fullname': fullname,
                'userrole': userrole,
                'parameters': { 'id': 'U_ID', 'mode': 'edit', 'value': 3 },
                'profile': '/gn_user/edit',
                'iss': 'http://sts20029.internal.zone/',
                'iat': datetime.utcnow(),
                'exp': datetime.utcnow() + expiration }
    key = 'verysecretkey'
    return jwt.encode( message, key, algorithm = 'HS256' )


@entryPointApi.route( '/api/users/authenticate',  methods=[ 'POST' ] )
def getUserAuthenticate():
    data = request.json
    API.app.logger.info( data )
    if data is None:
        return "Invalid request, missing user data", 500

    username = data.get( 'userid', None )
    passwd = data.get( 'password', None )
    keepsignedin = data.get( 'keepsignedin', False )
    try:
        userRecord:user.User = API.db.session.query( user.User ).filter( user.User.U_NAME == username ).one()
        if userRecord.U_ACTIVE:
            if userRecord.U_HASH_PASSWORD == passwd:
                if userRecord.U_MIDDLE_NAME not in ( None, "" ):
                    fullname = userRecord.U_FIRST_NAME + " " + userRecord.U_MIDDLE_NAME + " " + userRecord.U_LAST_NAME

                else:
                    fullname = userRecord.U_FIRST_NAME + " " + userRecord.U_LAST_NAME

                userrole = userRecord.U_ROLE_FK.R_ROLE
                return jsonify( result = True, token = createToken( username, fullname, userrole, keepsignedin ) )

            else:
                API.app.logger.error( "User '{}' password verify fail".format( username ) )

        else:
            API.app.logger.error( "User '{}' not active".format( username ) )

    except NoResultFound:
        API.app.logger.error( "User '{}' not found".format( username ) )

    except Exception:
        API.app.logger.error( traceback.format_exc() )

    return jsonify( result = False )

@entryPointApi.route( '/api/users/signup',  methods=[ 'POST' ] )
def getUserSignup():
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
        userRecord: user.User = API.db.session.query( user.User ).filter( user.User.U_NAME == username ).one()
        if userRecord.U_EMAIL == email and userRecord.U_FIRST_NAME == firstname and userRecord.U_LAST_NAME == lastename \
                and userRecord.U_MIDDLE_NAME == middlename:
            # just reset the password
            userRecord.U_HASH_PASSWORD = passwd
            API.db.session.commit()
            return jsonify( result = True )

    except NoResultFound:
        try:
            API.db.session.add( user.User( U_NAME = username,
                                           U_FIRST_NAME = firstname,
                                           U_LAST_NAME = lastname,
                                           U_MIDDLE_NAME = middlename,
                                           U_EMAIL = email,
                                           U_HASH_PASSWORD = passwd,
                                           U_ROLE = 1,                  # Should be the default Role
                                           U_ACTIVE = True,
                                           U_LISTITEMS = 25,
                                           U_LOCALE = 1,                # Should be the default locale
                                           U_MOD = datetime.utcnow(),
                                           U_MOD_USER = 'signup' ) )
            API.db.session.commit()
            return jsonify( result = True )

        except Exception:
            API.app.logger.error( traceback.format_exc() )

    except Exception:
        API.app.logger.error( traceback.format_exc() )

    return jsonify( result = False )
