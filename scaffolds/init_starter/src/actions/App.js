import * as Classes from './Classes'
import * as Types from './Types'
import * as utils from './utils'
import {getUUID} from '../utils/utils'

import * as doSimple from './Simple'

const myClass = Classes.APP

export const init = (myId, query) => {
  var simpleId = getUUID()
  
  return (dispatch, getState) => {
    dispatch(utils.init({myId, myClass, query}))
    dispatch(utils.setRoot(myId, myClass))

    dispatch(doSimple.init(simpleId, myId, myClass))
  }
}
