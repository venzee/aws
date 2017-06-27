describe( 'The loadConfig function', ()=>{

  const loadConfig
    = require.main.require( 'lib/util/loadConfig' );

  const mockFs
    = require( 'mock-fs' );

  const { CONFIG_FILE_NAME }
    = require.main.require( 'lib/constants/keys' ).FILES;

  afterEach( ()=>mockFs.restore() );

  it( 'should load the config file, if it is present', ()=>{
    
    const expected
      = { EMULATE_SWF: true };

    const mockFsConfig
      = { [ CONFIG_FILE_NAME ]: JSON.stringify( expected ) };

    mockFs( mockFsConfig );

    expect( loadConfig() )
      .to.eql( expected );

  } );

  it( 'should not error out, if the config file is not present', ()=>{
    
    expect( loadConfig() )
      .to.eql( {} );

  } );

  it( 'should error out, if the config file has an error', ()=>{
    
    const mockFsConfig
      = { [ CONFIG_FILE_NAME ]: '{ not: "JSON" }' };

    mockFs( mockFsConfig );

    expect( loadConfig )
      .to.throw();

  } );
 
} );
