const assertCreator = itFunc => ({
  given = '',
  should = '',
  actual = undefined,
  expected = undefined,
}) =>
  itFunc(`given ${given}: should ${should}`, () => {
    expect(actual).toEqual(expected);
  });

export default assertCreator;
