/* jshint expr:true  */
const path
  = require( 'path' );

describe( 'The constants module', ()=>{

  const ROOT
    = path.relative( __dirname, process.cwd() );

  const PATH_TO_CONSTANTS
    = path.join( ROOT, 'lib', 'constants', 'index' );

  const { EMULATE_SWF }
    = require.main.require( 'lib/constants/keys' ).OPTIONS;
  
  const proxyquire
    = require( 'proxyquire' );
  
  it( 'should apply config file options', ()=>{

    const loadConfig
      = ()=>( { [ EMULATE_SWF ]: 'true' } );
    
    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        {},
      '../util/loadConfig': loadConfig
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  } );

  it( 'should apply env options', ()=>{

    const env
      = { [ EMULATE_SWF ]: 'true' };
    
    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        env,
      '../util/loadConfig': ()=>{}
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  } );

  it( 'should apply env options over config file options', ()=>{

    const env
      = { [ EMULATE_SWF ]: 'true' };
    
    const loadConfig
      = ()=>( { [ EMULATE_SWF ]: 'false' } );

    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        env,
      '../util/loadConfig': loadConfig
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  });

  it( 'should be case insensitive for config file options', ()=>{

    const env
      = { [ EMULATE_SWF ]: 'TruE' };
    
    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        env,
      '../util/loadConfig': ()=>{}
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  } );

  it( 'should be case insensitive for env options', ()=>{

    const env
      = { [ EMULATE_SWF ]: 'tRUe' };
    
    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        env,
      '../util/loadConfig': ()=>{}
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  } );

  it( 'should ignore empty options', ()=>{

    const env
      = { [ EMULATE_SWF ]: '' };
    
    const loadConfig
      = ()=>( { [ EMULATE_SWF ]: 'true' } );

    const CONSTANTS = proxyquire( PATH_TO_CONSTANTS, {
      '../util/env':        env,
      '../util/loadConfig': loadConfig
    } );

    expect( CONSTANTS[ EMULATE_SWF ] )
      .to.be.true;

  } );

} );

