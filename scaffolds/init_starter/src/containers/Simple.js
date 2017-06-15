import React, { PureComponent } from 'react'
import classnames from 'classnames/bind'
import Immutable from 'immutable'
import { getUUID, getRootId, getRoot, getChildId, getChildIds } from '../utils/utils'
import Empty from '../components/Empty'

import styles from './Simple.css'

const cx = classnames.bind(styles)

class Simple extends PureComponent {
  render() {
    const {myId, simple, actions: {doSimple}} = this.props
    let me = simple.get(myId, Immutable.Map())

    if(!myId) return (<Empty />)
    return (
      <div>Hello Simple: {myId}</div>
    )
  }
}

export default Simple
