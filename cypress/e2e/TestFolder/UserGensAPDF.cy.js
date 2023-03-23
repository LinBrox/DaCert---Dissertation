describe('template spec', () => {
  it('Logs in with a Students Credentials and views the first Certificate', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('1@1.com')
    cy.get('input[type="password"]').type('1')
    cy.get('button[type="submit"]').click()
    cy.contains('This Certificate is for').first().click()
    cy.get('button[type="generatePDF"]').first().click()
    cy.window().then(win => {
      // interact with elements within the new window here
    })
  })
})