describe( 'The applyPackages function', ()=>{

  const applyPackages
    = require.main.require( 'lib/applyPackages'  );

  const keys = [
    'eatBanana',
    'pickFleas'
  ];

  function noop(){}

  let monkey;

  beforeEach( ()=>monkey = { [ keys[0] ]: noop, [ keys[1] ]: noop } );
  afterEach( ()=>monkey = null );

  it( 'should replace all packages defined in a provided patch map', ()=>{

    const patches = [
      ()=>null,
      ()=>null
    ];

    const expected = {
      [ keys[ 0 ] ]: patches[ 0 ],
      [ keys[ 1 ] ]: patches[ 1 ]
    };

    const patchArgs
      = patches.map( ( patch, i )=>( { key: keys[ i ], patch } ) );
    
    applyPackages(  monkey, patchArgs );
    keys.forEach( ( key )=>expect( monkey[ key ] ).to.equal( expected[ key ] ) );

  } );

  it( 'should provide a function to restore all monkey patched properties', ()=>{

    const patches = [
      ()=>null,
      ()=>null
    ];

    const expected
      = Object.assign( monkey );

    const patchArgs
      = patches.map( ( patch, i )=>( { key: keys[ i ], patch } ) );
    
    const restore
      = applyPackages(  monkey, patchArgs );
    
    restore();
    keys.forEach( ( key )=>expect( monkey[ key ] ).to.equal( expected[ key ] ) );

  } );

} );
