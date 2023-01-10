export default function sumValues(numbers) {
  let result = 0;

  for (var i = 0; i < numbers.length; ++i) {
    result += parseFloat(Math.abs((numbers[i].amount)));
  }

  return result;
}
