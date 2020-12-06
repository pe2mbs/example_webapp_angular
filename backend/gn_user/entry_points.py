from flask import Blueprint, jsonify

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