/**
 * @jest-environment jsdom
 */

 const fs = require('fs')
 const path = require('path')
 const html = fs.readFileSync(path.resolve(__dirname, '../view.html'), "utf8")
 
 global.fetch = require('jest-fetch-mock')
 let app;

 describe("app", () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/app.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe("functions",() => {

        describe("viewEntry", () => {
            test("View an entry", () => {
                const fakeEntry = {title : "Test viewEntry", content : "This is a test for viewEntry"}
                app.viewEntry(fakeEntry)
                expect(document.querySelector('.card-title').textContent).toContain("Test viewEntry");
                expect(document.querySelector('.card-text').textContent).toContain('This is a test for viewEntry');
            })
        })

    })

    describe("Comment section", () => {

        describe("add comment button", () => {
            test("Check there is an add comment button", () => {
                const addCommentBtn = document.querySelector('.addcomment-btn');

                expect(addCommentBtn).toBeTruthy()
            })
        })

        describe("addComment", () => {
            test("Comment box appears", () => {
                app.addComment()
                const formCount = document.querySelector("#get-form")
                expect(formCount).toBeTruthy()
            })

            test("Add comment box disappears after clicking", () => {
                const addComentBtn = document.querySelector(".addcomment-btn")
                // addComentBtn.className = "addcomment-button"
                const getFormBtn = document.createElement('button')
                getFormBtn.className = "card-link text-right comment"
                getFormBtn.type = "button"
                getFormBtn.id = "get-form"
                getFormBtn.append('Add comment')
        
                addComentBtn.appendChild(getFormBtn)
                let clickCount = 1
                app.addComment()
                const formCount = document.querySelector("#get-form")
                expect(formCount).toBeFalsy()
            })
            test("Comment form dissapears after submitting", () => {
                const addComentBtn = document.querySelector(".addcomment-btn")
                // addComentBtn.className = "addcomment-button"
                const newDiv = document.createElement('div')
                newDiv.className = 'card w-100';
                newDiv.id = 'form-div'
            
                const newForm = document.createElement('form')
                newForm.id = "new-comment-form"
                newDiv.appendChild(newForm)
            
                const newTextArea = document.createElement('textarea')
                newTextArea.className = "form-control"
                newTextArea.id = "contentOfComment"
                newTextArea.setAttribute("rows", "3");
                newTextArea.setAttribute("placeholder", "Start typing...")
                
                const btnDiv = document.createElement('div')
                btnDiv.className = "m-1"
                btnDiv.id = "submitBtn"
            
                const inputBtn = document.createElement('input')
                inputBtn.type = "submit"
                inputBtn.id = "submitComment"
                inputBtn.setAttribute("value", "comment It!");
                btnDiv.appendChild(inputBtn)
                
                newForm.append(newTextArea, btnDiv)
                addComentBtn.append(newDiv)
                let clickCount = 2
                app.addComment()
                const formCount = document.querySelector("#form-div")
                expect(formCount).toBeFalsy()
            })
        })


        // describe("submitComment", () => {
        //     xtest("sending comment to API", () => {
        //         const fakeComment = {
        //             preventDefault: jest.fn(),
        //             target: {
        //                 contentOfComment: { value: 'Test Comment' }
        //             }
        //         }
        //         app.addComment()
        //         app.submitComment(fakeComment);
        //         expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
        //         expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ content : "Test Comment" }));
        //     })
        // })

        describe("getEntryComments", () => {
            test("Gets comments from API", () => {
                app.getEntryComments()
                expect(fetch.mock.calls[0][0]).toMatch(/comments/)
            })
        })

        describe("appendComment", () => {
            test("Adds a new comment to page", () => {
                let commentCount = document.querySelectorAll(".card-body").length
                app.appendComment({comment : "test comment"})
                const newCommentCount = document.querySelectorAll(".card-body").length
                expect(newCommentCount).toBe(commentCount+1)

            })
        })

        describe("appendComments", () => {
            test("It appends multiple comments", () => {
                const fakeCommentAPI = [
                    { comment : "Test Comment 1" },
                    { comment : "Test Comment 2" }
                ]
                app.appendComments(fakeCommentAPI)
                const commentCount = document.querySelectorAll('.card-body').length
                expect(commentCount).toBe(2)
            })
        })


    })


 })
