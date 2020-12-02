let shows = []
const id = '5256cf6c19c2956ff609bd8e'
describe('People page test', () => {
  before(() => {
    cy.request(`https://api.themoviedb.org/3/credit/${id}?api_key=${Cypress.env("TMDB_KEY")}`)
    .its("body")
    .then(res => {
      shows = res.person.known_for
    })
  })
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=menu]').click()
    cy.get('[data-cy=ListItem]').eq(1).click()
    cy.get('[data-cy=secondaryListItem]').eq(0).click()
    cy.url().should('match', /tv/)
    cy.get('[data-cy=search-field]').type("Grey's Anatomy")
    cy.get('.search-button').click({ force: true })
    cy.get('[data-cy=detail-link]').eq(0).click({ force: true })
    cy.get("[data-cy=people-link]").click()
  })
  it('should show the productions the people created', () => {
    cy.get('[data-cy=people-poster]').each(($el, index) => {
      cy.wrap($el).invoke('attr', 'src').should('contain', shows[index].poster_path)
    })
  })
  it('should direct to the TV detail page after clicking the img', () => {
    cy.get('[data-cy=people-poster]').eq(0).click()
    cy.url().should('contain', shows[0].id)
  })
})
