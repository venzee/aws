const AWS
  = require( 'aws-sdk' );

const mockPackages
  = require( './loadMockPackages' )();

if( mockPackages.length ){
  
  const restore
    = require( './applyPackages' )( AWS, mockPackages );
  
  AWS.restore = ()=>{
    delete AWS.restore;
    restore();
  };

}

module.exports = AWS;
