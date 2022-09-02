/**
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../home.html'), "utf8")

global.fetch = require('jest-fetch-mock')
let app;
describe('App', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/app.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('requests', () => {

        describe('getAllEntries', () => {

            test('it fetches entries from heroku', () => {
                app.getAllEntries()
                expect(fetch.mock.calls[0][0]).toMatch(/journal-entries/)
            })
        })
        describe('submitEntry', () => {
            test('it makes a post request to /Entries with the Entry data', () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        titleOfPost: { value: 'Test 1' },
                        contentOfPost: { value: 'Hello this is a test entry' },
                        gifUrl: { value: 'http.gifman'}
                    }
                }
                app.submitEntry(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ title: "Test 1", content: 'Hello this is a test entry', gif: 'http.gifman' }));
            })
        })
    })

    describe('helpers', () => {

        // describe("redirect", () => {
        //     xtest("redirect to homepage", () => {
        //         app.redirect()
        //         expect(window.location.pathname).toContain("home.html")
        //     })
        // })

        describe('appendEntry', () => {
            test('it adds a new entry to the page with journal entries', () => {
                const entryCount = document.querySelectorAll('.card-body').length;
                app.appendEntry({ title: 'Test 2', content: 'This is test 2' });
                const newEntryCount = document.querySelectorAll('.card-body').length;
                expect(newEntryCount).toEqual(entryCount + 1)
                expect(document.querySelector('.card-title').textContent).toContain("Test 2");
                expect(document.querySelector('.card-text').textContent).toContain('This is test 2');
            })
        })

        // describe('search', () => {
        //     xtest('search bar shows results with test matching search', () => {
        //         const allPosts = document.querySelectorAll('.card-body')
        //         let input = document.querySelector('#searchBar')
        //         app.search()
        //         expect(allPosts.textContent).toContain('estrgnjwfuraberubueBUnw')
        //     })
        // })

        describe('appendEntries', () => {
            test('it posts multiple entries to the page', () => {

                const fakeAPI = [
                    { title: "Test", content: "This is a test" },
                    { title: "Test 2", content: "This is another test" }
                ]
                app.appendEntries(fakeAPI)
                const entryCount = document.querySelectorAll('.card-body').length
                expect(entryCount).toBe(2)
            })
        })

        // describe('updateEmojiCount', () => {
        //     test('it makes a patch request to /journal-entries/id with the added emoji data', () => {

        //         const fakeAPI = [
        //             { title: "Test", content: "This is a test" },
        //             { title: "Test 2", content: "This is another test" }
        //         ]

        //         app.appendEntries(fakeAPI)
        //         let emojiSpan = document.querySelector(".emojiBtn")

        //         // const countId = "e1:3"
        //         // const entryId = 1
        //         // const emojiNo = 3

        //         app.updateEmojiCount(emojiSpan);
        //         expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'PATCH');
        //         expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ emoji3: 18 }));
        //     })
        // })


        // describe("updateEmojiCount", () => {
        //     test("it upadates emoji count when clicked", () => {

        //         const fakeSubmitEvent = {title : "Emoji Test", content : "This is an emoji test"}
        //         app.appendEntries(fakeSubmitEvent)

        //     })
        // })

        describe("getOneEntry", () => {
            test("get one entry from API when clicked on from homepage", () => {
                app.getOneEntry()
                expect(fetch.mock.calls[0][0]).toMatch(/journal-entries/)
            })
        })

    })

})
