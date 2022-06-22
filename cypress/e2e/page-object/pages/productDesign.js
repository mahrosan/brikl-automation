require('cypress-xpath')

const pageIdentification = '[data-cy=product-name]'

class ProductDesign {

    checkPageContent()
    {
        // Kept a 15 second timeout due to the page load did not have any specific time period. It loaded differently each time
        cy.xpath('//*[@id="tabs-6--tabpanel-0"]/div/div[1]/p',{timeout:15000})
        .should('be.visible')
        .should('have.text','Select a design')

        // Verifies all of the 5 bbuttons present in the design page
        cy.get('[data-index=0]').should('be.visible')
        cy.get('[data-index=1]').should('be.visible')
        cy.get('[data-index=2]').should('be.visible')
        cy.get('[data-index=3]').should('be.visible')
        cy.get('[data-index=4]').should('be.visible')
    }

    clickOnDoneBtnOne()
    {
        cy.get('[data-cy=studio-Done-button]').click()
    }

    verifyProductName(product)
    {
        // verifies the product name
        // gets a same parameter used in the ProductSelection page
        cy.xpath('//*[@id="studio-total-block"]/p').should('have.text',product)
    }

    // 3rd index button is invoked
    // checks if the attribute is true or not
    clickOnDesignBtn()
    {
        cy.get('[data-index=3]').click()
        cy.get('[data-index=3]',{timeout:5000}).invoke('attr','aria-selected').should('eq','true')
    }
}

export default ProductDesign