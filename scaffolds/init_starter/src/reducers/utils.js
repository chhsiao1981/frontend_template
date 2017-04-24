import Immutable from 'immutable';


export function funcMapDefault(state, action) {
  /*
  * return default function
  */
  return state
}

export function setRoot(state=Immutable.Map(), action={}) {
  const {myId} = action
  return state.set('myId', myId)
}

export function init(state=Immutable.Map(), action={}) {
  const {myId, myClass, parentId, type, ...params} = action

  var currentList = state.get('ids', Immutable.List())
  var newList = currentList.push(myId)
  
  return state.merge({ids: newList, [myId]: {myClass, parentId, ...params}})
}

export function addChild(state=Immutable.Map(), action={}) {
  const {myId, childId, childClass} = action
  var currentList = state.getIn([myId, 'children', childClass], Immutable.List())
  var newList = currentList.push(childId)
  return state.setIn([myId, 'children', childClass], newList)
}
