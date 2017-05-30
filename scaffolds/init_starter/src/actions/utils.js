import * as Classes from './Classes'
import * as Types from './Types'

export const init = ({myId, myClass, parentId, parentClass, ...params}) => {
  return (dispatch, getState) => {
    dispatch(initCore({myId, myClass, parentId, parentClass, ...params}))
    if(parentId)
      dispatch(addChild(parentId, parentClass, myId, myClass))
  }
}

export const setRoot = (myId, myClass) => ({
  myId,
  myClass: Classes.APP,
  rootClass: myClass,
  type: Types.SET_ROOT,
})

const initCore = ({myId, myClass, parentId, parentClass, ...params}) => ({
  myId,
  myClass,
  type: Types.INIT,
  parentId,
  parentClass,
  ...params,
})

const addChild = (myId, myClass, childId, childClass) => ({
  myId,
  myClass,
  type: Types.ADD_CHILD,
  childId,
  childClass,
})

export const error = ({myId, myClass, ...params}) => ({
  myId,
  myClass,
  type: Types.ERROR,
  params,
})
