require('cypress-xpath')
import ProductSelection from '../page-object/pages/productSelection'
import ProductDesign from '../page-object/pages/productDesign'

describe('Design a Cup', () => {
    beforeEach(() => {
      cy.log('Start of new test case')
    })
    const productSelection = new ProductSelection();
    const productDesign = new ProductDesign()

    var product = 'Coffee Mug'

    it('Visit the design page', () => {
        cy.visit('https://store.briklshop.com/en/coffee%20mug');
        cy.viewport(1600, 914)

        productSelection.checkIfProcuctSelection()
        productSelection.verifyProductDetails(product)
        productSelection.verifyAndClickBtn()
        productDesign.checkPageContent()
        
        productDesign.verifyProductName(product)


        productDesign.clickOnDesignBtn()

    })

});