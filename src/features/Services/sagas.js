import { all, takeLatest, put, call } from 'redux-saga/effects';
import { actions, types } from 'store/actions';
import * as emulator from 'common/api_mock';

export function * loadFromServer() {
  try {
    const result = yield call( emulator.getServices ); /* API SERVER REQUEST HERE */
    yield put( actions.loadServicesSuccess( result ) );
  } catch ( ex ) {
    console.error( '[ * Services.loadFromServer]', ex );
    yield put( actions.loadServicesFailed() );
  }
}

export default function * root() {
  yield all( [
    takeLatest( types.LOAD_SERVICES, loadFromServer )
  ] );
};
