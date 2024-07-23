const wikipedia = require('./index.js')
const wiki = new wikipedia()

async function oiefojeie() {
    wiki.setLang('id')
    wiki.disableType('others')
    console.log(await wiki.page('cicada 3301'))
}

oiefojeie()