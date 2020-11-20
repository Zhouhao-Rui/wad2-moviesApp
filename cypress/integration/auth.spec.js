describe('From Home page', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('should redirect to login page when click Add to favorite', () => {
    cy.get(".btn").eq(0).click()
    cy.url().should("match", /signin/)
  });

  it('should redirect to login page when click Favorite', () => {
    cy.get('[data-cy=favorite]').click()
    cy.url().should("match", /signin/)
  })

  it('should not have the profile and logout', () => {
    cy.get('.nav-link').each(($el) => {
      cy.wrap($el).should("not.eq", "profile").should("not.eq", "logOut")
    })
  })
})

Cypress.Commands.add('errorEmailMessageType', (message) => {
  cy.get('#email').type(message)
  cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
})

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  // error email address
  it('should show error message when email address does not have @', () => {
    cy.errorEmailMessageType("123")
  })

  it('should show error message when email address have no . after @', () => {
    cy.errorEmailMessageType("123@123")  
  })

  it('should show error message when email address have less then 2 chars after .', () => {
    cy.errorEmailMessageType("123@123.c")   
  })

  it('should show error message when email address have longer then 4 chars after .', () => {
    cy.errorEmailMessageType("123@123.ccccc")
  })

  it('should show error message when email address have number after .', () => {
    cy.errorEmailMessageType("123@123.c1")  
  })

  // error password
  it('should show error message when password length is less then 6', () => {
    cy.errorEmailMessageType("123")
  })

  // user account is already occupied
  it('should show error alert message when user account is already occupied', () => {
    cy.get("#email").type(`${Cypress.env("EMAIL")}`)
    cy.get("#password").type(`${Cypress.env("PASSWORD")}`)
    cy.get(".btn").click()
    cy.get(".alert-danger").should("have.text", "The email address is already in use by another account.")
  })

  it('should redirect to sign in page when email address and password is right', () => {
    cy.get("#email").type("123@123.cc")
    cy.get("#password").type("123123")
    cy.get(".btn").click()
    cy.url().should("match", /signin/)
  })
})

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit("/signin")
  })

  it("should show error message when email address is wrong", () => {
    cy.get("#email").type("123@123.ccc")
    cy.get("#password").type("123123")
    cy.get(".btn").click()
    cy.get(".alert-danger").should("have.text", "There is no user record corresponding to this identifier. The user may have been deleted.")
  })

  it("should show error message when password is not related to the email address", () => {
    cy.get("#email").type(`${Cypress.env("EMAIL")}`)
    cy.get("#password").type("111222")
    cy.get(".btn").click()
    cy.get(".alert-danger").should("have.text", "The password is invalid or the user does not have a password.")
  })

  it("should redirect to home page when email address and password is right", () => {
    cy.get("#email").type(`${Cypress.env("EMAIL")}`)
    cy.get("#password").type(`${Cypress.env("PASSWORD")}`)
    cy.get(".btn").click()
    cy.url().should("eq", "http://localhost:3000/")
    cy.get('[data-cy=profile]').should("have.text", "profile")
    cy.get('[data-cy=logout]').should("have.text", "logOut")
  })
})
