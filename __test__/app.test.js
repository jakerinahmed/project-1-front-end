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
            describe('submitEntry', () => {
                test('it makes a post request to /Entries with the Entry data', () => {
                    const fakeSubmitEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            titleOfPost: { value: 'Test 1' },
                            contentOfPost: { value: 'Hello this is a test entry' }
                        }
                    }
                    app.submitEntry(fakeSubmitEvent);
                    expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                    expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ title: "Test 1", content: 'Hello this is a test entry' }));
                })
            })
        })
    })
    describe('helpers', () => {
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
    })
})
