import Papa from 'papaparse'

export function parseCSV(csv, sep='\t') {
  if(!csv) return []

  var result = Papa.parse(csv, {delimiter: sep})
  
  var columns = result.data[0]
  var data = result.data.slice(1)
  
  var contentDictList = data.map(eachData => {
    var result = columns.reduce((o, col, i) => {
      o[col] = eachData[i]
      return o
    }, {})

    return result
  })

  return contentDictList
}
