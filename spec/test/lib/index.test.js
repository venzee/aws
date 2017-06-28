/* jshint expr:true */
describe( 'The main module', ()=>{

  const proxyquire
    = require( 'proxyquire' ).noPreserveCache().noCallThru();
  
  const key
    = 'mock';
  
  it( 'should monkey patch aws-sdk methods if packages are loaded', ()=>{

    function patch(){}

    const AWS = proxyquire( '../../../lib/index.js', {
      'aws-sdk':                { [ key ]: ()=>null },
      './loadMockPackages': ()=>[ { key, patch } ]
    } );

    expect( AWS.mock )
      .to.equal( patch );
      
  } );

  it( 'should restore original methods when restore is called', ()=>{

    function original(){}

    const AWS = proxyquire( '../../../lib/index.js', {
      'aws-sdk':                { [ key ]: original },
      './loadMockPackages': ()=>[ { key, patch: ()=>null } ]
    } );

    AWS.restore();

    expect( AWS.mock )
      .to.equal( original );
  } );

  it( 'should allow to restore only once', ()=>{

    const AWS = proxyquire( '../../../lib/index.js', {
      'aws-sdk':            { [ key ]: ()=>null },
      './loadMockPackages': ()=>[ { key, patch: ()=>null } ]
    } );

    AWS.restore();

    expect( AWS.restore )
      .to.be.undefined;

  } );

  it( 'should return the unmodified module if no packages are loaded', ()=>{

    const expected
      = { key };

    const AWS = proxyquire( '../../../lib/index.js', {
      'aws-sdk':            expected,
      './loadMockPackages': ()=>[]
    } );

    expect( AWS )
      .to.eql( expected );

  } );

} );
