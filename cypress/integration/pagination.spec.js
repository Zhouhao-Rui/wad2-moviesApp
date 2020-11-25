const movieName = "Mulan"
const upcomingMovieName = "Freaky"

describe('Pagination test', () => {
  describe('Home page pagination test', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('should still show the current page after clicking the current page link', () => {
      cy.get('[data-cy=page-active]').click()
      cy.get('.card-body').find(`.card-title:contains(${movieName})`).should('have.length', 1)
    })
    it('should show the specific page after clicking the specific page link', () => {
      cy.get('.page-link').eq(2).click()
      cy.wait(2000)
      cy.get('.page-item').eq(2).each($el => {
        expect($el).to.have.class('active')
      })
      cy.get('.card-body').each($el => {
        cy.wrap($el).find('.card-title').should('not.contain', movieName)
      })
    });
    it('should show the next page data after clicking the next link', () => {
      cy.get('[data-cy=next-link]').click()
      cy.wait(2000)
      cy.get('.card-body').each($el => {
        cy.wrap($el).find('.card-title').should('not.contain', movieName)
      })
    })
    it('should show the previous page data after clicking the previous link', () => {
      cy.get('[data-cy=next-link]').click()
      cy.wait(2000)
      cy.get('[data-cy=pre-link]').click()
      cy.wait(2000)
      cy.get('.card-body').find(`.card-title:contains(${movieName})`).should('have.length', 1)
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
  
})
