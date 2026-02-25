// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for currency exchange app
declare global {
  namespace Cypress {
    interface Chainable {
      selectCurrency(currency: string, type: 'from' | 'to'): Chainable<JQuery<HTMLElement>>
      enterAmount(amount: number, type: 'from' | 'to'): Chainable<JQuery<HTMLElement>>
      waitForRates(): Chainable<JQuery<HTMLElement>>
      navigateToPage(page: 'home' | 'exchange-rates' | 'history' | 'settings'): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('selectCurrency', (currency: string, type: 'from' | 'to') => {
  cy.get(`[data-testid="currency-select-${type}"]`).click()
  cy.get(`[data-testid="currency-option-${currency}"]`).click()
})

Cypress.Commands.add('enterAmount', (amount: number, type: 'from' | 'to') => {
  cy.get(`[data-testid="amount-input-${type}"]`).clear().type(amount.toString())
})

Cypress.Commands.add('waitForRates', () => {
  cy.get('[data-testid="bank-rates-table"]').should('be.visible')
  cy.get('[data-testid="loading-spinner"]').should('not.exist')
})

Cypress.Commands.add('navigateToPage', (page: 'home' | 'exchange-rates' | 'history' | 'settings') => {
  const routes = {
    home: '/home',
    'exchange-rates': '/exchange-rates',
    history: '/history',
    settings: '/settings'
  }
  
  cy.get(`[data-testid="nav-link-${page}"]`).click()
  cy.url().should('include', routes[page])
})

export {}