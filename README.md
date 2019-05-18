# RITEway-Jest

Inspired by [Eric Elliott](https://twitter.com/_ericelliott?lang=de)'s
[RITEway](https://github.com/ericelliott/riteway).

## Why?

**TLDR:** I wanted
[RITEway](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f)'s
`assert` for Jest.

I love RITEway's API because
[it forces you to write good unit tests](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)
by it's `given`-`should` API and only exposing the `equals` assertion.

Only problem is RITEway is build using
[tape](https://www.npmjs.com/package/tape). You can't use it with
[Jest](https://jestjs.io/en/), which in turn has some advantages and
disadvantages.

### Disadvantages

- You can't use it to test React Native component's because Jest has the only
  good up to date React Native mock.
- There might be some other Jest features that RITEway lacks.
- You can't use it with
  [React Testing Library](https://github.com/testing-library/react-testing-library)
  and have to rely on RITEway's `render` function which wraps
  [Cheerio](https://github.com/cheeriojs/cheerio).
- I know this is minor, but you also have to do more setup compared to Jest,
  which just works™ for React Native and
  [React apps created with CRA](https://facebook.github.io/create-react-app/docs/running-tests).

### Advantages

- RITEway forces you to
  [split your components' tests in an effective way](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2).
  This means only testing display components and their respective split off pure
  logic with unit tests and the rest using E2E tests.
- [You can't mock.](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

You might want to check out RITEway because you can
[learn these advantages](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3)
first hand.

## Installation

```bash
npm i --save-dev riteway-jest
```

or

```bash
yarn add --dev riteway-jest
```

Then import it in your `src/setupTests.js` for React with CRA.

```js
import 'riteway-jest/assert';
```

And for React Native you need to add it to your `jest.config.js`.

```js
module.exports = {
  setupFilesAfterEnv: [
    'riteway-jest/assert',
    // ... other setup files ...
  ],
  // ... other options ...
};
```

If ESLint yells at you, add a `global` key to your `.eslintrc.json`.

```json
{
  // ...
  "globals": {
    "assert": true
  },
  "rules": {
    // ...
  }
}
```

## Usage

```js
const sum = (a = 0, b = 0) => a + b;

describe('sum()', () => {
  const should = 'return the correct sum';

  assert({
    given: 'no arguments',
    should: 'return 0',
    actual: sum(),
    expected: 0,
  });

  assert({
    given: 'zero',
    should,
    actual: sum(2, 0),
    expected: 2,
  });

  assert({
    given: 'negative numbers',
    should,
    actual: sum(1, -4),
    expected: -3,
  });
});
```
