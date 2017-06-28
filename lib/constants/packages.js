const { OPTIONS }
  = require( './keys');

module.exports = require( 'deep-freeze' )( {
  [ OPTIONS.EMULATE_SWF ]: { key: 'SWF', module: '@venzee/mock-swf' }
} );
