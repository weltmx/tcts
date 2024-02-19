# tcts 🤿

Dead simple, functional, curriable try ... catch implementation.

## Install

```bash
npm i tcts
```

## Usage

#### TC - Try catch

```ts
import { tc } from 'tcts'

const [error, value] = tc(() => {
  // errorable code
  return value
})

// use atc for an async try catch
atc(async () => ..)
```

#### TCF - Try catch fallback

```ts
import { tcf } from 'tcts'

const safeParseNum = tcf(0, parseNum)

// partial application to reuse
const tcNumber = tcf(0)
const tcAction = tcf({ error: true })
```

##### TCF helpers

```ts
// other helpers

import { tcNull, tcNullish, tcNumber, tcRetry } from 'tcts'

tcNull(fn) // tcf(null, fn)
tcNullish(fn) // tcf(undefined, fn)
tcNumber(fn) // tcf(0, fn)
tcRetry(fn) // tcf(fn, fn)
```
