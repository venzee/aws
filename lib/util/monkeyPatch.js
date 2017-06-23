
/**
 * Invoke to restore a monkey-patched function 
 * @callback ResetMonkeyPatchedFunction
 * 
 * Replaces the property with the specified key on the object provided with
 * the patch
 * 
 * @param {object} obj
 *    the object to patch 
 * @param {string} key
 *    the key of the property on obj to patch
 * @param {function} patch
 *    the function to assign 
 * 
 * @returns {ResetMonkeyPatchedFunction}
 * 
 */
function monkeyPatch( obj, key, patch ){

  debugger
  assertIsString( key );
  assertIsFunction( patch );
  assertHasProperty( obj, key );
  
  const original
    = obj[ key ];
  
  assertTypeMatch( original, patch );
  obj[ key ] = patch;

  return restore.bind( obj, key, original );

}

module.exports = monkeyPatch; 

/* internal functions */

function restore( key, original ){

  this[ key ] = original;
  return this;

}

const assert
  = require( 'assert' );

const isString
  = require( 'lodash/isString' );

function assertIsString( key ){

  assert( isString( key ), `key must be a string, got ${ typeof key }'`);

} 

const isFunction
  = require( 'lodash/isFunction' );

function assertIsFunction( candidate ){

  assert( isFunction( candidate), `Expected function, got ${ typeof candidate }` );

}

function assertHasProperty( obj, key ){

  assert( key in obj, `Object '${ JSON.stringify( obj ) }' doesn't contain property '${ key }'.` );

}

function assertTypeMatch( original, patch ){

  const originalType = typeof original;
  const patchType    = typeof patch;
  assert( originalType === patchType, `type mismatch: original( ${ originalType } ) !== patch( ${ patchType } )` );

}
