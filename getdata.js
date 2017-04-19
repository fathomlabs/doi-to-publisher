var querystream = require('rest-collection-stream')
var through = require('through2')
var pumpify = require('pumpify')
var ProgressBar = require('progress')
var fs = require('fs')

var API_URL = 'http://api.crossref.org/v1/members'

var doi2pub = {}

var n = 0
var progress
var query = {
  offset: 0,
  rows: 1000
}

pumpify.obj(resultstream(), storestream())

function resultstream () {
  console.error('Syncing CrossRef DOI data')
  return querystream(API_URL, {
    qs: query,
    data: getdata,
    next: getnext
  })
}

function storestream () { return through.obj(storeone, done) }

function getdata (res, body) {
  handleErrors(res, body)
  doProgress(body)
  var items = body.message.items
  n += items.length
  return items
}

function getnext (res, body) {
  return n < body.message['total-results'] ? { offset: body.message.query['start-index'] + 1000 } : null
}

function doProgress (body) {
  if (progress) {
    progress.tick(body.message.items.length)
  } else {
    progress = new ProgressBar('Results downloaded: :percent :bar (:current/:total)', {
      width: 100,
      total: body.message['total-results']
    })
  }
}

function handleErrors (res, body) {
  if (body.status === 'failed') {
    console.error('Received an error from the CrossRef API:')
    body.message.forEach(function (error) {
      console.error(error.message)
    })
    process.exit(1)
  }
}

function storeone (data, enc, done) {
  if (data.prefix) {
    data.prefix.forEach(function (entry) {
      doi2pub[entry.value] = {
        publisher: data['primary-name'],
        owner: entry.name
      }
    })
  }
  done()
}

function done(cb) {
  console.error('')
  console.error('Successfully retrieved', n, 'entries from CrossRef')
  fs.writeFileSync('./data.json', JSON.stringify(doi2pub))
  console.error('Wrote', Object.keys(doi2pub).length, 'DOI prefix mappings to ./data.json')
  cb()
}
