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

