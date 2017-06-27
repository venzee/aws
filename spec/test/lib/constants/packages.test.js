/* jshint expr:true  */
describe( 'The PACKAGES namespace', ()=>{

  const { OPTIONS }
    = require.main.require( 'lib/constants/keys' );
  
  const PACKAGES
    = require.main.require( 'lib/constants/packages' );
  
  it( 'should define a mapping for each EMULATE_* option', ()=>{

    const missingDefinitions = Object
      .keys( OPTIONS )
      .filter( x=>x.startsWith( 'EMULATE_' ) && PACKAGES[ x ] == null );

    expect( missingDefinitions )
      .to.be.empty;

  } );

} );