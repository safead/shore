import { all, fork } from 'redux-saga/effects';

const context = require.context( '..', true, /\.\/(common|features).*\/sagas\.js$/ );
const sagas = [];
context.keys().forEach( path => {
  const component = context( path );
  sagas.push( component.default );
} );
export default function * rootSaga() {
  yield all( sagas.map( saga => fork( saga ) ) );
}
