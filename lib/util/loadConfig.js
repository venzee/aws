const fs
  = require( 'fs-extra' );

const { CONFIG_FILE_NAME }
  = require( '../constants/keys' ).FILES;

function loadConfig(){

  try {
    return fs.readJsonSync( CONFIG_FILE_NAME );
  } catch( error ) {
    if( error.code !== 'ENOENT' ) throw( error );
  }

  return {};

}

module.exports = loadConfig;

