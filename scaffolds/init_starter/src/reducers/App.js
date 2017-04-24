import Immutable from 'immutable';
import {funcMapDefault, init, setRoot, addChild} from './utils'

import * as Classes from '../actions/Classes';
import * as types from '../actions/Types';

var funcMap = {
  [types.INIT]: init,
  [types.ADD_CHILD]: addChild,
  [types.SET_ROOT]: setRoot,
}

/**
 * default setup
 */
export default function app (state=Immutable.Map(), action={}) {
  var myId = state.get('myId', '')

  console.log('reducers.App: myId:', myId, 'class:', action.myClass, 'action:', action)

  switch (action.myClass) {
    case Classes.APP:
      return funcMap[action.type] && funcMap[action.type](state, action) || funcMapDefault(state, action)
    default:
      return funcMapDefault(state, action)
  }
}
