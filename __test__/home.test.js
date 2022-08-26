/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const { TestEnvironment } = require("jest-environment-jsdom")
const path = require("path")
const { hasUncaughtExceptionCaptureCallback } = require("process")

const html = fs.readFileSync(path.resolve(__dirname, "../home.html"), "utf8")

describe("home.html", () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })

    describe("head", () => {
        test("it has a title", () => {
            const title = document.querySelector("title")
            expect(title.textContent).toContain("wroteIt") 
        })
    })
})
