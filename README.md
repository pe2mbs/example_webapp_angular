# Example demostration Python backend and Angular frontend.

This example project is to show how to use the webapp repository to provide the web server for an Angular frontend application.

See for more details the README.md in the webapp folder.

## Start

```bash
export FLASK_APP = webapp/autoapp
export FLASK_DEBUG = 1
export FLASK_ENV = [ DEVELOPMENT | STAGING | PRODUCTION ] 
```

In the config.yaml all the parameters that needs to be there are there.

For development run the webapp as follows:
```bash
flask rundev
```

For staged or production run the webapp as follows:
```bash
flask runprod 
```

or when you need SSL/TLS secured sessions
```bash
flask runssl 
```

	This is not a preferred way of using SSL/TLS with Python Flask, but for simple solutions it can be used.
	A better way is to use NGINX as reverse proxy and let NGINX handle the SSL/TLS termination. Then you can 
	also easily use letscrypt for taking care of the certicates.


