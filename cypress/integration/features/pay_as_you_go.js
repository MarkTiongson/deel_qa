context('Create Contract', () => {
  beforeEach(() => {
    //Logs in user first
    cy.visit('https://dev.deel.wtf/login')

    cy.get('.login-container.container')
      .should('contain', 'Log in')
   
    cy.get('input[name="email"]')
    	.type('markj.tiongson@gmail.com').should('have.value', 'markj.tiongson@gmail.com')

    cy.get('input[name="password"]')
     	.type('#!Password123')

    cy.get('.button.mt-10.w-100').contains('log in')
    	.click()

    //closes popup
    cy.get('.button.button-close',{ timeout: 30000 })
      .click();

    cy.get('.page-content')
      .should('contain', 'view my contracts')

  })
  
  describe('Pay As You Go Contract', () => {
    it('.should() - create a new pay as you go contract', () => {

    	cy.contains('Create a Contract')
    		.click()

      cy.get('.page-content')
      	.should('contain', 'Start creating your contract by selecting the most relevant type.')

      cy.get('.mt-9')
      	.contains('Pay As You Go')
    		.click()

    	cy.get('.mb-10')
      	.should('contain', 'Creating a pay as you go contract')

    	cy.get('input[name="name"]')
    		.type('Pay As You Go Test Contract').should('have.value', 'Pay As You Go Test Contract')

    	cy.get('textarea[name="scope"]')
    		.type('This is a sample pay as you go contract')

    	cy.get('.calendar-input[name="effectiveDate"]')
    		.click()

    	//selects "Contractor's start date": today minus 1 day
    	cy.get('button.react-calendar__tile.react-calendar__tile--now').prev()
    		.click()

    	cy.get('.button').contains('next')
    		.click()

    	//Define the rate: £ 1,000
    	cy.get('input[name="rate"]')
    		.type('1000').should('have.value', '1000')

    	cy.get('.select__single-value.css-1uccc91-singleValue')
      	.contains('USD - US Dollar')
      	.click()

      //Currency: GBP - British Pound
      cy.contains('GBP - British Pound').click()

    	cy.get('.select__single-value.css-1uccc91-singleValue')
      	.contains('Hour')
      	.click()

      //Per: Week
      cy.contains('Week').click()

      cy.get('.button').contains('next')
    		.click()

    	cy.get('.page-content')
      	.should('contain', 'Define dates of contract')

      cy.get('.button').contains('next')
    		.click()

    	//Add a Special Clause
      cy.get('.button').contains('add a special clause')
    		.click()

    	cy.get('textarea')
    		.type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  		
  		cy.get('.button').contains('next')
    		.click()

    	cy.get('.page-content')
      	.should('contain', 'Contract compliance')

    	//"Where is the contractor's tax residence?": United States / Colorado
    	cy.get('.select__placeholder.css-1wa3eu0-placeholder')
      	.contains('Select country')
      	.click()

      cy.contains('United States').click()

      cy.get('.select__placeholder.css-1wa3eu0-placeholder')
        .contains('Choose a state')
      	.click()

      cy.contains('Colorado').click()

      cy.get('.button').contains(' create contract')
    		.click()

    	cy.get('.page-content', { timeout: 30000 })
      	.should('contain', 'Pay As You Go Test Contract')
      	.should('contain', 'Pay as you go')
      	.should('contain', '£1,000 per week')
      	.should('contain', 'Special clause')
      	.should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      	.should('contain', 'Colorado (United States)')

      //Logout
      cy.get('.tooltip[data-original-title="Logout"]')
        .click()
    
      cy.get('.login-container.container')
        .should('contain', 'Log in')
  })
  })
  })
