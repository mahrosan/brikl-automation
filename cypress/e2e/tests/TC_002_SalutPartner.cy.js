require('cypress-xpath')
const data = require('../../fixtures/storeData.json')
import Store from '../page-object/pages/store'

describe('Salut Partner Test Scenarios', () => {
  beforeEach(() => {
    cy.log('Start of new test case')
  })
  var store = new Store()
  // const teamStoreTitle = 'teamstore-title'
  var contactPersonName = data.contactPersonName
  var email = data.email
  var phoneNo = data.phoneNo


  it('Visit Salut Partner Page', () => {
    cy.visit('https://store.briklshop.com/en/store/salut-partners');
    cy.get('[data-cy=teamstore-title]',{timeout:10000})
      .should('have.text', 'Salut X Partners');
    cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div/h2')
      .should('have.text', 'Welcome!')
    cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div')
      .should('have.text', 'Welcome!Why buy off the rack when you can make a piece uniquely yours?Customization allows you to tailor clothing according to your body type and personality.So, forget fast fashion. Stand out from the crowd in custom clothing.')
    cy.get('[data-cy=teamstore-contact')
      .should('have.text', 'Contact person:  Mr. ' + contactPersonName + 'Email: ' + email + 'Phone: ' + phoneNo)


  })

  it("Should check the response of the /storefront/internal API and verify all the product details", function () {

    cy.request({
      method: 'POST',
      url: 'https://internal-api.brikl.com/graphql/storefront/internal',
      headers: {
        "authority": "internal-api.brikl.com",
        "authorization": "630d0cbc-a125-4537-9258-ca830009765a-GUESTORG-hc4mZ8gHv",
        "x-brikl-currency": "USD",
        "x-brikl-language": "en_US",
        "x-brikl-shop-id": "630d0cbc-a125-4537-9258-ca830009765a"
      },
      body: {
        "operationName": "getTeamStoreBySlugSF",
        "variables": {
          "slug": "salut-partners"
        },
        // For the quesry I just took the required data from the API curl
        "query": "query getTeamStoreBySlugSF($slug: String!) {\n  teamStoreBySlug(slug: $slug) {\n    id\n    homepageUrl\n    title\n    headlineTitle\n    introductionText\n    logo\n    mainBanner\n    mainBannerHeight\n    brandColor\n    contactEmail\n    contactPerson\n    contactPhone\n    hasPassword\n    hasOutOfStock\n    slug\n    slugLocalizations {\n      langCode\n      content\n      __typename\n    }\n    currentStoreOpeningCycle {\n      id\n      status\n      ordersFrom\n      ordersUntil\n      __typename\n    }\n    storeFront {\n      id\n      title\n      logo\n      favicon\n      domainUrl\n      selectedShopThemeId\n      selectedShopThemeRevisionNo\n      __typename\n    }\n    products(first: 200) {\n      edges {\n        node {\n          ...productList\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    collections(first: 20) {\n      edges {\n        node {\n          id\n          slug\n          title\n          description\n          thumbnailUrl\n          headingBannerUrl\n          slugLocalizations {\n            content\n            langCode\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    productPackages(first: 100) {\n      edges {\n        node {\n          id\n          type\n          salesChannelId\n          price {\n            salesPrice {\n              amount\n              __typename\n            }\n            basePrice {\n              amount\n              __typename\n            }\n            discountedPrice {\n              amount\n              __typename\n            }\n            __typename\n          }\n          title\n          description\n          media {\n            type\n            source\n            default\n            visibleInCollection\n            productOptionValueId\n            __typename\n          }\n          requestQuotationEnabled\n          createdAt\n          thumbnailUrl\n          attributes {\n            ...attributeDetail\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    targetCategories {\n      id\n      title\n      __typename\n    }\n    groups {\n      id\n      title\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment productList on Product {\n  id\n  type\n  slug\n  title\n  status\n  createdAt\n  thumbnailUrl\n  description\n  slugLocalizations {\n    langCode\n    content\n    __typename\n  }\n  price {\n    ...productPriceDetailsNB\n    __typename\n  }\n  media {\n    ...productMediaDetail\n    __typename\n  }\n  attributes {\n    ...attributeDetail\n    __typename\n  }\n  __typename\n}\n\nfragment productPriceDetailsNB on ProductPrice {\n  basePrice {\n    ...priceDetailsNB\n    __typename\n  }\n  salesPrice {\n    ...priceDetailsNB\n    __typename\n  }\n  discountedPrice {\n    ...priceDetailsNB\n    __typename\n  }\n  __typename\n}\n\nfragment priceDetailsNB on Price {\n  currencyCode\n  amount\n  __typename\n}\n\nfragment productMediaDetail on ProductMedia {\n  type\n  source\n  default\n  visibleInCollection\n  productOptionValueId\n  __typename\n}\n\nfragment attributeDetail on ProductAttribute {\n  id\n  title\n  titleSpotlight\n  iconSpotlight\n  iconUrl\n  iconCssClass\n  __typename\n}\n"
      }
    }).then((res) => {
      //checks the status code of the API response
      expect(res.status).to.eq(200)
      var edges = res.body.data.teamStoreBySlug.products.edges
      for (var i = 0; i < edges.length; i++) {
        expect(edges[i].node.title).to.eq(data.product[i])

        cy.log('Product: '+i+' - Checks if all the product from API is loaded in the UI')
        // All the chil element are checked dynamically
        var price = edges[i].node.price.basePrice.amount.toFixed(2)
        
        var currency = store.getCurrency(edges[i].node.price.basePrice.currencyCode)
        
        // Checks each of the products details
        store.checkProductItemDetail(i,currency,price,edges)

        cy.log("It should add the product to cart")
        cy.get('[data-test-id=product-card-button]').eq(i).click()
        cy.wait(3000)
        cy.get('[data-cy=product-name]',{timeout:10000}).should('have.text',data.product[i])
        cy.go('back')
        
      }
    })
  })

});