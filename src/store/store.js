import {compose,createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { persistStore,persistReducer } from 'redux-persist'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const persistConfig = {
    key:'root',
    storage,
blacklist:['user']
}

const sagaMiddleware = createSagaMiddleware()
const persisReducer = persistReducer(persistConfig,rootReducer)
const middleWares = [process.env.NODE_ENV !== 'production' && logger,sagaMiddleware].filter(Boolean)

const composedEnhancers = (process.env.NODE_ENV!== 'production' && window&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_)||compose(applyMiddleware(...middleWares));

export const store = createStore(persisReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)