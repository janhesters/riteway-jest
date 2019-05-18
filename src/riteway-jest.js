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

export { assert };
