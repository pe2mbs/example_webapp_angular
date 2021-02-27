import os
import yaml
from alembic import op
from sqlalchemy import orm
from datetime import datetime, timedelta

ADDED_BY_RUNONCE = 'Record was added by runonce'

__all__ = [
    'datetime',
    'timedelta',
    'executeListCommands',
    'loadDataFile',
    'getSession',
    'ADDED_BY_RUNONCE'
]


def getSession():
    bind = op.get_bind()
    return orm.Session( bind = bind )


def executeListCommands( session, records, sql_statement ):
    for record in records:
        session.execute( sql_statement, record )


def loadDataFile( filename, revision ):
    filename = os.path.join( "runonce", "data", revision, filename )
    if not os.path.isfile( filename  ):
        filename = os.path.join( "runonce", "data", filename )

    if os.path.isfile( filename  ):
        with open( filename, 'r' ) as stream:
            data = yaml.load( stream, yaml.Loader )
        return data

    return []