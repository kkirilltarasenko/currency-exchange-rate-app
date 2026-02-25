export class CurrencyConverterPage {
  // Selectors
  private selectors = {
    currencyConverter: '[data-testid="currency-converter"]',
    amountInputFrom: '[data-testid="amount-input-from"]',
    amountInputTo: '[data-testid="amount-input-to"]',
    currencySelectFrom: '[data-testid="currency-select-from"]',
    currencySelectTo: '[data-testid="currency-select-to"]',
    swapButton: '[data-testid="swap-currencies-button"]',
    exchangeRateDisplay: '[data-testid="exchange-rate-display"]',
    bankRatesTable: '[data-testid="bank-rates-table"]',
    loadingSpinner: '[data-testid="loading-spinner"]',
    errorMessage: '[data-testid="error-message"]',
    retryButton: '[data-testid="retry-button"]'
  }

  // Actions
  visit() {
    cy.visit('/home')
    return this
  }

  enterFromAmount(amount: number) {
    cy.get(this.selectors.amountInputFrom).clear().type(amount.toString())
    return this
  }

  enterToAmount(amount: number) {
    cy.get(this.selectors.amountInputTo).clear().type(amount.toString())
    return this
  }

  selectFromCurrency(currency: string) {
    cy.get(this.selectors.currencySelectFrom).click()
    cy.get(`[data-testid="currency-option-${currency}"]`).click()
    return this
  }

  selectToCurrency(currency: string) {
    cy.get(this.selectors.currencySelectTo).click()
    cy.get(`[data-testid="currency-option-${currency}"]`).click()
    return this
  }

  swapCurrencies() {
    cy.get(this.selectors.swapButton).click()
    return this
  }

  clickRetry() {
    cy.get(this.selectors.retryButton).click()
    return this
  }

  // Assertions
  shouldBeVisible() {
    cy.get(this.selectors.currencyConverter).should('be.visible')
    return this
  }

  shouldShowFromAmount(amount: string) {
    cy.get(this.selectors.amountInputFrom).should('have.value', amount)
    return this
  }

  shouldShowToAmount(amount: string) {
    cy.get(this.selectors.amountInputTo).should('have.value', amount)
    return this
  }

  shouldShowExchangeRate(rate: string) {
    cy.get(this.selectors.exchangeRateDisplay).should('contain', rate)
    return this
  }

  shouldShowBankRatesTable() {
    cy.get(this.selectors.bankRatesTable).should('be.visible')
    return this
  }

  shouldShowLoading() {
    cy.get(this.selectors.loadingSpinner).should('be.visible')
    return this
  }

  shouldNotShowLoading() {
    cy.get(this.selectors.loadingSpinner).should('not.exist')
    return this
  }

  shouldShowError(message?: string) {
    cy.get(this.selectors.errorMessage).should('be.visible')
    if (message) {
      cy.get(this.selectors.errorMessage).should('contain', message)
    }
    return this
  }

  shouldNotShowError() {
    cy.get(this.selectors.errorMessage).should('not.exist')
    return this
  }

  shouldShowRetryButton() {
    cy.get(this.selectors.retryButton).should('be.visible')
    return this
  }

  // Getters
  getFromAmount() {
    return cy.get(this.selectors.amountInputFrom)
  }

  getToAmount() {
    return cy.get(this.selectors.amountInputTo)
  }

  getFromCurrency() {
    return cy.get(this.selectors.currencySelectFrom)
  }

  getToCurrency() {
    return cy.get(this.selectors.currencySelectTo)
  }
}