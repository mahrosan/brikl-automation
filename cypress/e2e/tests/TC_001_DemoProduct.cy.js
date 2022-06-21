require('cypress-xpath')

describe('Design a Cup', () => {
    beforeEach(() => {
      cy.log('Start of new test case')
    })

    var product = 'Coffee Mug'
    var productPrice = "13.00"

    it('Visit the design page', () => {
        cy.visit('https://store.briklshop.com/en/coffee%20mug');


        cy.get('[data-cy=product-name]',{ timeout: 5000 })
            .should('have.text',product);
       
        cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/main/div/div[1]/div[1]/div[4]/div/div/p')
            .should('have.text','This classically constructed ceramic mug has a capacity of 330 ml and a dishwasher safe fabrication for convenience. Supplied in a white gift box.')
     
        // This particular element took some time to load fully
        // Time out as fallback
        cy.get('[data-cy=add-to-cart]',{ timeout: 5000 })
            .should('have.text','Design Now')
            .click()

        // Checking Data loads Process
        cy.xpath('//*[@id="__next"]/div/div').should('have.text','Loading...Loading the design assets. Please wait...Powered by')
        
        cy.xpath('//*[@id="tabs-6--tabpanel-0"]/div/div[1]/p',{timeout:10000})
        .should('be.visible')
        .should('have.text','Select a design')

        cy.get('[data-index=0]').should('be.visible')
        cy.get('[data-index=1]').should('be.visible')
        cy.get('[data-index=2]').should('be.visible')
        cy.get('[data-index=3]').should('be.visible')
        cy.get('[data-index=4]').should('be.visible')

        cy.get('[data-cy=studio-Done-button]').click()

        cy.xpath('//*[@id="studio-total-block"]/p').should('have.text',product)

        cy.get('[data-index=3]').click()

    })

});