const CONFIG_FILE_NAME
  = '.venzeeawsrc';

const fs
  = require( 'fs-extra' );

function loadConfig(){

  try {
    return fs.readJsonSync( CONFIG_FILE_NAME );
  } catch( error ) {
    if( error.code !== 'ENOENT' ) throw( error );
  }

  return {};

}

module.exports
  = Object.defineProperty( loadConfig, 'CONFIG_FILE_NAME', { value: CONFIG_FILE_NAME } );
