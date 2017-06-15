import Immutable from 'immutable'

// init
export const init = ({myId, myClass, myDuck, parentId, parentClass, parentDuck, ...params}) => {
  return (dispatch, getState) => {
    dispatch(initCore({myId, myClass, myDuck, parentId, parentClass, ...params}))
    if(parentId)
      dispatch(addChild(parentId, parentClass, parentDuck, myId, myClass))
  }
}

const initCore = ({myId, myClass, myDuck, parentId, parentClass, ...params}) => ({
  myId,
  myClass,
  type: myDuck.defineType('INIT'),
  parentId,
  parentClass,
  ...params,
})

export const reduceInit = (state, action) => {
  const {myId, myClass, parentId, type, ...params} = action

  let currentList = state.get('ids', Immutable.List())
  let newList = currentList.push(myId)
  
  return state.merge({ids: newList, [myId]: {myClass, parentId, ...params}})
}

// set-root
export const setRoot = ({myId, myClass, appDuck}) => ({
  myId,
  rootClass: myClass,
  type: appDuck.defineType('SET_ROOT'),
})

export const reduceSetRoot = (state, action) => {
  const {myId, rootClass} = action
  return state.merge({rootId: myId, rootClass})
}

// addChild
export const addChild = (myId, myClass, myDuck, childId, childClass) => ({
  myId,
  myClass,
  type: myDuck.defineType('ADD_CHILD'),
  childId,
  childClass,
})

export const reduceAddChild = (state, action) => {
  const {myId, childId, childClass} = action
  let currentList = state.getIn([myId, 'children', childClass], Immutable.List())
  let newList = currentList.push(childId)
  return state.setIn([myId, 'children', childClass], newList)
}
