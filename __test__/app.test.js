

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
/**
 * @jest-environment jsdom
 */

global.fetch = require("jest-fetch-mock")

 const fs = require("fs")
const { default: JSDOMEnvironment, TestEnvironment } = require("jest-environment-jsdom")
 const path = require("path")
 const html = fs.readFileSync(path.resolve(__dirname, "../home.html"), "utf8")
 const app = require("../js/app")

 const { getAllEntries } = require("../js/app")
 const { submitEntry } = require("../js/app")

 jest.mock("../js/app")
//  jest.mock("getAllEntries")

 describe("Functions", () => {

    beforeEach(() => { fetch.resetMocks() })

    describe('getAllEntries', () => {
        test('it makes a get request to /cats', () => {
            app.getAllEntries();
            expect(fetch).toHaveBeenCalled()
            expect(fetch.mock.calls[0][0]).toBeTruthy()
        })
    })
 })

