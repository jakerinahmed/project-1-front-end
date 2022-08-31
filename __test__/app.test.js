
require('jest-fetch-mock').enableMocks()
// const fs = require('fs')
// const { default: JSDOMEnvironment, TestEnvironment } = require('jest-environment-jsdom')
// const path = require('path')
// const html = fs.readFileSync(path.resolve(__dirname, '../home.html'), "utf8")
// const app = require('../js/app')

// const { submitEntry } = require('../js/app')
jest.mock('../js/app.js')
//  jest.mock('getAllEntries')



describe('Functions', () => {
    const app = require('../js/app.js')
   beforeEach(() => { fetch.resetMocks() })
   describe('getAllEntries', () => {
       test('it fetches entries from heroku', async () => {
           await app.getAllEntries()
           expect(fetch).toHaveBeenCalled()
       })
   })


   // describe('submitEntry', () => {
   //     test('it submits new entries', () => {
   //     })
   // })
})