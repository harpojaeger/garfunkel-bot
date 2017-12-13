const csv = require('csvtojson')

const dateFormat = require('dateformat')

require('dotenv').config()

const google = require('googleapis')
const books = google.books('v1')


// We don't have data after November 2016
const endDate = new Date(2016, 10, 30)

var promises = []

function setPageNumber(book){
  return new Promise((resolve, reject) => {
    if (book.pages === ''){
      let params = {
        auth: process.env.GOOGLE_API_KEY,
        q: book.title + ' ' + book.author
      }
      books.volumes.list(params, (err, res) => {
        console.log('searching for page numbers', params.q)
        if (err) reject(err)
        if(res && res.hasOwnProperty('items')) {
          // placeholder for some smarter way of making sure it's the right book
          book.pages = res.items[0].volumeInfo.pageCount
          console.log('pages:', book.pages)
        } else {
          book.pages = 0
        }
        resolve(book)
      })
    } else {
      resolve(book)
    }
  })
}

csv().fromFile('./data.csv')
.on('json', book => {
  promises.push(setPageNumber(book))
})
.on('done', error => {
  Promise.all(promises).then( values => {
    console.log('page calcs done, books:', values.length)
  })
  .catch(reason => {
    console.log(reason)
  })
})
