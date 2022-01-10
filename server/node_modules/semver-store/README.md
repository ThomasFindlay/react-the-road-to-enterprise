# semver-store

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://travis-ci.org/delvedor/semver-store.svg?branch=master)](https://travis-ci.org/delvedor/semver-store)

An extremely fast semver based store.

## Install
```
npm i semver-store
```
## Usage
Use it is very easy, you just need to require the library and start adding values.
```js
const store = require('semver-store')()

store.set('1.2.0', { value: 42 })

console.log(
  store.get('1.2.0') // { value: 42 }
)
```

## API
#### `set(version, store)`
Add a document to the store with the specified version.<br/>
The version **must** be conform with the [semver](http://semver.org/) specification.

#### `get(version)`
Get a document from the store with the specified version.<br/>
The version string could be a full version string or specify a range, such as `1.x`, in which case the highest version compatible will be returned. Specify `*` to get the highest version available.

#### `del(version)`
Deletes a document from the store with the specified version.<br/>
The version string could be a full version string or specify a range, such as `1.x`, in which case all the compatible values will be deleted.

#### `empty()`
Empties the store.

### Why is fast?
  Internally uses a [prefix tree](https://en.wikipedia.org/wiki/Trie), which allows the search to be extremely performant.

## License

Licensed under [MIT](./LICENSE).
