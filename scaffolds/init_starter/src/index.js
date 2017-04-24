import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-widgets/lib/less/react-widgets.less'
import Moment from 'moment'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import configureStore from './store'
import {Provider} from 'react-redux'
import ReactGA from 'react-ga'
import config from 'config'
import DevTools from './DevTools'

import App from './hcontainers/App'

ReactGA.initialize(config.googleAnalyticsId);

// useRouterHistory creates a composable higher-order function
const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Route path="/" component={App} />
          </Router>
          {this.renderDevTools()}
        </div>
      </Provider>
    )
  }

  renderDevTools() {
    if(process.env.NODE_ENV === 'production') return (<div></div>)
    return (
      <DevTools />
    )
  }
}
ReactDOM.render(<Root />, document.getElementById('root'))
