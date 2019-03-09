import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from './sagas';
import { persistReducer, persistStore } from 'redux-persist';
import { reducer as offlineReducer } from 'redux-offline-queue';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const context = require.context( '..', true, /\.\/(common|features).*\/redux\.js$/ );
const projectReducers = {};
context.keys().forEach( path => {
  const componentName = path.replace( /^.+\/([^/]+)\/redux\.js/, '$1' ).toLowerCase();
  projectReducers[ componentName ] = context( path ).reducer;
} );

const createStore = () => {
  const rootReducer = combineReducers( {
    ...projectReducers,
    offline: offlineReducer
  } );

  const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: []
  };
  return configureStore( persistReducer( persistConfig, rootReducer ), rootSaga );
};

export const store = createStore();
export const persistor = persistStore( store );
export const action = creator => store.dispatch( creator );
