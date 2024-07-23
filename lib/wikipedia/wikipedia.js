"use strict"
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWikipedia(query, lang, disable_type) {
    try {
        const url = `https://${lang}.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const disType = (Array.isArray(disable_type) == true) ? disable_type : Array(disable_type)

        /**
         * Get the page title
         */
        const title = $('h1').text();

        /**
         * Get the content of the page
         */
        const page = [];
        $('#mw-content-text .mw-parser-output').children().each((index, element) => {
            var tagName = $(element).prop('tagName');
            var classes = $(element).attr('class') || '';

            if (tagName === 'P' && disType.indexOf('paragraph') == -1) {
                var paragraph = $(element).text().trim();
                if (paragraph) {
                    page.push({ type: 'paragraph', content: paragraph });
                }
            } else if (['H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName) || classes.includes('mw-heading')  && disType.indexOf('header') == -1) {
                var header = $(element).text().trim();
                if (header) {
                    page.push({ type: 'header', content: header });
                }
            } else if (tagName === 'UL' || tagName === 'OL' && disType.indexOf('list') == -1) {
                var listItems = [];
                $(element).find('li').each((liIndex, liElement) => {
                    var listItem = $(liElement).text().trim();
                    if (listItem) {
                        listItems.push(listItem);
                    }
                });
                if (listItems.length > 0) {
                    page.push({ type: 'list', content: listItems });
                }
            } else {
                if (disType.indexOf('others') == -1) {
                    var text = $(element).text().trim();
                    if (text) {
                        page.push({ type: 'other', content: text });
                    }
                }
            }
        });

        /**
         * Get the url that is on the page
         */
        const links = [];
        $('#mw-content-text .mw-parser-output a').each((index, element) => {
            const link = $(element).attr('href');
            if (link && link.startsWith('/wiki/')) {
                links.push(`https://${lang}.wikipedia.org${link}`);
            }
        });

        return {
            title,
            page,
            links
        }
    } catch(e) {
        if (e.message.includes('404')) {
            throw new Error(`Could not find the page of ${query}, correct the query or try to change the language.`)
        } else {
            throw new Error(e)
        }
    }
}

module.exports = scrapeWikipedia;
