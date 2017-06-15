import * as superagent from 'superagent-bluebird-promise'
import config from 'config'
import Cookie from 'js-cookie'
import { queryToString } from '../utils/utils'
const { API_ROOT } = config

export const CALL_API = Symbol('Call API')

const callApi = (endpoint, {query, method='get', params, files, json}, isWithCredentials=true) => {
  if (endpoint.indexOf(API_ROOT) === - 1) {
    endpoint = API_ROOT + endpoint
  }
  
  if(query) {
    endpoint = `${endpoint}?${queryToString(query)}`
  }

  let request = superagent[method](endpoint)

  if(files) {
    for(let name in files) {
      request = request.attach(name, files[name], files[name].name)
    }
    for (let k in params) {
      request = request.field(k, params[k])
    }
  }
  else if(params) {
    request = request.set('Content-Type', 'application/x-www-form-urlencoded')
    request = request.send(params)
  }
  else if(json) {
    request = request.send(json)
  }

  if(isWithCredentials) {
    let allCookies = Cookie.get()
    let csrftoken = Cookie.get('csrftoken') || ''
    request = request.set({'X-CSRFToken': csrftoken})
    request = request.withCredentials()
  }
  
  return request
    .then((res) => {
      const json = JSON.parse(res.text)

      if(res.statusText !== 'OK') {
        return Promise.reject(res)
      }
      return json
    })
    .catch((res) => {
      console.error('middleware.api: unable to call api: res:', res)
      if(res && res.status === 401) {
        let next_url = encodeURIComponent(window.location.href)
        let url = `/signup/?next=${next_url}`
        return window.location.href = url
      }
    })
}

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint, method, query, params, files, json} = callAPI
  const {types, bailout} = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings. types:', types)
  }

  if (typeof bailout !== 'undefined' && typeof bailout !== 'function') {
    throw new Error('Expected bailout to either be undefined or a function.')
  }

  if (bailout && bailout(store.getState())) {
    return Promise.resolve()
  }
  
  let actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  
  next(actionWith({type: requestType}))

  return callApi(endpoint, {method, query, params, files, json}).then(
    response => next(actionWith({
      response, query,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
