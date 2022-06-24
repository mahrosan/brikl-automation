
import Utils from '../utils/utils'

const utils = new Utils()
it('returns formated Currency',() =>{
    expect(utils.getCurrency('USD')).to.equal('US$')
    expect(utils.getCurrency('Thai Baht')).to.equal('THB')
})

it('returns reverse text', () =>{
    expect(utils.getReverseString('BRIKL')).to.equal('LKIRB')
})

it('returns concatenated text', () =>{
    expect(utils.getConcatedText('Hello','Brikl')).to.equal('Hello Brikl')
})