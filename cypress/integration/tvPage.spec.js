let todayTVs = []
let todayTVsPageTwo = []
let popularTVs = []
let topRateTVs = []
let hotTVs = []
describe('TVPage test', () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        todayTVs = response.results
      })
    cy.request(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=2`
    )
      .its("body")
      .then((response) => {
        todayTVsPageTwo = response.results
      })
    cy.request(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        topRateTVs = response.results
      })
    cy.request(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        popularTVs = response.results
      })
    cy.request(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        hotTVs = response.results.sort((a, b) => { return (b.popularity - a.popularity) }).slice(0, 8)
      })
  })
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=menu]').click()
    cy.get('[data-cy=ListItem]').eq(1).click()
    cy.get('[data-cy=secondaryListItem]').eq(0).click()
    cy.url().should('match', /tv/)
  })

  describe("TVs page test", () => {
    it('should show the hot air tvs in the search header with detail movie page link', () => {
      cy.get('[data-cy=hot-link]').each(($el, index) => {
        cy.wrap($el).invoke('attr', 'href').then(href => {
          expect(href).to.contain(hotTVs[index].id)
        })
        cy.wrap($el).find('span').should('contain', hotTVs[index].name)
      })
    })

    it('should show the tvs sorted by Vote count', () => {
      todayTVs.sort((a, b) => {
        return b.vote_count - a.vote_count
      })
      cy.get('[data-cy=sort-button]').eq(1).click({ force: true })
      cy.wait(1000)
      cy.get('[data-cy=card-content]').each(($el, index) => {
        cy.wrap($el).find('[data-cy=vote-count]').should('contain', "" + todayTVs[index].vote_count)
      })
    })

    it('should show the tvs sorted by Vote average', () => {
      todayTVs.sort((a, b) => {
        return b.vote_average - a.vote_average
      })
      cy.get('[data-cy=sort-button]').eq(2).click({ force: true })
      cy.wait(1000)
      cy.get('[data-cy=card-content]').each(($el, index) => {
        cy.wrap($el).find('[data-cy=vote-average]').should('contain', "" + todayTVs[index].vote_average)
      })
    })

    it('should show the tvs sorted by release date', () => {
      todayTVs.sort((a, b) => {
        const aTime = new Date(a["first_air_date"])
        const bTime = new Date(b["first_air_date"])

        return bTime.getTime() - aTime.getTime()
      })
      cy.get('[data-cy=sort-button]').eq(3).click({ force: true })
      cy.wait(1000)
      cy.get('[data-cy=card-content]').each(($el, index) => {
        cy.wrap($el).find('[data-cy=first-air-date]').should('contain', "" + todayTVs[index].first_air_date)
      })
    })

    it('should show the tvs sorted by popularity', () => {
      todayTVs.sort((a, b) => {
        return b.popularity - a.popularity
      })
      cy.get('[data-cy=sort-button]').eq(1).click({ force: true })
      cy.get('[data-cy=sort-button]').eq(0).click({ force: true })
      cy.wait(1000)
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).should('contain', todayTVs[index].name)
      })
    })
  })

})
