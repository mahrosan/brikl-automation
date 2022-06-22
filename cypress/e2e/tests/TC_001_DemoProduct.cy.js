require('cypress-xpath')
import ProductSelection from '../page-object/pages/productSelection'
import ProductDesign from '../page-object/pages/productDesign'

describe('Design a Cup', () => {
    beforeEach(() => {
      cy.log('Start of new test case')
    })
    const productSelection = new ProductSelection();
    const productDesign = new ProductDesign()
    const colorOptions= ['COLORZONE-1', 'COLORZONE-2']
    const color = {'red':'[data-cy=color-index-15]','orange':'[data-cy=color-index-17]'}

    var product = 'Coffee Mug'

    it('Visit the Product Details Page', () => {
        cy.visit('https://store.briklshop.com/en/coffee%20mug');
        cy.viewport(1600, 914)

        productSelection.checkIfProcuctSelection()
        productSelection.verifyProductDetails(product)
        productSelection.verifyAndClickBtn()
    })

    it('Change Product Color', () => {
        productDesign.checkPageContent()
        productDesign.verifyProductName(product)
        productDesign.clickOnDesignBtn()

        productDesign.verifyIndexThree()

        // Selection option of the dropdown in verified in this section
        productDesign.verifyColorzoneOptions(colorOptions)
        cy.wait(3000)
        // First color option is worked on
        productDesign.selectColorOption(colorOptions[0])
        productDesign.changeColorOption(color['red'])
        // Second color option is worked on
        productDesign.selectColorOption(colorOptions[1])
        productDesign.changeColorOption(color['orange'])
        cy.wait(500)
        productDesign.clickIndexThreeDone()
    })



    it('Adds Image to product', () => {
 
    })

});