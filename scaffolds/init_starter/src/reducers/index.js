import {combineReducers} from 'redux'
import app from './App'
import simple from './Simple'

const rootReducer = combineReducers({
  app,
  simple,
})

export default rootReducer
