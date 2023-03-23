describe('template spec', () => {
  it('Logs in with a Students Credentials and views the first Certificate', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('1@1.com')
    cy.get('input[type="password"]').type('1')
    cy.get('button[type="submit"]').click()
    cy.contains('This Certificate is for').first().click()
    cy.get('button[type="verifyCert"]').first().click()
    cy.visit('http://localhost:3000/verifyCert')
    cy.get('input[type="certID"]').type('0x0434be442e98911a0d2841d11a783160787d912a7dd5a8500cd8d52634bdd09a')
    cy.get('[data-test-id="search-button"]').click()
  })
})