const wiki = require('../lib/wikipedia/wikipedia.js')
const langList = require('../lib/language/language.json')

class wikipedia {
    #lang = 'en'
    #type = null; #types = null
    #supports = ['header', 'paragraph', 'list', 'others']

    /**
     * Enter the query to scrape the wikipedia page.
     * 
     * @example await wikipedia.page("rhombicosidodecahedron")
     */
    async page(query) {
        if (!query) throw new Error(`Query cannot be empty.`)
        if (this.#type && this.#types) throw new Error(`Anyway, you can't use the disableType and disableTypes method together, pick one of them.`)
        return await wiki(query, this.#lang, this.#type ?? this.#types)
    }

    /**
     * This method is used to set the language to be used in the Wikipedia URL.
     * This allows you to scrape content from Wikipedia in multiple supported languages.
     * Default language is en.
     * - the language code you enter must be within ISO Code
     * 
     * @example
     * // set language to France.
     * wikipedia.setlang('fr')
     */
    setLang(language_code) {
        if (!language_code) throw new Error(`Language code is required.`)
        var lang = langList.find(language => language.code === language_code)
        if (!lang) throw new Error(`Cannot find this language ISO code, try again.`)
        this.#lang = language_code
        return
    }

    /**
     * Use this method if you want to disable 1 type of results from the generated page content.
     *
     * @example
     * // supported type: header, paragraph and list.
     * wikipedia.disableType("list")
     */

    disableType(type) {
        if (!type) throw new Error(`The type cannot be empty.`)
        if (Array.isArray(type)) throw new Error(`Invalid type, consider using disableTypes method instead if you want to disable some of type.`)
        if (this.#supports.indexOf(type) == -1) throw new Error(`Unsupported content type! Only ${this.#supports.join(', ')} are supported.`)
        this.#type = type
        return
    }

    /**
     * Use this method if you want to disable many type of results from the generated page content.
     *
     * @example
     * // array of supported type: header, paragraph and list.
     * var types = ["header", "list"]
     * wikipedia.disableTypes(types)
     */

    disableTypes(type) {
        if (!type) throw new Error(`The type cannot be empty.`)
        if (!Array.isArray(type)) throw new Error(`The type must be array of supported type.`)
        var isSupported  = type.every(type => this.#supports.includes(type))
        if (!isSupported) throw new Error(`Unsupported content type! Only ${this.#supports.join(', ')} are supported.`)
        this.#types = type
        return
    }
}

module.exports = { wikipedia }