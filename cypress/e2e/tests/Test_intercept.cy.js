
import Utils from '../utils/utils'

const utils = new Utils()
it('Intercept an API',() => {
    cy.visit("https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication#Custom-Command-for-Auth0-Authentication")
    cy.intercept('Get','https://c.6sc.co/').as('briklresponse')
    cy.wait('@briklresponse').then(interception => {
        console.log(interception.response.body)
    })
  })
