import { createDuck } from 'redux-duck'
import Immutable from 'immutable'

import { getUUID } from '../utils/utils'
import * as utils from './utils'

import * as doSimple from './Simple'

const myClass = 'APP'

export const myDuck = createDuck(myClass, '{{project}}')

const INIT = myDuck.defineType('INIT')
const ADD_CHILD = myDuck.defineType('ADD_CHILD')
const SET_ROOT = myDuck.defineType('SET_ROOT')
const REMOVE_CHILDS = myDuck.defineType('REMOVE_CHILDS')
const REMOVE_IDS = myDuck.defineType('REMOVE_IDS')
const SET_DATA = myDuck.defineType('SET_DATA')
const INCREASE_COUNT = myDuck.defineType('INCREASE_COUNT')

// init
export const init = (myId, query) => {
  let simpleId = getUUID()
  
  return (dispatch, getState) => {
    dispatch(utils.init({myId, myClass, myDuck, count: 0, ...query}))
    dispatch(utils.setRoot({myId, myClass, appDuck: myDuck}))

    dispatch(doSimple.init(simpleId, myId, myClass, myDuck))
  }
}

// increase count
export const increaseCount = (myId) => ({
  myId,
  myClass,
  type: INCREASE_COUNT,
})

const _increaseCount = (state, action) => {
  const {myId} = action
  let count = state.getIn([myId, 'count'], 0)
  return state.setIn([myId, 'count'], count + 1)
}

// reducers
const reducer = myDuck.createReducer({
  [INIT]: utils.reduceInit,
  [ADD_CHILD]: utils.reduceAddChild,
  [SET_ROOT]: utils.reduceSetRoot,
  [REMOVE_CHILDS]: utils.reduceRemoveChilds,
  [REMOVE_IDS]: utils.reduceRemoveIds,
  [SET_DATA]: utils.reduceSetData,
  [INCREASE_COUNT]: _increaseCount,
}, Immutable.Map())

export default reducer
