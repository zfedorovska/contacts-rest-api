const addTwoNumbers = (a, b) => {
  return a + b;
};

describe('Addition service test', () => {
  it('Add two valid numbers', () => {
    const firstNumber = 1;
    const secondNumber = 1;
    const addTwoNumbersResult = addTwoNumbers(firstNumber, secondNumber);
    expect(addTwoNumbersResult).toEqual(firstNumber + secondNumber);
  });
});
