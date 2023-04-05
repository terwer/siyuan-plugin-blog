import { getGreeting } from "../support/app.po"

describe("zhi-static-blog-astro", () => {
    beforeEach(() => cy.visit("/"))

    it("should display welcome message", () => {
        cy.login("my-email@something.com", "myPassword")

        getGreeting().contains("Welcome to Astro")
    })
})
