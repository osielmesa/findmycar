import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

import TranslationReducer from '../../modules/Translation/TranslationReducer'

const rootReducer = combineReducers({
  translation: TranslationReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store
