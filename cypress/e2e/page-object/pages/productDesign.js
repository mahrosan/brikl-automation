require('cypress-xpath')
require('cypress-file-upload')
const pageIdentification = '[data-cy=product-name]'

class ProductDesign {

    checkPageContent() {
        // Kept a 15 second timeout due to the page load did not have any specific time period. It loaded differently each time
        cy.xpath('//*[@id="tabs-6--tabpanel-0"]/div/div[1]/p', { timeout: 15000 })
            .should('be.visible')
            .should('have.text', 'Select a design')

        // Verifies all of the 5 bbuttons present in the design page
        cy.get('[data-index=0]').should('be.visible')
        cy.get('[data-index=1]').should('be.visible')
        cy.get('[data-index=2]').should('be.visible')
        cy.get('[data-index=3]').should('be.visible')
        cy.get('[data-index=4]').should('be.visible')
    }

    clickOnDoneBtnOne() {
        cy.get('[data-cy=studio-Done-button]').click()
    }

    verifyProductName(product) {
        // verifies the product name
        // gets a same parameter used in the ProductSelection page
        cy.xpath('//*[@id="studio-total-block"]/p').should('have.text', product)
    }

    // 3rd index button is invoked
    // checks if the attribute is true or not
    clickOnDesignBtn() {
        cy.get('[data-index=3]').click()
        cy.get('[data-index=3]', { timeout: 5000 }).invoke('attr', 'aria-selected').should('eq', 'true')
    }

    verifyIndexThree() {
        cy.xpath('//*[@id="tabs-6--tabpanel-3"]/div/div[1]/p').should('have.text', 'Add a color')
    }

    verifyColorzoneOptions(colorOptions) {
        var concatedOptions = 'Select option'
        for (var i = 0; i < colorOptions.length; i++) {
            concatedOptions = concatedOptions + colorOptions[i]
        }
        cy.get('[data-cy=studio-color-fill-selector]')
            .should('have.text', concatedOptions)
    }

    selectColorOption(option) {
        cy.get('[data-cy=studio-color-fill-selector]').select(option)
    }

    changeColorOption(color) {
        cy.get(color).click()
    }

    clickIndexThreeDone() {
        cy.get('[data-cy=studio-Done-button]').click()
    }

    // Tried to rotate the image in the canvas, Could not look further into this due to time constraint
    itemRotate() {
        cy.get('#THREEJS')
            .trigger('mousedown', { which: 1, pageX: 200, pageY: 300 })
            .trigger('mousemove', { which: 1, pageX: 600, pageY: 1000 })
            .trigger('mouseup')
    }

    clickEditImage() {
        cy.get('[data-index=4]').click()
    }

    uploadImage() {
        // we could make small change on it and make it as a utils class if the image name and the locator can be passed as a parameter
        // The reason I didn't kept it in the utils is because I just had to use it once
        cy.get('[data-cy=file-dropzone-input]').attachFile('/images/darthvader.jpg')
    }

    verifyUploadPage() {
        cy.get('#chakra-modal--header-246').click()
    }
    clickUpload() {
        cy.get('[data-cy=modal-upload-button]').click()
    }

    checkImageUpload() {
        // Check if the imag has been uploaded or not
        // was trying to check the name as well but system changes the files name so upted for the child element
        // cy.xpath('//*[@id="accordion-panel-248"]/div/div[1]/div/img').should('be.visible')
        cy.xpath('//*[@id="accordion-panel-128"]/div/div[1]/div').children('img').should('be.visible')
    }

    clickPlaceImage() {
        cy.xpath('//*[@id="accordion-panel-128"]/div/div[2]').first().should('have.text', 'Place Image').click()
    }

    clickOnCanvas() {
        cy.xpath('//*[@id="THREEJS"]/canvas').click()
    }

    clickOnPlacedImage() {
        cy.xpath('//*[@id="tabs-6--tabpanel-4"]/div/div[3]/div[2]/div[3]').click()
    }

    clickOnEditButton() {
        cy.get('[data-cy=studio-image-dropzone-edit-placedimage-button]').should('have.text', 'Edit').click()
    }

    clickOnFlipHorizontal() {
        cy.xpath('//*[@id="tabs-6--tabpanel-4"]/div/div[1]/div[2]/div/button[4]').click()
    }

    clickOnBackEdit() {
        cy.xpath('//*[@id="tabs-6--tabpanel-4"]/div/button').click()
    }

    clickOnImageDone() {
        cy.get('[data-cy=studio-Done-button]').click()
    }
}

export default ProductDesign