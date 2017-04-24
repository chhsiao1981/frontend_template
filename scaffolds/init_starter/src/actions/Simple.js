import * as Classes from './Classes'
import * as Types from './Types'
import * as utils from './utils'

const myClass = Classes.SIMPLE

export const init = (myId, parentId, parentClass) => {
  return (dispatch, getState) => {
    dispatch(utils.init({myId, myClass, parentId, parentClass}))
  }
}
