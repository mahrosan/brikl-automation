class Utils {
    invokePostApi(headers,body,baseUrl,apiUrl){
        return cy.request({
            method: 'POST',
            url: baseUrl+apiUrl,
            headers: headers,
            body: body
          })
    }

    getCurrency(currencyCode)
    {
        if (currencyCode == 'USD'){
          return 'US$'
        }
        if (currencyCode == "Thai Baht"){
          return 'THB'
        }
    }


    getReverseString(text)
    {
      return text.split('').reverse().join('')
    }


    getConcatedText(textOne, textTwo)
    {
      return textOne+ ' '+textTwo
    }

    
}
export default Utils