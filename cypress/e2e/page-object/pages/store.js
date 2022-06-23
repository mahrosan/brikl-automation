require('cypress-xpath')

class Store {
    checkPageLoadComponent()
    {
        // Checking Data loads Process
        cy.xpath('//*[@id="__next"]/div/div').should('have.text','Loading...Loading the design assets. Please wait...Powered by')
    }

    getCurrency(currencyCode)
    {
        if (currencyCode == 'USD'){
          return 'US$'
        }
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
}
export default Store