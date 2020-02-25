describe('Navigation', () => {
  it('Visits the home page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Accueil');
    cy.contains('Langages');
    cy.contains('Frameworks');
    cy.contains('Logiciels');
    cy.contains('Unit-test');
    cy.contains('Login');
    cy.contains('En savoir plus sur les différents langages de programmation');
    cy.contains('En savoir plus sur les différents frameworks');
    cy.contains('En savoir plus sur les différents logiciels');
    cy.contains('En savoir plus sur les outils de test unitaires');
  });
  it('clicking "Langages" navigates to techno list page', () => {
    cy.contains('Langages').click();
    cy.url().should('include', '/#/item-list?type=language');
  });
  it('clicking "Frameworks" navigates to techno list page', () => {
    cy.contains('Frameworks').click();
    cy.url().should('include', '/#/item-list?type=framework');
  });
  it('clicking "Logiciels" navigates to techno list page', () => {
    cy.contains('Logiciels').click();
    cy.url().should('include', '/#/item-list?type=software');
  });
  it('clicking "Unit-test" navigates to techno list page', () => {
    cy.contains('Unit-test').click();
    cy.url().should('include', '/#/item-list?type=test');
  });
  it('clicking "Login" navigates to login page', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/#/login');
  });
  it('clicking "Accueil" navigates to home page', () => {
    cy.contains('Accueil').click();
    cy.url().should('include', '/#/');
  });
  it('clicking Home buttons navigates to techno list pages', () => {
    cy.contains('En savoir plus sur les différents langages de programmation').click();
    cy.url().should('include', '/#/item-list?type=language');
    cy.contains('Accueil').click();
    cy.contains('En savoir plus sur les différents frameworks').click();
    cy.url().should('include', '/#/item-list?type=framework');
    cy.contains('Accueil').click();
    cy.contains('En savoir plus sur les différents logiciels').click();
    cy.url().should('include', '/#/item-list?type=software');
    cy.contains('Accueil').click();
    cy.contains('En savoir plus sur les outils de test unitaires').click();
    cy.url().should('include', '/#/item-list?type=test');
    cy.contains('Accueil').click();
  });
});
