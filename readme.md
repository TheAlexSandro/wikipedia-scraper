# Wikipedia Scraper
Wikipedia-scraper is a Node.js library that allows you to easily scrape Wikipedia pages. It provides methods to get the page content, set the language, and access various elements of the Wikipedia page. You can use this library to get page content from wikipedia.org.

## Installation
```code
npm install wikipedia-scrapers
```
or
```code
yarn add wikipedia-scrapers
```

## Usage
<h3>Basic Usage</h3>

```js
const wikipedia = require('wiki-scraper');
const wiki = new wikipedia()

async function anything() {
    console.log(await wiki.page("rhombicosidodecahedron"))
}
```

<h3>Change Language</h3>

The default host url of wikipedia is [en.wikipedia.org](en.wikipedia.org). If you don't like it, you can change it to your own language.

```js
async function anything() {
    wiki.setlang('en') // the language code of your language.
    console.log(await wiki.page("rhombicosidodecahedron"))
}
```
_Note: the language code you enter must be within ISO Code 639._

<h3>Disable Type</h3>

Use the disableType or disableTypes method to disable 1 or more results from the generated page.

```Supported type: header, paragraph, list and others```

**Method**

Use `disableType` method to disable 1 result from generated page content:

```js
wiki.disableType("header")
```

Or use `disableTypes` method to disable some result from page content:

<i>Note: the parameter of type must be array of supported type.</i>

<b>Another note: you can't use <code>disableType</code> and <code>disableTypes</code> at the same time, pick one of them.</b>

Example:
```js
wiki.disableTypes(["header", "list"])
```

**Example Code:**

```js
async function anything() {
    wiki.disableType("list")
    console.log(await wiki.page("rhombicosidodecahedron"))
}
```