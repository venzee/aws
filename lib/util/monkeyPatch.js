
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

  assertIsString( key );
  assert( Reflect.has( obj, key ), `Object '${ JSON.stringify( obj ) }' doesn't contain property '${ key }'.` );
  
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

const STRING_TYPE_NAME
  = typeof '';

function assertIsString( key ){

  const keyType = typeof key;
  assert( keyType === STRING_TYPE_NAME, `key must be a string, got ${ keyType }'`);

} 

function assertTypeMatch( original, patch ){

  const originalType = typeof original;
  const patchType    = typeof patch;
  assert( originalType === patchType, `type mismatch: original( ${ originalType } ) !== ${ patchType }` );

}
