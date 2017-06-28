const CONSTANTS
  = require( './constants' );

const EMULATE_OPTIONS = Object
  .keys( require( './constants/keys' ).OPTIONS )
  .filter( key=>key.startsWith( 'EMULATE_' ) );

const PACKAGES
  = require( './constants/packages' );

const flow
  = require( 'lodash/flow' );

/**
 * Load all those modules that are configured to be emulated
 * 
 * @returns {MonkeyPatchPackage[]}
 *  An array of MonkeyPatchPackage objects as required by applyPackages
 */
function loadMockPackages( ){

  return EMULATE_OPTIONS
    .filter( option=>CONSTANTS[ option ] )
    .map( flow(
      option=>PACKAGES[ option ],
      ( { key, module } )=>( { key, patch: require( module ) } )
    ) );


}

module.exports = loadMockPackages;
