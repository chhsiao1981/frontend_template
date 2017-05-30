import React, {Component} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {getUUID} from '../utils/utils'
import Empty from '../components/Empty'

import styles from './Simple.css'

class Simple extends Component {
  render() {
    const {dispatch, myId, state: {simple}, actions: {doSimple}} = this.props
    var me = simple.get(myId, Immutable.Map())

    if(!myId) return (<Empty />)
    return (
      <div>Hello Simple {myId}</div>
    )
  }
}

export default Simple
