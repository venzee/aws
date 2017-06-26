describe( 'The loadConfig function', ()=>{

  const loadConfig
    = require.main.require( 'lib/util/loadConfig' );

  const mockFs
    = require( 'mock-fs' );
    
  afterEach( ()=>mockFs.restore() );

  it( 'should load the config file, if it is present', ()=>{
    
    const expected
      = { EMULATE_SWF: true };

    const mockFsConfig
      = { [ loadConfig.CONFIG_FILE_NAME ]: JSON.stringify( expected ) };

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
      = { [ loadConfig.CONFIG_FILE_NAME ]: '{ not: "JSON" }' };

    mockFs( mockFsConfig );

    expect( loadConfig )
      .to.throw();

  } );
 
} );
