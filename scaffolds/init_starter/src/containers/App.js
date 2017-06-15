import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames/bind'
import Immutable from 'immutable'
import { getUUID, getRootId, getRoot, getChildId, getChildIds, parseQueryString } from '../utils/utils'
import Empty from '../components/Empty'

import logo from '../logo.svg'

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
    
    doApp.init(myId, query)
  }
  
  render() {
    const {app, actions: { doApp }} = this.props

    let myId = getRootId(this.props)
    let me = getRoot(this.props)

    if(!myId) return (<Empty />)
    
    const simpleId = getChildId(me, 'SIMPLE')
    const count = me.get('count', 0)

    var onClick = (e) => {
      console.log('onClick: start: myId:', myId)
      doApp.increaseCount(myId)
    }
    
    return (
      <div className={cx('App')}>
        <div className={cx('header')}>
          <img src={logo} className={cx('logo')} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={cx('intro')}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <code>
          <a
            href="https://github.com/chhsiao1981/frontend_template"
            target="_blank"
            rel="noopener noreferrer"
          >
          Frontend-template
          </a>
        </code>
        <div>Hello App: {myId} count: {count}</div>
        <button onClick={onClick}>Inc</button>
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
