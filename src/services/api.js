const apiServer = "https://localhost:5001" // use from .env

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const signature = Date.now().toString().concat( "quiz-app" );

export class Api{

  _invoke = async ( method, operation, payload, token, eTag ) => {
    const endpoint = `${ apiServer }/${ operation }`
    const headers = { ...DEFAULT_HEADERS }
    const options = { method, headers }

    if ( token ) {
      headers['X-Auth-Token'] = token;
      headers['ETag'] = eTag.tag;
      headers['If-Match'] = eTag.match;
      headers['If-None-Match'] = eTag.none;
      headers['Signature'] = signature;
    }

    if ( payload ) {
      options.body = JSON.stringify( payload )
    }

    await fetch( endpoint, options )
     .then( ( response ) => {
       return response.json();

     } )
     .catch( ( err ) => {
       // TODO: handle HTTP error status

     } )

  }

  _invokeAuth = async ( method, operation, payload ) => {
    const endpoint = `${ apiServer }/${ operation }`

    console.log( endpoint );

    const headers = { ...DEFAULT_HEADERS }
    headers['signature'] = signature;
    headers['credentials'] = 'include';
    headers['mode'] = 'cors';

    const options = { method, headers }

    if ( payload ) {
      options.body = JSON.stringify( payload )
    }

    console.log( endpoint );
    console.log( options );

    const response = await fetch( endpoint, options )
    return response.json();
  }

  /* METHODS */

  _get = ( operation, token ) => {
    return this._invoke( 'GET', operation, null, token )
  }

  _post = ( operation, payload, token ) => {
    return this._invoke( 'POST', operation, payload, token )
  }

  _put = ( operation, payload, token ) => {
    return this._invoke( 'PUT', operation, payload, token )
  }

  _delete = ( operation, payload, token ) => {
    return this._invoke( 'DELETE', operation, payload, token )
  }

  /* ENDPOINTS */

  // TODO: add endpoints
}
