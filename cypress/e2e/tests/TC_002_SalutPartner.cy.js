require('cypress-xpath')
// const data = require('../../../fixtures/example.json')
// import LoginPage from '../../../page-objects/pages/login';

describe('Salut Partner Test Scenarios', () => {
    beforeEach(() => {
      cy.log('Start of new test case')
    })

    // const teamStoreTitle = 'teamstore-title'
    var contactPersonName = 'John'
    var email = 'info@sampleteamshop.com'
    var phoneNo = '+123456'


    it('Visit Salut Partner Page', () => {
      cy.visit('https://store.briklshop.com/en/store/salut-partners');
      cy.get('[data-cy=teamstore-title]')
        .should('have.text','Salut X Partners');
      cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div/h2')
        .should('have.text','Welcome!')
      cy.xpath('//*[@id="gatsby-focus-wrapper"]/div/div/div/div/main/div/div[2]/div[1]/div/div')
        .should('have.text','Welcome!Why buy off the rack when you can make a piece uniquely yours?Customization allows you to tailor clothing according to your body type and personality.So, forget fast fashion. Stand out from the crowd in custom clothing.')
      cy.get('[data-cy=teamstore-contact')
        .should('have.text','Contact person:  Mr. '+contactPersonName+'Email: '+email+'Phone: '+phoneNo)
     

    })

});