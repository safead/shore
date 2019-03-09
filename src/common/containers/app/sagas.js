import { put, all, race, takeLatest, take, delay, fork } from 'redux-saga/effects';
import { types, actions } from 'store/actions';
import * as constants from 'common/constants';

export function * loadAppState() {
  if ( navigator.onLine ) yield put( actions.online() );
  yield all( [
    put( actions.loadingIcon( true ) ),
    put( actions.loadCustomers() ),
    put( actions.loadServices() )
  ] );
  const [ [ errorCustomers ], [ errorServices ] ] = yield all( [
    yield race( [
      take( types.LOAD_CUSTOMERS_FAILED ),
      take( types.LOAD_CUSTOMERS_SUCCESS )
    ] ),
    yield race( [
      take( types.LOAD_SERVICES_FAILED ),
      take( types.LOAD_SERVICES_SUCCESS )
    ] )
  ] );
  // handle loading error to UI if needed, not visualized now
  yield put( actions.loadingError( !!errorCustomers || !!errorServices ) );
  yield fork( hideSpinner );
}

export function * hideSpinner() {
  // show loading spinner 1 second longer then real connections take
  yield delay( constants.LOADING_SPINNER_DEBOUNCE );
  yield put( actions.loadingIcon( false ) );
}

export default function * root() {
  yield all( [
    takeLatest( types.INIT_APP, loadAppState )
  ] );
};
