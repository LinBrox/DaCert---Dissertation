describe('template spec', () => {
  it('Admin Logs in and Clicks onto a User', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/login')
    cy.get('input[type="email"]').type('q@q.com')
    cy.get('input[type="password"]').type('a')
    cy.get('button[type="submit"]').click()

    cy.get('table:first-of-type tbody tr:nth-of-type(2)').click();
  })
})
