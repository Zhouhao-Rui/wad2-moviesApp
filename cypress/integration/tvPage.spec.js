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
    cy.wait(1000)
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

  describe('Pagination test', () => {
    it('should show the specific page data when clicking the specific pagination button', () => {
      cy.get('.MuiPagination-ul').find("li").eq(2).find('button').click({ force: true })
      cy.wait(500)
      cy.url().should('contain', 'pages/2')
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).should('contain', todayTVsPageTwo[index].name)
      })
    })

    it('should show the next page data when clicking the forward pagination button', () => {
      cy.get('.MuiPagination-ul').find("li").eq(1).find('button').click({ force: true })
      cy.get('.MuiPagination-ul').find("li:last-child").find('button').click({ force: true })
      cy.wait(500)
      cy.url().should('contain', 'pages/2')
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).should('contain', todayTVsPageTwo[index].name)
      })
    })
  })

  describe('Search functionality test', () => {
    it('should filter the tv shows when typed word is found in the page', () => {
      const tvs = todayTVs.filter(tv => {
        return tv.name.toLowerCase().search(("The").toLowerCase()) !== -1
      })
      cy.get('[data-cy=search-field]').type('The')
      cy.get('[data-cy=card-content]').should('have.length', tvs.length)
    })

    it('should show no tv shows when typed word is not found in the page', () => {
      cy.get('[data-cy=search-field]').type('AAAAA')
      cy.get('[data-cy=card-content]').should('not.exist')
    })

    it('should jump to the search page to display the page with typed word when click the search button', () => {
      cy.get('[data-cy=search-field]').type('The')
      cy.get('.search-button').click({ force: true })
      cy.wait(500)
      cy.url().should("contain", "search/The")
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).contains('The', { matchCase: false })
      })
    })
  })

  describe('Rate functionality test', () => {
    it('should rate for the film and show the success message', () => {
      cy.get('[data-cy=rate-button]').eq(0).find("span").find("a").click({ force: true })
      cy.wait(500)
      cy.get('#simple-controlled-10').trigger('mouseover', { force: true })
      cy.get('[data-cy=send-button]').click()
      cy.wait(500)
      cy.get('[data-cy=msg]').should('be.visible')
      cy.wait(3000)
      cy.url().should("match", /tvs/)
    })

    it('should delete rate if the tv show is rated', () => {
      cy.get('[data-cy=rate-button]').eq(0).find("span").find("a").click({ force: true })
      cy.wait(2000)
      cy.get('[data-cy=delete-button]').click()
      cy.get('[data-cy=msg]').should('be.visible')
      cy.wait(3000)
      cy.get('[data-cy=delete-button]').should('not.exist')
    })
  })

  describe('Different tv shows toggle test', () => {
    it('should direct to the populat TVs page when clicking the button', () => {
      cy.get('[data-cy=cate-button]').eq(1).find("span").eq(0).find('a').click({force: true})
      cy.wait(2000)
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).should('contain', popularTVs[index].name)
      })
    })
    it('should direct to the top rated TVs page when clicking the button', () => {
      cy.get('[data-cy=cate-button]').eq(2).find("span").eq(0).find('a').click({force: true})
      cy.wait(2000)
      cy.get('[data-cy=tv-name]').each(($el, index) => {
        cy.wrap($el).should('contain', topRateTVs[index].name)
      })
    })
  })
  

})
