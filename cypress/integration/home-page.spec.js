describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  describe('Base Test', () => {
    it('displays page header', () => {
      cy.get('h2').contains("All Movies");
      cy.get('.badge').contains(20);
    })
  })
})



