describe( 'The loadMockPackages function', ()=>{

  const path
    = require( 'path' );
  
  it( 'should load modules for packages to be emulated', ()=>{
    
    const expected
      = 'some value';

    const mockModule
      = ()=>expected;

    const loadMockPackages
      = createInstance( mockModule );

    const mockPackages
      = loadMockPackages();

    const actual
      = mockPackages[0].patch();
    
    expect( actual )
      .to.equal(  expected );
    
  } );

  /* helpers */
  const ROOT
    = path.relative( __dirname, process.cwd() );

  const PATH_TO_UIT
    = path.join( ROOT, 'lib', 'loadMockPackages' );
  
  const proxyquire
    = require( 'proxyquire' ).noCallThru().noPreserveCache();
 
  const mockKeys = {
    OPTIONS: {
      EMULATE_MOCK: 'EMULATE_MOCK'
    }
  };

  const mockConstants = {
    [ mockKeys.OPTIONS.EMULATE_MOCK ]: true
  };
 
  const MOCK_KEY
    = 'mockPropertyKey';

  const MOCK_MODULE_KEY
    = '@venzee/mockery';

  const mockPackages = {
    [ mockKeys.OPTIONS.EMULATE_MOCK ]: { key: MOCK_KEY, module: MOCK_MODULE_KEY }
  };


  function createInstance( mockModule ){

    const loadMockPackages = proxyquire( PATH_TO_UIT, {
        './constants':          mockConstants,
        './constants/keys':     mockKeys,
        './constants/packages': mockPackages,
        [ MOCK_MODULE_KEY ]:    mockModule
    } );

    return loadMockPackages;

  }

} );