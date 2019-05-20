import { assert } from './riteway-jest';

describe('only()', () => {
  expect.assertions(1);
  const testFn = () => 'foo';

  assert.only({
    given: 'calling the testFn',
    should: 'return foo',
    actual: testFn(),
    expected: 'foo',
  });

  assert({
    given: 'calling the testFn',
    should: 'implicitly skip this test',
    actual: testFn(),
    expected: 'foo',
  });
});
