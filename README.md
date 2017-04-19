---

<div align="center">
  <h1>doi-to-publisher</h1>
  <h2>WIP - nothing to see here</h2>
  <p>
    <a href="https://npmjs.com/packages/doi-to-publisher" alt="npm package">
      <img src="https://img.shields.io/npm/v/doi-to-publisher.svg?style=flat-square">
    </a>
    <a href="https://github.com/blahah/doi-to-publisher/blob/master/LICENSE" alt="CC0 public domain">
      <img src="https://img.shields.io/badge/license-CC0-ff69b4.svg?style=flat-square">
    </a>
  </p>
</div>

---

## Install

```
npm install doi-to-publisher
```

## Usage

`doi2pub` exposes a single function that returns the publisher information for any DOI prefix.

The returned object gives both the publisher and the officially registered DOI prefix owner. Often a single publisher will be responsible for many DOI prefixes, with each prefix belonging to a separate sub-organisation.

``` js
var doi2pub = require('doi-to-publisher')

doi2pub('10.2488')
// returns:
// {
//  publisher: 'Japan Wood Society',
//  owner: 'The Japan Wood Research Society'
// }
```

## License

To the extent possible by law, we transfer any rights we have in this code to the public domain. Specifically, we do so using the [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).

You can do whatever you want with this code. No need to credit us, link to us, include any license, or anything else. But if you want to do those things, you're free to do that too.
