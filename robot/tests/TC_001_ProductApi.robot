*** Settings ***
Library     RequestsLibrary
Library     JSONLibrary
Library     DataDriver  file=../testdata/productDetail.csv     dialect=excel    encoding=utf8
Test Template   Execute Test


*** Keywords ***
Execute Test
    [Arguments]      ${user_email}   ${user_password}   ${status}   ${message}
    create session  StoreInternalAPI   ${base_URL}     verify=true
    ${slugs}=   Create Dictionary   slug=salut-partners
    ${query} = "query getTeamStoreBySlugSF($slug: String!) {  teamStoreBySlug(slug: $slug) { id homepageUrl title headlineTitle introductionText logo mainBanner mainBannerHeight brandColor contactEmail contactPerson contactPhone hasPassword hasOutOfStock slug slugLocalizations { langCode content __typename } currentStoreOpeningCycle { id status ordersFrom ordersUntil __typename } storeFront { id title logo favicon domainUrl selectedShopThemeId selectedShopThemeRevisionNo __typename } products(first: 200) { edges { node { ...productList __typename } __typename } __typename } collections(first: 20) { edges { node { id slug title description thumbnailUrl headingBannerUrl slugLocalizations { content langCode __typename } __typename } __typename } __typename } productPackages(first: 100) { edges { node { id type salesChannelId price { salesPrice { amount __typename } basePrice { amount __typename } discountedPrice { amount __typename } __typename } title description media { type source default visibleInCollection productOptionValueId __typename } requestQuotationEnabled createdAt thumbnailUrl attributes { ...attributeDetail __typename } __typename } __typename } __typename } targetCategories { id title __typename } groups { id title __typename } __typename  }}fragment productList on Product {  id  type  slug  title  status  createdAt  thumbnailUrl  description  slugLocalizations { langCode content __typename  }  price { ...productPriceDetailsNB __typename  }  media { ...productMediaDetail __typename  }  attributes { ...attributeDetail __typename  }  __typename}fragment productPriceDetailsNB on ProductPrice {  basePrice { ...priceDetailsNB __typename  }  salesPrice { ...priceDetailsNB __typename  }  discountedPrice { ...priceDetailsNB __typename  }  __typename}fragment priceDetailsNB on Price {  currencyCode  amount  __typename}fragment productMediaDetail on ProductMedia {  type  source  default  visibleInCollection  productOptionValueId  __typename}fragment attributeDetail on ProductAttribute {  id  title  titleSpotlight  iconSpotlight  iconUrl  iconCssClass  __typename}"
    ${body}=   Create Dictionary     operationName=getTeamStoreBySlugSF   variables=${slugs}    query=${query}
    ${headers}=     Create Dictionary      authority=internal-api.brikl.com     authorization=630d0cbc-a125-4537-9258-ca830009765a-GUESTORG-hc4mZ8gHv     x-brikl-currency=USD       x-brikl-language=en_US       x-brikl-shop-id=630d0cbc-a125-4537-9258-ca830009765a
    
    log to console      ${headers}
    log to console      ${body}
    ${response}=     Post on session     StoreInternalAPI   ${admin_login_API}       data=${body}    headers=${headers}
    
    ${actual_code}=   convert to string  ${response.status_code}
    
    ${json_str}=	Convert String To JSON	${response.content}
    log to console      ${json_str}
    log to console   ${response.elapsed.total_seconds()}
    #
    should be equal     ${actual_code}     ${status}

*** Variables ***
${base_URL}         https://internal-api.brikl.com/graphql
${admin_login_API}  /storefront/internal 

*** Test Cases ***
Test Cases
    [Documentation]   Testing out the CSV FILE




   