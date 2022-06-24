require('cypress-xpath')

class Store {
    checkPageLoadComponent()
    {
        // Checking Data loads Process
        cy.xpath('//*[@id="__next"]/div/div').should('have.text','Loading...Loading the design assets. Please wait...Powered by')
    }


    checkProductItemDetail(i,currency,price,edges)
    {
        // checks the attribute of the img and verifies if the alternate name of the img matches or not
        cy.get('[data-cy=product-card-image').children('img').eq(i).invoke('attr','alt').should('eq',edges[i].node.title)
        var compressedURL = edges[i].node.thumbnailUrl+"?auto=compress&trim=auto&trim-md=0&ixlib=react-9.3.0&h=350"
        // check ths src url of the image and also concates the compress url to it
        cy.get('[data-cy=product-card-image').children('img').eq(i).invoke('attr','src').should('eq',compressedURL)
        // Check if the item title matches or not
        cy.get('[data-cy=product-card-title]').eq(i).should('have.text',edges[i].node.title)
        // checks if the Prices are according to the API response or not
        cy.get('[data-cy=product-sale-price-on-card').eq(i).should('have.text',currency+' '+price)

    }

    verifyStoreLandingPage(contactPersonName,email,phoneNo)
    {
        cy.get('[data-cy=teamstore-title]',{timeout:10000})
        .should('have.text', 'Salut X Partners');
        cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div/h2')
        .should('have.text', 'Welcome!')
        cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div')
        .should('have.text', 'Welcome!Why buy off the rack when you can make a piece uniquely yours?Customization allows you to tailor clothing according to your body type and personality.So, forget fast fashion. Stand out from the crowd in custom clothing.')
        cy.get('[data-cy=teamstore-contact')
        .should('have.text', 'Contact person:  Mr. ' + contactPersonName + 'Email: ' + email + 'Phone: ' + phoneNo)
    }

    checkProductLandingPage(productName,index)
    {
        cy.get('[data-test-id=product-card-button]').eq(index).click()
        cy.wait(3000)
        cy.get('[data-cy=product-name]',{timeout:10000}).should('have.text',productName)
        cy.go('back')
    }
}
export default Store