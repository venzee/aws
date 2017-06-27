const { OPTIONS }
  = require( './keys');

module.exports = require( 'deep-freeze' )( {
  [ OPTIONS.EMULATE_SWF ]: '@venzee/mock-swf'
} );
