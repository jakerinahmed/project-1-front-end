/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const path = require("path")
const html = fs.readFileSync(path.resolve(__dirname, "../home.html"), "utf8")

describe("home.html", () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })

    describe("head", () => {

        test("it has a title", () => {
            const title = document.querySelector("title")
            expect(title).toBeTruthy
            expect(title.textContent).toBe("wroteIt") 
        })
    })

    describe("body", () => {

        test("it has a navbar", () => {
            const navbar = document.querySelector("nav")
            expect(navbar).toBeTruthy();
        })

        test("it has a searchbar", () => {
            const form = document.querySelector("form")
            const button = document.querySelector("button")
            expect(form).toBeTruthy()
 
        })
    })

    describe("recent entries", () => {

        test("There are cards present on page", () => {
            const card = document.getElementsByClassName("card")
            expect(card).toBeTruthy()
        })

        test("Comment button present", () => {
            const commentButton = document.getElementsByClassName("comment-button")
            expect(commentButton).toBeTruthy()
            // expect(commentButton.textContent).toBe("Comment")
        })
    })
})
