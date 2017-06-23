/**
 * Returns the module at path if it exists, otherwise returns falsy
 * 
 * @param {string} path
 *    path to the module to load
 * @returns {any}
 *    either the module loaded or falsy
 */
function tryRequire( path ){

  try{ return require( path ); }
  catch( _ ){ return false; } 

}

module.exports = tryRequire;
