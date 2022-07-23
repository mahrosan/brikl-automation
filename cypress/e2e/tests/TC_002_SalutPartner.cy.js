import Store from '../page-object/pages/store'
import Utils from '../utils/utils'
const data = require('../../fixtures/storeData.json')


describe('Salut Partner Test Scenarios', () => {
  beforeEach(() => {
    cy.log('Start of new test case')
    cy.viewport(1600, 950)
  })
  const store = new Store()
  const utils = new Utils()
  var contactPersonName = data.contactPersonName
  var email = data.email
  var phoneNo = data.phoneNo


  it('Visit Salut Partner Page', () => {

    // cy.intercept('GET', '/page-data/app-data.json').as('getCards')
    // cy.intercept('POST', 'https://internal-api.brikl.com/graphql/storefront/internal').as('internalData')

    cy.visit('https://store.briklshop.com/en/store/salut-partners');
    store.verifyStoreLandingPage(contactPersonName,email,phoneNo)


    
  })





  // For this test we have verified all the needed details in the page from the response of the inter store API
  // All of the data checked for the product is dynamic data, no any statis variables are used
  // Only static varialbe that are used for this assignment are the variables in the API body and header section which are being called from the fixtures json
  // We could also make it dynamic, given proper time to investigate the API and get full detail of it, I could make a dynamically filling headers and body for it
  it("Should check the response of the /storefront/internal API and verify all the product details", function () {
    
    var headers= data.storeFrontInternal.headers
    var body= data.storeFrontInternal.body
    
    utils.invokePostApi(headers,body,data.baseUrl,data.storeFrontInternal.apiUrl).then((res) => {
      //checks the status code of the API response
      expect(res.status).to.eq(200)
      var edges = res.body.data.teamStoreBySlug.products.edges
      for (var i = 0; i < edges.length; i++) {
        expect(edges[i].node.title).to.eq(data.product[i])

        cy.log('Product: '+i+' - Checks if all the product from API is loaded in the UI')

        // All the child element are checked dynamically
        var price = edges[i].node.price.basePrice.amount.toFixed(2)
        var currency = utils.getCurrency(edges[i].node.price.basePrice.currencyCode)
        // Checks each of the products details
        store.checkProductItemDetail(i,currency,price,edges)
        cy.log("It should add the product to cart")
        store.checkProductLandingPage(data.product[i],i)
        
      }
    })
  })

});