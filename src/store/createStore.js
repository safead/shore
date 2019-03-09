import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from 'redux-offline-queue';

export default ( rootReducer, rootSaga ) => {
  const middleware = [];
  middleware.push( offlineMiddleware() );
  const sagaMiddleware = createSagaMiddleware();
  const suspendSagaMiddleware = suspendSaga( sagaMiddleware );
  middleware.push( suspendSagaMiddleware );
  middleware.push( consumeActionMiddleware() );
  const store = createStore( rootReducer, applyMiddleware( ...middleware ) );
  sagaMiddleware.run( rootSaga );
  return store;
};
