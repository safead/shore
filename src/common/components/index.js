const context = require.context( '.', true, /\.\/.*\/index\.js$/ );
context.keys().forEach( path => {
  const componentName = path.replace( /^.+\/([^/]+)\/index\.js/, '$1' );
  module.exports[ componentName ] = context( path ).default;
} );
