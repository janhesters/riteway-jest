describe('test suite with `.only`', () => {
  assert({
    given: 'test running and another test has `.only`',
    should: 'not run',
    actual: true,
    expected: false,
  });

  assert.only({
    given: 'used with `.only`',
    should: 'run',
    actual: true,
    expected: true,
  });
});
