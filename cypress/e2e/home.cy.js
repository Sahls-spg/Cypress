describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L') 
    
    // cy.title: Obtem a informacao que fica na aba do navegador
    // eq: igual 
  })
})