const context = require.context( '..', true, /\.\/(common|features).*\/selectors\.js$/ );
export const selectors = {};
context.keys().forEach( path => {
  const component = context( path );
  Object.keys( component ).forEach( methodName => {
    selectors[ methodName ] = component[ methodName ];
  } );
} );
