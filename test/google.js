require('dotenv').config()
const chai = require('chai')
const expect = chai.expect

const google = require('googleapis')
const books = google.books('v1')

describe('Google Books API', () => {
  describe('API key', () => {
    it('is set', () => {
      expect(process.env.GOOGLE_API_KEY).to.be.a('string')
    })
  })
  describe('Gimpel the Fool by Isaac Bashevis Singer', () => {
    it('has 205 pages', (done) => {
      books.volumes.list({
        auth: process.env.GOOGLE_API_KEY,
        q: 'Isaac Bashevis Singer gimpel the fool'
      }, (err, res) => {
        expect(res.items[0].volumeInfo.pageCount).to.equal(205)
        done()
      })
    })
  })
})
