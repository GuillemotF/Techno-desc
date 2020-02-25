describe('Login', () => {
  it('fails on wrong email input', () => {
    cy.server();
    cy.route('POST', 'login/*', 'fixture:failed_login.json');
    cy.visit('http://localhost:3000/#/login');
    cy.get('[data-test="email-input"]')
      .type('wrong@email.com')
      .should('have.value', 'wrong@email.com');
    cy.get('[data-test="password-input"]')
      .type('passwd')
      .should('have.value', 'passwd');
    cy.get('[data-test="submit-button"]').click();
    cy.contains('Email not found');
  });
});
