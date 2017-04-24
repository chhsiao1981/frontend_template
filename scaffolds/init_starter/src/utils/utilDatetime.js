export function milliTimestampToDatetime(milli_timestamp) {
  return new Date(parseInt(milli_timestamp))
}

export function secTimestampToDatetime(sec_timestamp) {
  return new Date(parseInt(sec_timestamp * 1000))
}

export function getCurrentDatetime(timezone=8) {
  //get current datetime, default to tw
  var theDatetime = new Date()
  return new Date(theDatetime.getTime() + theDatetime.getTimezoneOffset() * 60 * 1000 + timezone * 3600 * 1000)
}

export function getCurrentUTCDatetime() {
  return getCurrentDatetime(0)
}

export function getCurrentDate(timezone=8) {
  //get Current date, default to tw
  var theDate = getCurrentDatetime(timezone)
  theDate.setHours(0)
  theDate.setMinutes(0)
  theDate.setSeconds(0)
  theDate.setMilliseconds(0)
  return theDate
}

export function getCurrentUTCDate() {
  return getCurrentDate(0)
}

export function getCurrentDatetimeSec(timezone=8) {
  var theDate = getCurrentDatetime(timezone)
  theDate.setMilliseconds(0)
  return theDate
}

export function getCurrentUTCDatetimeSec() {
  return getCurrentDatetimeSec(0)
}

export function addDay(theDate, days) {
  return new Date(theDate.getTime() + days * 86400 * 1000)
}

export function maxDate(a, b) {
  return new Date(Math.max(a, b))
}

export function minDate(a, b) {
  return new Date(Math.min(a, b))
}
