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
      cy.wrap($el).should("not.eq", "profile").should("not.eq", "logout")
    })
  })
})

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  // error email address
  it('should show error message when email address does not have @', () => {
    cy.get("#email").type("123")
    cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
  })

  it('should show error message when email address have no . after @', () => {
    cy.get("#email").type("123@123")
    cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
  })

  it('should show error message when email address have less then 2 chars after .', () => {
    cy.get("#email").type("123@123.c")
    cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
  })

  it('should show error message when email address have longer then 4 chars after .', () => {
    cy.get("#email").type("123@123.ccccc")
    cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
  })

  it('should show error message when email address have number after .', () => {
    cy.get("#email").type("123@123.c1")
    cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
  })

  // error password
  it('should show error message when password length is less then 6', () => {
    cy.get("#password").type("123")
    cy.get('[data-cy=password-warning]').should("have.text", "Must be 6 chars or more")
  })

  // user account is already occupied
  it('should show error alert message when user account is already occupied', () => {
    cy.get("#email").type(`${Cypress.env("EMAIL")}`)
    cy.get("#password").type(`${Cypress.env("PASSWORD")}`)
    cy.get(".alert-danger").should("have.text", "The email address is already in use by another account.")
  })

  it('should redirect to sign in page when email address and password is right', () => {
    cy.get("#email").type("123@123.cc")
    cy.get("#password").type("123123")
    cy.url().should("match", /signin/)
  })
})
