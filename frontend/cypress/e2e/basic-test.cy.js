describe('Basic Test', () => {
  it('should visit the home page', () => {
    cy.visit('/home')
    cy.contains('Currency Exchange')
  })
})