describe('tarefas', () => {

   let testeData;

   // Cria um gancho que repete apenas uma vez (uma função)
   before(() => {
        cy.fixture('tasks').then(t => {
            testeData = t
        })
    })

   context('cadastro', () => {

        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Estudar JavaScript'

            cy.removeTaskByName(taskName)

            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible') // Valida se o elemento está visível
        })

        it('não deve permitir tarefa duplicada', () => {

            const task = testeData.dup

            cy.removeTaskByName(task.name)

            // Dado que eu tenho uma tarefa duplicada

            cy.postTask(task)

            // Quando faço o cadastro dessa tarefa

            cy.createTask(task.name)

            // Então vejo a mensagem de duplicada

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('campo obrigatório', () => {
            cy.createTask()

            cy.isRequired('This is a required field')
            // Valida um campo obrigatório no qual o texto não é HTML
        })
    })

    context('atualização', () => {

        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'Ler um livro',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent() // Busca o elemento pai
                .find('button[class*=ItemToggle]') // Busca um elemento dentro do elemento pai
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through') // Valida se tem CSS e valida a estilização
        })
    })

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = {
                name: 'Fazer um bolo',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent() 
                .find('button[class*=ItemDelete]') 
                .click()
            
            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})