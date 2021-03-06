const author = "Zhouhao Rui"
const content = "This is the best film in the history!!!"
describe('Review form test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('write review from favorite page', () => {
    cy.get('.btn').eq(0).click()
    cy.get('[data-cy=favorite]').click()
    cy.wait(500)
    cy.get('.btn').eq(0).click()
    cy.wait(500)
    cy.get('[data-cy=reviewInput]').type(author)
    cy.get('textarea').type(content)
    cy.get('.btn').eq(0).click()
    cy.wait(500)
    cy.get('.card').eq(0).click()
    cy.wait(500)
    cy.get('.btn-block').click()
    cy.wait(500)
    cy.get('tr').find(`td:contains(${author})`).should('have.length', 1)
    cy.get('tr').find(`td:contains(${content})`).should('have.length', 1)
  })

  it('write review from watch list page', () => {
    cy.get('.nav-link').eq(1).click()
    cy.wait(500)
    cy.get('.btn').eq(0).click()
    cy.get('[data-cy=floating-window]').click()
    cy.wait(800)
    cy.get('.circle1').click()
    cy.wait(500)
    cy.get('.btn').eq(0).click()
    cy.wait(500)
    cy.get('[data-cy=reviewInput]').type(author)
    cy.get('textarea').type(content)
    cy.get('.btn').eq(0).click()
    cy.wait(500)
    cy.get('.card').eq(0).click()
    cy.wait(500)
    cy.get('.btn-block').click()
    cy.wait(500)
    cy.get('tr').find(`td:contains(${author})`).should('have.length', 1)
    cy.get('tr').find(`td:contains(${content})`).should('have.length', 1)
  })
})
