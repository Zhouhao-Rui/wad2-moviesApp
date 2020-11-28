describe('Sidebar test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should open the menu and get the secondary List', () => {
    cy.get('[data-cy=menu]').click()
    cy.get('[data-cy=ListItem]').should('have.length', 3)
    cy.get('[data-cy=ListItem]').eq(0).click()
    cy.get('[data-cy=secondaryListItem]').should('have.length', 3)
  })

  it('should get the movies when typing in the search input', () => {
    cy.get('[data-cy=menu]').click()
    cy.get('[data-cy=searchInput]').type('Avenger')
    cy.wait(1000)
    cy.get('[data-cy=carousel-item]').should('not.be.empty')
  })
})
