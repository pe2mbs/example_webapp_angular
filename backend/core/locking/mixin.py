class RecordLocksMixin( object ):
    def __init__( self ):
        # Disable locking for the locking table
        self._lock = False
        return
