import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; /* optional tag to this import (used if) --> /logOnlyInProduction */
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxReset from 'redux-reset'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = []


 const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware), reduxReset())
 );

const persistor = persistStore(store)

export default {store, persistor};

//store design
// {
//     errData: [],
//     displayedCard:{}
//     resolvedCards: [],
//     currentUser: {}

// }




