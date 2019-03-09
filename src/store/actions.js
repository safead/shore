const context = require.context( '..', true, /\.\/(common|features).*\/redux\.js$/ );
let actionTypes = {},
  creators = {};
context.keys().forEach( path => {
  const component = context( path );
  actionTypes = { ...actionTypes, ...component.actionTypes };
  creators = { ...creators, ...component.default };
} );
export const types = actionTypes;
export const actions = creators;
