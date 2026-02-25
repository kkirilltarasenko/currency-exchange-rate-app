export class NavigationPage {
  // Selectors
  private selectors = {
    sidebar: '[data-testid="sidebar"]',
    logo: '[data-testid="logo"]',
    appTitle: '[data-testid="app-title"]',
    navLinks: '[data-testid="nav-links"]',
    navLinkHome: '[data-testid="nav-link-home"]',
    navLinkExchangeRates: '[data-testid="nav-link-exchange-rates"]',
    navLinkHistory: '[data-testid="nav-link-history"]',
    navLinkSettings: '[data-testid="nav-link-settings"]',
    mobileMenuButton: '[data-testid="mobile-menu-button"]',
    mobileNavMenu: '[data-testid="mobile-nav-menu"]',
    mainLayout: '[data-testid="main-layout"]'
  }

  // Actions
  visitHome() {
    cy.visit('/home')
    return this
  }

  visitExchangeRates() {
    cy.visit('/exchange-rates')
    return this
  }

  visitHistory() {
    cy.visit('/history')
    return this
  }

  visitSettings() {
    cy.visit('/settings')
    return this
  }

  clickHome() {
    cy.get(this.selectors.navLinkHome).click()
    return this
  }

  clickExchangeRates() {
    cy.get(this.selectors.navLinkExchangeRates).click()
    return this
  }

  clickHistory() {
    cy.get(this.selectors.navLinkHistory).click()
    return this
  }

  clickSettings() {
    cy.get(this.selectors.navLinkSettings).click()
    return this
  }

  openMobileMenu() {
    cy.get(this.selectors.mobileMenuButton).click()
    return this
  }

  // Assertions
  shouldShowSidebar() {
    cy.get(this.selectors.sidebar).should('be.visible')
    return this
  }

  shouldShowLogo() {
    cy.get(this.selectors.logo).should('be.visible')
    return this
  }

  shouldShowAppTitle() {
    cy.get(this.selectors.appTitle).should('be.visible')
    cy.get(this.selectors.appTitle).should('contain', 'Currency Exchange')
    return this
  }

  shouldShowNavLinks() {
    cy.get(this.selectors.navLinks).should('be.visible')
    return this
  }

  shouldShowMobileMenuButton() {
    cy.get(this.selectors.mobileMenuButton).should('be.visible')
    return this
  }

  shouldShowMobileNavMenu() {
    cy.get(this.selectors.mobileNavMenu).should('be.visible')
    return this
  }

  shouldShowMainLayout() {
    cy.get(this.selectors.mainLayout).should('be.visible')
    return this
  }

  shouldBeOnHomePage() {
    cy.url().should('include', '/home')
    cy.get(this.selectors.navLinkHome).should('have.class', 'active')
    return this
  }

  shouldBeOnExchangeRatesPage() {
    cy.url().should('include', '/exchange-rates')
    cy.get(this.selectors.navLinkExchangeRates).should('have.class', 'active')
    return this
  }

  shouldBeOnHistoryPage() {
    cy.url().should('include', '/history')
    cy.get(this.selectors.navLinkHistory).should('have.class', 'active')
    return this
  }

  shouldBeOnSettingsPage() {
    cy.url().should('include', '/settings')
    cy.get(this.selectors.navLinkSettings).should('have.class', 'active')
    return this
  }

  shouldHighlightActiveLink(page: 'home' | 'exchange-rates' | 'history' | 'settings') {
    const linkSelector = this.selectors[`navLink${this.capitalize(page.replace('-', ''))}` as keyof typeof this.selectors]
    cy.get(linkSelector).should('have.class', 'active')
    return this
  }

  shouldNotHighlightInactiveLinks(activePage: 'home' | 'exchange-rates' | 'history' | 'settings') {
    const pages = ['home', 'exchange-rates', 'history', 'settings']
    pages.filter(page => page !== activePage).forEach(page => {
      const linkSelector = this.selectors[`navLink${this.capitalize(page.replace('-', ''))}` as keyof typeof this.selectors]
      cy.get(linkSelector).should('not.have.class', 'active')
    })
    return this
  }

  // Helper methods
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}