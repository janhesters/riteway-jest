const assert = ({
  given = undefined,
  should = '',
  actual = undefined,
  expected = undefined,
} = {}) => {
  it(`given ${given}: should ${should}`, () => {
    expect(actual).toEqual(expected);
  });
};

assert.skip = ({
  given = undefined,
  should = '',
  actual = undefined,
  expected = undefined,
} = {}) => {
  it.skip(`given ${given}: should ${should}`, () => {
    expect(actual).toEqual(expected);
  });
};

assert.only = ({
  given = undefined,
  should = '',
  actual = undefined,
  expected = undefined,
} = {}) => {
  it.only(`given ${given}: should ${should}`, () => {
    expect(actual).toEqual(expected);
  });
};

export { assert };
