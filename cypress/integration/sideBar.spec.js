const urls = {
  0: [
    "/", 
    "/movies/upcoming", 
    "/movies/favorites"
  ],
  1: [
    "/tvs", 
    "/tvs/toprate", 
    "/tvs/popular"
  ],
  2: [
    "/list", 
    "/list/create"
  ]
}
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

  it('should redirect to the right page when click the secondary item', () => {
    cy.get('[data-cy=menu]').click()
    cy.get('[data-cy=ListItem]').each(($el, itemIndex) => {
      cy.wrap($el).click()
      cy.wrap($el).find('[data-cy=secondaryListItem]').each(($el, index) => {
        cy.wrap($el).find('a').invoke('attr', 'href')
        .then(href => {
          expect(href).to.eq(urls[itemIndex][index])
        });
      })
    })
  })
})
