import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames/bind'
import Immutable from 'immutable'
import { getUUID, getRootId, getRoot, getChildId, getChildIds, parseQueryString } from '../utils/utils'
import Empty from '../components/Empty'

import styles from './App.css'

// app
import * as doApp from '../reducers/App'

// simple
import Simple from './Simple'
import * as doSimple from '../reducers/Simple'

const cx = classnames.bind(styles)

class App extends PureComponent {
  componentWillMount() {
    const {location: {search}, actions: {doApp}} = this.props
    const query = parseQueryString(search)
    
    let myId = getUUID()
    
    doApp.init(myId, '', query)
  }
  
  render() {
    const {app, actions: { doApp }} = this.props

    let myId = getRootId(this.props)
    let me = getRoot(this.props)
    let simpleId = getChildId(me, 'SIMPLE')
    if(!myId) return (<Empty />)
    return (
      <div>
        <div>Hello App: {myId}</div>
        <Simple myId={simpleId} {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    doApp: bindActionCreators(doApp, dispatch),
    doSimple: bindActionCreators(doSimple, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
