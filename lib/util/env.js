// make it easy to switch out process.env queries in testing by
// wrapping env in a script -- use proxyquire to change env
// data for testing.
// See spec/test/lib/util/constants.test.js
module.exports = Object.freeze( {}, Object.assign( process.env ) );