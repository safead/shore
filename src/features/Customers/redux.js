import { createReducer, createActions } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as common from 'common/constants';
import uuid from 'uuid/v1';

export const INITIAL_STATE = {
  items: [],
  currentState: common.IDLE
};

const { Types, Creators } = createActions( {
  loadCustomers: null,
  loadCustomersSuccess: [ 'items' ],
  loadCustomersFailed: null,
  submitCustomer: [ 'payload' ],
  deleteCustomer: [ 'id' ]
}, {
  prefix: 'customers/'
} );

/* reducers */

export const loadCustomers = state => ( {
  ...state, currentState: common.LOADING
} );

export const loadCustomersSuccess = ( state, { items } ) => ( {
  currentState: common.IDLE,
  items: items
} );

export const loadCustomersFailed = state => ( {
  currentState: common.FAILED,
  items: []
} );

export const saveCustomers = state => ( {
  ...state, currentState: common.LOADING
} );

export const submitCustomer = ( state, { payload } ) => {
  let items;
  payload.id ?
    items = state.items.map( item => item.id === payload.id ? payload : item ) :
    items = [ ...state.items, { ...payload, id: uuid() } ];
  return { ...state, items: items };
};

export const deleteCustomer = ( state, { id } ) => {
  return { ...state, items: state.items.filter( item => item.id !== id ) };
};

markActionsOffline( Creators, [ 'loadCustomers', 'saveCustomers' ] ); // wait for alive network

export const HANDLERS = {
  [ Types.LOAD_CUSTOMERS ]: loadCustomers,
  [ Types.LOAD_CUSTOMERS_SUCCESS ]: loadCustomersSuccess,
  [ Types.LOAD_CUSTOMERS_FAILED ]: loadCustomersFailed,
  [ Types.SUBMIT_CUSTOMER ]: submitCustomer,
  [ Types.DELETE_CUSTOMER ]: deleteCustomer
};

const persistConfig = {
  key: 'customers',
  storage: storage,
  blacklist: []
};

export const reducer = persistReducer( persistConfig, createReducer( INITIAL_STATE, HANDLERS ) );
export const actionTypes = Types;
export default Creators;
