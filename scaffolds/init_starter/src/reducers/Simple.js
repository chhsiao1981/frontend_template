import Immutable from 'immutable';
import {funcMapDefault, init, addChild} from './utils'

import * as Classes from '../actions/Classes';
import * as types from '../actions/Types';

var funcMap = {
  [types.INIT]: init,
  [types.ADD_CHILD]: addChild,
}

/**
 * default setup
 */
export default function simple (state=Immutable.Map(), action={}) {
  var myId = state.get('myId', '')

  console.log('reducers.SIMPLE: myId:', myId, 'class:', action.myClass, 'action:', action)

  switch (action.myClass) {
    case Classes.SIMPLE:
      return funcMap[action.type] && funcMap[action.type](state, action) || funcMapDefault(state, action)
    default:
      return funcMapDefault(state, action)
  }
}
