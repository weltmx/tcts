# tcts 🤿

A 🤿 functional try ... catch implementation

## Install

```bash
npm i tcts
```

## Usage

#### Try catch

```ts
import { tc } from "tcts"

const [error, value] = tc(() => {
  // errorable code
  return value
})
```

#### Try catch fallback

```ts
import { tcf } from "tcts"

// with custom fallback value
const safeParseNum = tcf(0, parseNum)
```

```ts
// other helpers

import { tcNull, tcNullish, tcRetry } from "tcts"

tcNull(fn) // tcf(null, fn)
tcNullish(fn) // tcf(undefined, fn)
tcRetry(fn) // tcf(fn, fn)
```
