import Immutable from 'immutable'
import { createDuck } from 'redux-duck'
import { getUUID } from '../utils/utils'
import * as utils from './utils'

const myClass = 'SIMPLE'

const myDuck = createDuck(myClass, '{{project_name}}')

const INIT = myDuck.defineType('INIT')
const ADD_CHILD = myDuck.defineType('ADD_CHILD')
const REMOVE_CHILDS = myDuck.defineType('REMOVE_CHILDS')
const REMOVE_IDS = myDuck.defineType('REMOVE_IDS')
const SET_DATA = myDuck.defineType('SET_DATA')

// init
export const init = (myId, parentId, parentClass, parentDuck) => {
  return (dispatch, getState) => {
    dispatch(utils.init({myId, myClass, myDuck, parentId, parentClass, parentDuck}))
  }
}

// reducers
const reducer = myDuck.createReducer({
  [INIT]: utils.reduceInit,
  [ADD_CHILD]: utils.reduceAddChild,
  [REMOVE_CHILDS]: utils.reduceRemoveChilds,
  [REMOVE_IDS]: utils.reduceRemoveIds,
  [SET_DATA]: utils.reduceSetData,
}, Immutable.Map())

export default reducer
