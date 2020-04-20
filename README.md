# RITEway-Jest

Inspired by [Eric Elliott](https://twitter.com/_ericelliott?lang=de)'s [RITEway](https://github.com/ericelliott/riteway).

## Why?

**TLDR:** I wanted [RITEway](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f)'s `assert` for Jest.

I love RITEway's API because [it forces you to write good unit tests](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d) by it's `given`-`should` API and only exposing the `equals` assertion.

Only problem is RITEway is build using [tape](https://www.npmjs.com/package/tape). You can't use it with
[Jest](https://jestjs.io/en/), which in turn has some advantages and disadvantages.

### Disadvantages

- [You can't use it to test React Native components](https://github.com/ericelliott/riteway/issues/48)   because Jest has the only good, up to date React Native mock.
- There might be some other Jest features that RITEway lacks.
- I know this is minor, but you also have to do more setup compared to Jest,  which just works™ for React Native and  [React apps created with CRA](https://facebook.github.io/create-react-app/docs/running-tests).

### Advantages

- RITEway forces you to [split your components' tests in an effective way](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2). This means only testing display components and their respective split off pure logic with unit tests, while covering the rest of your code using E2E tests.
- [You can't mock.](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

You might want to check out RITEway because you can [learn these advantages](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3) first hand. I prefer RITEway for React apps and use RITEway-Jest for React Native apps.

## Installation

```bash
npm i --save-dev riteway-jest
```

or

```bash
yarn add --dev riteway-jest
```

## Setup
### React with CRA
Add an import in your `src/setupTests.js`.

```js
import 'riteway-jest/src/riteway-jest.js';
```
### React Native
Add to your `jest` key in `package.json`.

```json
"jest": {
  "preset": "react-native",
  "setupFilesAfterEnv": ["node_modules/riteway-jest/src/riteway-jest.js"]
}
```

### React Native with Expo
Add to your `jest` key in `package.json`.

```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["node_modules/riteway-jest/src/riteway-jest.js"]
}
```

### `jest.config.js` instead of `package.json`.

```js
module.exports = {
  setupFilesAfterEnv: [
    'node_modules/riteway-jest/src/riteway-jest.js',
    // ... other setup files ...
  ],
  // ... other options ...
};
```

## Tips

### ESLint complains
Add a `global` key to your `.eslintrc.json`.

```json
{
  "_comment": "<Your other settings here>",
  "globals": {
    "assert": 'readonly'
  },
  "rules": {
    "_comment": "<Your rules here>"
  }
}
```

## Usage

With pure functions.

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

Using [React Native Testing Library](https://github.com/callstack/react-native-testing-library).

```js
import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';

function MyText({ title }) {
  return <Text>{title}</Text>;
}

describe('Text component', () => {
  const createText = (props = {}) => render(<MyText {...props} />);

  {
    const props = { title: 'Foo' };
    const $ = createText(props).getByType;

    assert({
      given: 'a title',
      should: 'display the title',
      actual: $('Text').props.children,
      expected: props.title,
    });
  }
});
```

Using [React Testing Library](https://github.com/testing-library/react-testing-library).

```js
import PropTypes from 'prop-types';
import React from 'react';
import { cleanup, render } from 'react-testing-library';

function Button({ disabled, onClick, text }) {
  return (
    <button data-testid="foo" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  text: '',
};

describe('button component', () => {
  const createButton = (props = {}) =>
    render(<Button onClick={() => {}} {...props} />);

  {
    const props = { text: 'foo' };
    const $ = createButton(props).getByTestId;

    assert({
      given: 'a text',
      should: "render 'foo'",
      actual: $('foo').textContent,
      expected: props.text,
    });
    cleanup();
  }

  {
    const props = { disabled: true, text: 'foo' };
    const $ = createButton(props).getByText;

    assert({
      given: 'disabled',
      should: 'be disabled',
      actual: $('foo').hasAttribute('disabled'),
      expected: props.disabled,
    });
    cleanup();
  }
});
```

### skip & only & todo

`assert` supports Jest's `skip`, `only` and `todo` functions.

```js
// This test is explicitly skipped
assert.skip({
  given: 'something',
  should: 'be equal to something',
  actual: 'nothing',
  expected: 'something',
});

// This test gets executed
assert.only({
  given: 'something',
  should: 'be equal to something',
  actual: 'nothing',
  expected: 'something',
});

// This test is implicitly skipped because the .only() above
assert({
  given: 'something',
  should: 'be equal to something',
  actual: 'nothing',
  expected: 'something',
});
```

`each` is currently **not** supported.
