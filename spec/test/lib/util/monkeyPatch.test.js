/* jshint expr:true  */
describe( 'The monkeyPatch function', ()=>{

  const monkeyPatch
    = require.main.require( 'lib/util/monkeyPatch' );

  it( 'should monkey patch an object with a function at the key provided', ()=>{

    const funcKey
      = 'foo';

    function expected(){}

    const obj
      = { [ funcKey ]: ()=>null };

    monkeyPatch( obj, funcKey, expected );

    const actual
      = obj[ funcKey ];

    expect( actual )
      .to.be.equal( expected );
    
  } );

  it( 'should provide a method to restore the original method', ()=>{

    const funcKey
      = 'foo';

    function expected(){}

    const obj
      = { [ funcKey ]: expected };

    const restore
      = monkeyPatch( obj, funcKey, ()=>null );
    
    restore();

    const actual
      = obj[ funcKey ];

    expect( actual )
      .to.be.equal( expected );

  } );

  it( 'should throw if the key is not a string', ()=>{

    expect( monkeyPatch.bind( null, {}, 0, ()=>null ) )
      .to.throw();

  } );

  it( 'should trow if the object doesn\'t contain a member with the key provided', ()=>{

    expect( monkeyPatch.bind( null, {}, 'key', ()=>null ) )
      .to.throw();

  } );
  
  it( 'should throw if the patch is not a function', ()=>{
    
    const funcKey
      = 'funcKey';

    expect( monkeyPatch.bind( null, { funcKey }, funcKey, 0 ) )
      .to.throw();
  
  } );


  it( 'should throw if the object\'s property is of a different type then the patch', ()=>{
    
    const funcKey
      = 'funcKey';

    expect( monkeyPatch.bind( null, { funcKey }, funcKey, ()=>null ) )
      .to.throw();
  
  } );

} );
