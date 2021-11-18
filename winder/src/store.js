import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducers } from './reducers/index'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducers, composedEnhancer)

export default store