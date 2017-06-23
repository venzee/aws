/* jshint expr:true  */
describe( 'The monkeyPatch function', ()=>{

  const monkeyPatch
    = require.main.require( 'lib/util/monkeyPatch' );

  it( 'should monkey patch an object with a function at the key provided', ()=>{

    const key
      = 'key';

    function patch(){}

    const obj
      = { [ key ]: ()=>null };

    monkeyPatch( obj, { key, patch } );

    const actual
      = obj[ key ];

    expect( actual )
      .to.be.equal( patch );
    
  } );

  it( 'should provide a method to restore the original method', ()=>{

    const key
      = 'key';

    function expected(){}

    const obj
      = { [ key ]: expected };

    const restore
      = monkeyPatch( obj, { key, patch: ()=>null } );
    
    restore();

    const actual
      = obj[ key ];

    expect( actual )
      .to.be.equal( expected );

  } );

  it( 'should throw if the key is not a string', ()=>{

    expect( monkeyPatch.bind( null, {}, { key: 0, patch: ()=>null } ) )
      .to.throw();

  } );

  it( 'should trow if the object doesn\'t contain a member with the key provided', ()=>{

    expect( monkeyPatch.bind( null, {}, { key: 'key', patch: ()=>null } ) )
      .to.throw();

  } );
  
  it( 'should throw if the patch is not a function', ()=>{
    
    const key
      = 'key';

    expect( monkeyPatch.bind( null, { key }, { key, patch: 0 } ) )
      .to.throw();
  
  } );


  it( 'should throw if the object\'s property is of a different type then the patch', ()=>{
    
    const key
      = 'key';

    expect( monkeyPatch.bind( null, { key }, { key, patch: ()=>null } ) )
      .to.throw();
  
  } );

} );
