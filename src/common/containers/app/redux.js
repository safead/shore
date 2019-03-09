import { createReducer, createActions } from 'reduxsauce';
import { persistReducer } from 'redux-persist';
import { ONLINE, OFFLINE } from 'redux-offline-queue';
import storage from 'redux-persist/lib/storage';
import * as constants from 'common/constants';

export const INITIAL_STATE = {
  loadingIcon: false,
  loadingError: false,
  online: false,
  editCustomerId: constants.IDLE
};

const { Types, Creators } = createActions( {
  initApp: null,
  loadingIcon: [ 'show' ],
  loadingError: [ 'value' ],
  editCustomerId: [ 'id' ],
  online: null,
  offline: null
}, {
  prefix: 'redux-offline-queue/'
} );

/* reducers */

export const initApp = state => state;

export const loadingIcon = ( state, { show } ) => ( {
  ...state, loadingIcon: !!show
} );

export const loadingError = ( state, { value } ) => ( {
  ...state, loadingError: !!value
} );

export const editCustomerId = ( state, { id } ) => ( {
  ...state, editCustomerId: id
} );

export const online = state => ( {
  ...state, online: true
} );

export const offline = state => ( {
  ...state, online: false
} );

export const HANDLERS = {
  [ Types.INIT_APP ]: initApp,
  [ Types.LOADING_ICON ]: loadingIcon,
  [ Types.LOADING_ERROR ]: loadingError,
  [ Types.EDIT_CUSTOMER_ID ]: editCustomerId,
  [ ONLINE ]: online,
  [ OFFLINE ]: offline
};

const persistConfig = {
  key: 'app',
  storage: storage,
  whitelist: []
};
export const reducer = persistReducer( persistConfig, createReducer( INITIAL_STATE, HANDLERS ) );
export const actionTypes = Types;
export default Creators;
