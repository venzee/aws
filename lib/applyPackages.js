const monkeyPatch
  = require( './util/monkeyPatch' );

/**
 * @typedef {Object} MonkeyPatchPackage
 * @property {string}   key   - the name of the method on obj to replace
 * @property {function} patch - the function to bind to obj
 * 
 * @param {object}               obj      - object to monkey patch
 * @param {MonkeyPatchPackage[]} packages - package definitions to apply 
 */
function applyPackages( obj, packages ){

  return restore.bind(
    obj,  
    packages.map( monkeyPatch.bind( null, obj ) )
  );

}

module.exports = applyPackages; 

/* internal functions */

function restore( restoreFunctions ){

  restoreFunctions.forEach( ( restoreProperty )=>restoreProperty() );
  return this;

}
