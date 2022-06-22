require('cypress-xpath')

const pageIdentification = '[data-cy=product-name]'

class ProductSelection {

    // Checks if the particular page  if visible and loaded
    // not a full proof test case, but helps to do the automated verification
    checkIfProcuctSelection(){
        cy.get(pageIdentification).should('be.visible')
    }

    // verifies the products details and checks if the details are available or not
    // the data that is tested can be retrived from the fixtures as well
    // fixuture intergration -Peding.....
    verifyProductDetails(product){
        cy.get('[data-cy=product-name]',{ timeout: 5000 })
        .should('have.text',product);
        cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/main/div/div[1]/div[1]/div[4]/div/div/p')
            .should('have.text','This classically constructed ceramic mug has a capacity of 330 ml and a dishwasher safe fabrication for convenience. Supplied in a white gift box.')

    }
    
    // This particular element took some time to load fully
    // Time out as fallback
    verifyAndClickBtn()
    {
        cy.get('[data-cy=add-to-cart]',{ timeout: 10000 })
            .should('have.text','Design Now')
            .click()
    }


    checkPageLoadComponent()
    {
        // Checking Data loads Process
        cy.xpath('//*[@id="__next"]/div/div').should('have.text','Loading...Loading the design assets. Please wait...Powered by')
    }

    
}

export default ProductSelection