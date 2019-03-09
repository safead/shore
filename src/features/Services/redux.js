import { createReducer, createActions } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as common from 'common/constants';

export const INITIAL_STATE = {
  items: [],
  currentState: common.IDLE
};

const { Types, Creators } = createActions( {
  loadServices: null,
  loadServicesSuccess: [ 'items' ],
  loadServicesFailed: null
}, {
  prefix: 'services/'
} );

/* reducers */

export const loadServices = state => ( {
  ...state, currentState: common.LOADING
} );

export const loadServicesSuccess = ( state, { items } ) => ( {
  currentState: common.IDLE, items: items
} );

export const loadServicesFailed = ( state, { items } ) => ( {
  currentState: common.FAILED,
  items: []
} );

markActionsOffline( Creators, [ 'loadServices' ] ); // wait for alive network

export const HANDLERS = {
  [ Types.LOAD_SERVICES ]: loadServices,
  [ Types.LOAD_SERVICES_SUCCESS ]: loadServicesSuccess,
  [ Types.LOAD_SERVICES_FAILED ]: loadServicesFailed
};

const persistConfig = {
  key: 'services',
  storage: storage,
  blacklist: []
};

export const reducer = persistReducer( persistConfig, createReducer( INITIAL_STATE, HANDLERS ) );
export const actionTypes = Types;
export default Creators;
