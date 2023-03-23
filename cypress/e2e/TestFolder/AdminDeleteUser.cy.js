describe('template spec', () => {
  it('Logs in with Admin credentials and deletes a user', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('q@q.com')
    cy.get('input[type="password"]').type('a')
    cy.get('button[type="submit"]').click()
    cy.get('[data-test-id="DELETE-button"]').eq(5).click()
  })
})
