describe('Register User', () => {
  it('should fill out registration form and connect to MetaMask', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/register');

    cy.get('#name').type('CypressTEST');
    cy.get('#formBasicEmail').type('test@test.com');
    cy.get('#formBasicPassword').type('Cypress');
    cy.get('#confirmPassword').type('Cypress');

    cy.get('button:contains("Click Here to sync Wallet")').click({ multiple: true });

    cy.get('button:contains("Register")').click(); // locate and click the register button

    // Optionally, add some assertions to confirm that registration was successful
  });
});