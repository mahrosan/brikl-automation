

require('cypress-xpath')

const pageIdentification = '[data-cy=product-name]'
const colorOptions= ['COLORZONE-1', 'COLORZONE-2']
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

    verifyIndexThree()
    {
        cy.xpath('//*[@id="tabs-6--tabpanel-3"]/div/div[1]/p').should('have.text','Add a color')
    }

    verifyColorzoneOptions()
    {
        var concatedOptions ='Select option'
        for (var i = 0; i < colorOptions.length; i++) {
            concatedOptions=concatedOptions+colorOptions[i]
        }
        cy.get('[data-cy=studio-color-fill-selector]')
        .should('have.text',concatedOptions)

    }
}

export default ProductDesign