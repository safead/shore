import { all, takeLatest, put, select, call } from 'redux-saga/effects';
import { actions, types } from 'store/actions';
import { selectors } from 'store/selectors';
import * as emulator from 'common/api_mock';

export function * loadFromServer() {
  try {
    const result = yield call( emulator.getCustomers ); /* API SERVER REQUEST HERE */
    yield put( actions.loadCustomersSuccess( result ) );
  } catch ( ex ) {
    console.error( '[ * Customers.loadFromServer]', ex );
    yield put( actions.loadCustomersFailed() );
  }
}

export function * saveToServer() {
  try {
    const allCustomers = yield select( selectors.getAllCustomers );
    yield call( emulator.saveCustomers, allCustomers ); /* API SERVER REQUEST HERE */
  } catch ( ex ) {
    console.error( '[ * Customers.saveToServer]', ex );
  }
}

export default function * root() {
  yield all( [
    takeLatest( types.LOAD_CUSTOMERS, loadFromServer ),
    takeLatest( types.SUBMIT_CUSTOMER, saveToServer ),
    takeLatest( types.DELETE_CUSTOMER, saveToServer )
  ] );
};
