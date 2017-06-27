const forIn
  = require( 'lodash/forIn' );

const loadConfig
  = require( '../util/loadConfig' );

const config
  = Object.assign( {}, loadConfig() );

const env
  = require( '../util/env' );

const { OPTIONS }
  = require( './keys' );

forIn( OPTIONS, ( key )=>{

  const envSetting
    = env[ key ]

  config[ key ]
    = envSetting == null || envSetting.length === 0
    ? isTrue( config[ key ] )
    : isTrue( env[ key ] ); 


})

module.exports = require( 'deep-freeze' )( config );

function isTrue( str ){

  return 'true'.localeCompare( str, {}, { sensitivity: 'base' } ) === 0;

}
