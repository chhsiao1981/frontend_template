import Immutable from 'immutable'

// init
export const reduceInit = (state, action) => {
  const {myId, myClass, parentId, type, ...params} = action

  let currentList = state.get('ids', Immutable.List())
  let newList = currentList.push(myId)
  
  return state.merge({ids: newList, [myId]: {myClass, parentId, ...params}})
}

// set-root
export const reduceSetRoot = (state, action) => {
  const {myId, rootClass} = action
  return state.merge({rootId: myId, rootClass})
}

// addChild
export const reduceAddChild = (state, action) => {
  const {myId, childId, childClass} = action
  let currentList = state.getIn([myId, 'children', childClass], Immutable.List())
  let newList = currentList.push(childId)
  return state.setIn([myId, 'children', childClass], newList)
}
