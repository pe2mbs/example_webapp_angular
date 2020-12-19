from werkzeug.exceptions import HTTPException


class InvalidRequestExecption( HTTPException ):
    code = 412
    description = 'Invalid request, missing Record'


class RecordLockedException( HTTPException ):
    code = 409
    description = 'The requested record is locked.'
    def __init__( self,  description = None, request = None, user = None ):
        if user is not None and description is None:
            description = "The requested record is locked by user : {}.".format( user )

        self.user = user
        HTTPException.__init__( self, description, request )
        return