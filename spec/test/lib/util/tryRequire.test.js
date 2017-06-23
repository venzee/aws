/* jshint expr:true  */

describe( 'The tryRequire function', ()=>{

  const tryRequire
    = require.main.require( 'lib/util/tryRequire' );

  it( 'should not throw for non-existent modules', ()=>{

    expect( tryRequire.bind( null, '' ) )
      .not.to.throw();

  });

  it( 'should return a falsy value for non-existent modules', ()=>{

    expect( tryRequire( '' ) )
      .to.be.not.ok;

  } );

  it( 'should return a module if that module is found', ()=>{

    expect( tryRequire( 'chai' ) )
      .to.be.ok;

  } );

} );
