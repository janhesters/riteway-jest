const assertCreator = itFunc => ({
  given = '',
  should = '',
  actual = undefined,
  expected = undefined,
}) =>
  itFunc(`given ${given}: should ${should}`, () => {
    expect(actual).toEqual(expected);
  });

// use the jest `it` function
global.assert = assertCreator(global.it);

// bypass for todo and skip
global.assert.todo = assertCreator(global.it.skip);
global.assert.skip = assertCreator(global.it.skip);

// only calls the same function but uses `only` internaly
global.assert.only = assertCreator(global.it.only);

module.exports = global.assert;
