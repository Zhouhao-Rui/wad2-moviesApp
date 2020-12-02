let similarTVs = []
const id = 1416
let reviews = []
describe('TV Detail page test', () => {
  before(() => {
    cy.request(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`)
      .its("body")
      .then(response => {
        similarTVs = response.results.slice(0, 8)
      })

    cy.request(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`)
      .its("body")
      .then(response => {
        reviews = response.results
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
  })
  it('should display the similar TV shows', () => {
    cy.get('[data-cy=tv-name]').each(($el, index) => {
      cy.wrap($el).should("contain", similarTVs[index].name)
    })
  })
  it('should display the reviews', () => {
    cy.get('[data-cy=review-attr]').each(($el, index) => {
      cy.wrap($el).find("td").eq(0).should('contain', reviews[0].author)
      cy.wrap($el).find("td").eq(1).should('contain', reviews[index].content)
    })
  })
  it('should direct to the creator page when click the creator link', () => {
    cy.get("[data-cy=people-link]").click()
    cy.url().should('contain', '/people/5256cf6c19c2956ff609bd8e')
  })
})
