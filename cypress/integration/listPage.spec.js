let details = []
describe('List Page Test', () => {
  before(() => {
    cy.visit('/')
    cy.request(`https://api.themoviedb.org/3/account/${Cypress.env("TMDB_ACCOUNT_ID")}/lists?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&session_id=${Cypress.env("TMDB_SESSION_ID")}&page=1`)
    .its("body")
    .then(res => {
      details = res.results
    })
  })
  describe('Create List Test', () => {
    before(() => {
      cy.get('[data-cy=menu]').click()
      cy.get('[data-cy=ListItem]').eq(2).click()
      cy.get('[data-cy=secondaryListItem]').eq(1).click()
    })
    it('should display the warning message when Name is not typed', () => {
      cy.get("#description").type("123123131231")
      cy.get("[data-cy=create-button]").click()
      cy.get('.text-danger').eq(0).should('contain', "name is required")
    });
    it('should display the warning message when description is empty', () => {
      cy.get("#name").type("List")
      cy.get('#description').clear()
      cy.get("[data-cy=create-button]").click()
      cy.get('.text-danger').eq(1).should('contain', "description is required")
    })
    it('should display the warning message when description is empty', () => {
      cy.get('#description').type("123")
      cy.get("[data-cy=create-button]").click()
      cy.get('.text-danger').eq(1).should('contain', "Must be 10 chars or more")
    })
    it('should redirect to the list page when information is true', () => {
      cy.get('#description').type("This is the test list")
      cy.get("[data-cy=create-button]").click()
      cy.url().should('contain', '/list')
    })
  })
  describe('List Page', () => {
    it("should display the medias' names in the list", () => {
      cy.get("[data-cy=list-item]").should("have.length", details.length)
    })
  })
  
})
