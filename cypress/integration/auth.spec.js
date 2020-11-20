import firebase from 'firebase'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  databaseURL: Cypress.env("FIREBASE_DATABASEURL"),
  projectId: Cypress.env("FIREBASE_PROJECTID"),
  storageBucket: Cypress.env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("FIREBASE_MESSAGINGSENDERID"),
  appId: Cypress.env("FIREBASE_APPID"),
  measurementId: Cypress.env("FIREBASE_MESUREMENTID")
})

export const auth = app.auth()

const deleteUserAccount = () => {
  auth.signInWithEmailAndPassword("123@123.cc", "123123").then(user => {
    auth.currentUser.delete().then(() => {

    }).catch(e => {

    })
  }).catch(e => {

  })
}

Cypress.Commands.add('errorEmailMessageType', (message) => {
  cy.get('#email').type(message)
  cy.get('[data-cy=email-warning]').should("have.text", "Invalid email address")
})
describe('Auth test', () => {
  before(() => {
    deleteUserAccount()
  })

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
  
  describe('Register Page', () => {
    before(() => {
      cy.visit('/')
      cy.get('[data-cy=signin]').click()
      cy.get('.hint').find("a").click()
    })
  
    beforeEach(() => {
      cy.get("#email").clear()
      cy.get("#password").clear()
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
    before(() => {
      cy.visit('/')
      cy.get('[data-cy=logout]').click()
      cy.get('[data-cy=signin]').click()
    })
  
    beforeEach(() => {
      cy.get("#email").clear()
      cy.get("#password").clear()
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
  
  describe('Profile Page', () => {
    before(() => {
      cy.visit('/')
    })
  
    it('should display images of favorite movies', () => {
      cy.get(".btn").eq(0).click()
      cy.get(".btn").eq(1).click()
      cy.get(".btn").eq(2).click()
      cy.get('[data-cy=profile]').click()
      cy.url().should("match", /profile/)
      cy.get('.carousel-img').should('have.length', 3)
    })
  })
  
})

