describe("Testing our inputs and submit our form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3001")
    })
    it("Will fill our form inputs and submit form", function(){
        cy.get('input[name="name"]')
          .type("Rachele Edwards")
          .should("have.value", "Rachele Edwards")
        cy.get('input[name="email"]')
          .type("thundrchikn@gmail.com")
          .should("have.value", "thundrchikn@gmail.com")
        cy.get('input[name="password"]')
          .type("HelloWorld")
          .should("have.value", "HelloWorld")
        cy.get('input[type="checkbox"]')
          .check()
          .should("be.checked")
        cy.get("button")
          .click()
    })
  
      it('displays errors on login', function () {
        // incorrect username on purpose
        cy.get('input[name=name]').type('Jane Doe')
        cy.get('input[name=password]').type('Hello{enter}')
  
        // we should have visible errors now
        cy.get('p.error')
        .should('be.visible')
        .and('contain', "Password must be a minimum of 8 characters")
  
      })

      //stretch
      it("Checking if there is a h1", function(){
        cy.get('h1')
          .should('contain', "Sign Up!")
    })
})