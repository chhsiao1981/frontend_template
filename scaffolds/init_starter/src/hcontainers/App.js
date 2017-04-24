import React, {Component} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import * as doApp from '../actions/App'
import * as doSimple from '../actions/Simple'
import {getUUID} from '../utils/utils'
import Empty from '../components/Empty'

import Simple from '../containers/Simple'

import styles from './App.css'

class App extends Component {
  componentWillMount() {
    const {dispatch, location: {query}, actions: {doApp}} = this.props
    var myId = getUUID()
    
    dispatch(doApp.init(myId, '', query))
  }
  
  render() {
    const {dispatch, state, actions} = this.props
    const {app} = state

    var myId = app.get('myId', '')
    var me = app.get(myId, Immutable.Map())
    var simpleId = app.getIn([myId, 'children', 'SIMPLE', 0])
    if(!myId) return (<Empty />)
    return (
      <div>
        <div>Hello {myId}</div>
        <Simple myId={simpleId} {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  actions: {
    doApp,
    doSimple,
  },
  state,
})

export default connect(mapStateToProps)(App)
