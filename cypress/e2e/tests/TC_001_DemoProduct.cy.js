require('cypress-xpath')
import ProductSelection from '../page-object/pages/productSelection'
import ProductDesign from '../page-object/pages/productDesign'
const data = require('../../fixtures/data.json')

describe('Design a Cup', () => {
    beforeEach(() => {
        cy.log('Start of new test case')
        cy.viewport(1600, 950)
    })
    const productSelection = new ProductSelection();
    const productDesign = new ProductDesign()

    const colorOptions = ['COLORZONE-1', 'COLORZONE-2']
    // const color = {'red':'[data-cy=color-index-15]','orange':'[data-cy=color-index-17]'}
    const color = data.Color.color
    // var product = 'Coffee Mug'
    var product = data.Product.product

    it('Should visit the Product Details Page', () => {
        cy.visit('https://store.briklshop.com/en/coffee%20mug');

        cy.log('1. Navigate to Product details page and verify the contents')
        productSelection.checkIfProcuctSelection()
        productSelection.verifyProductDetails(product)
        cy.log('2. Navigate to product design section')
        productSelection.verifyAndClickBtn()
    })

    it('Should change Product Color', () => {
        productDesign.checkPageContent()
        productDesign.verifyProductName(product)
        productDesign.clickOnDesignBtn()

        productDesign.verifyIndexThree()
        cy.log('3. Start editing the item with color')
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
        cy.log('4. Add image to the item and edit it')
        productDesign.clickEditImage()
        productDesign.uploadImage()
        productDesign.clickUpload()
        productDesign.checkImageUpload()
        productDesign.clickPlaceImage()
        productDesign.clickOnCanvas()
        // This particular step took quite a time in my machine so kept 1sec of bugger time
        cy.wait(1000)
        productDesign.clickOnPlacedImage()
        productDesign.clickOnEditButton()
        productDesign.clickOnFlipHorizontal()

        productDesign.clickOnBackEdit()
        productDesign.clickOnImageDone()
    })

});