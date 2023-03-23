describe('template spec', () => {
  it('Logs in with Admin credentials', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('q@q.com')
    cy.get('input[type="password"]').type('a')
    cy.get('button[type="submit"]').click()
  })
})
