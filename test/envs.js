require('dotenv').config()
const chai = require('chai')
const expect = chai.expect

describe('envs', function() {
  describe('Google API key', function(){
    it('should be set', function() {
      expect(process.env.GOOGLE_API_KEY).to.be.a('string')
    })
  })
})
