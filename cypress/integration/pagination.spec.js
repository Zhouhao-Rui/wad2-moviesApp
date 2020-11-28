let movieName
let upcomingMovieName

Cypress.Commands.add('currentPageTest', (name) => {
  cy.get('[data-cy=page-active]').click()
  cy.get('.card-body').find(`.card-title:contains(${name})`).should('have.length', 1)
})

Cypress.Commands.add('specificPageTest', (name) => {
  cy.get('.page-link').eq(2).click()
  cy.wait(2000)
  cy.get('.page-item').eq(2).each($el => {
    expect($el).to.have.class('active')
  })
  cy.get('.card-body').each($el => {
    cy.wrap($el).find('.card-title').should('not.contain', name)
  })
})

Cypress.Commands.add('nextLinkTest', (name) => {
  cy.get('[data-cy=next-link]').click()
  cy.wait(2000)
  cy.get('.card-body').each($el => {
    cy.wrap($el).find('.card-title').should('not.contain', name)
  })
})

Cypress.Commands.add('preLinkTest', (name) => {
  cy.get('[data-cy=next-link]').click()
  cy.wait(2000)
  cy.get('[data-cy=pre-link]').click()
  cy.wait(2000)
  cy.get('.card-body').find(`.card-title:contains(${name})`).should('have.length', 1)
})
describe('Pagination test', () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")   
      .then((response) => {
        movieName = response.results[0].title
    })
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")   
      .then((response) => {
        upcomingMovieName = response.results[0].title
    })
  })
  describe('Home page pagination test', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('should still show the current page after clicking the current page link', () => {
      cy.currentPageTest(movieName)
    })
    it('should show the specific page after clicking the specific page link', () => {
      cy.specificPageTest(movieName)
    });
    it('should show the next page data after clicking the next link', () => {
      cy.nextLinkTest(movieName)
    })
    it('should show the previous page data after clicking the previous link', () => {
      cy.preLinkTest(movieName)
    })
    it('should support add favorite movies from different page and the current page keep alive in the website', () => {
      cy.get('.btn').eq(0).click()
      cy.get('.btn').eq(1).click()
      cy.get('[data-cy=next-link]').click()
      cy.wait(2000)
      cy.get('.btn').eq(0).click()
      cy.get('.btn').eq(1).click()
      cy.get('[data-cy=favorite]').click()
      cy.wait(2000)
      cy.get('.card').should('have.length', 4)
      cy.get('.nav-link').eq(0).click()
      cy.get('.page-item').eq(1).each($el => {
        expect($el).to.have.class('active')
      })
      cy.get('.card').should('have.length', 18)
    })
  })

  describe('Upcoming page pagination test', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.nav-link').eq(1).click()
    })
    it('should still show the current page after clicking the current page link', () => {
      cy.currentPageTest(upcomingMovieName)
    })
    it('should show the specific page after clicking the specific page link', () => {
      cy.specificPageTest(upcomingMovieName)
    });
    it('should show the next page data after clicking the next link', () => {
      cy.nextLinkTest(upcomingMovieName)
    })
    it('should show the previous page data after clicking the previous link', () => {
      cy.preLinkTest(upcomingMovieName)
    })
    it('should support add watch list movies from different page and the current page keep alive in the website', () => {
      cy.get('.btn').eq(0).click()
      cy.get('.btn').eq(1).click()
      cy.get('[data-cy=next-link]').click()
      cy.wait(2000)
      cy.get('.btn').eq(0).click()
      cy.get('.btn').eq(1).click()
      cy.get('[data-cy=floating-window]').click()
      cy.get('.circle1').click()
      cy.wait(2000)
      cy.url().should('include', 'watchLists')
      cy.get('.card').should('have.length', 4)
      cy.get('.nav-link').eq(1).click()
      cy.get('.page-item').eq(1).each($el => {
        expect($el).to.have.class('active')
      })
      cy.get('.card').should('have.length', 18)
    })
  })

  describe('Floating buttons test', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.nav-link').eq(1).click()
    })
    it('should not have circle button when no watch list movies', () => {
      cy.get('[data-cy=floating-window]').click()
      cy.get('[data-cy=floating-window]').find('div').each($el => {
        expect($el).not.to.have.class('circle')
      })
    });
    it('should have two circle buttons when having one watch list movie', () => {
      cy.get('.btn').eq(0).click()
      cy.get('[data-cy=floating-window]').click()
      cy.get('.circle').should('have.length', 2)
    })
    it('should have three circle buttons when having more than two watch list movie', () => {
      cy.get('.btn').eq(0).click()
      cy.get('.btn').eq(1).click()
      cy.get('.btn').eq(2).click()
      cy.get('[data-cy=floating-window]').click()
      cy.get('.circle').should('have.length', 3)
    })
  })
})