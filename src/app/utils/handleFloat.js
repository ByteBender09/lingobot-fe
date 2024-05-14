export function formatScientific(number, decimalPlaces) {
  let [mantissa, exponent] = number.toExponential().split("e");

  mantissa = parseFloat(mantissa).toFixed(decimalPlaces);
  let formattedNumber = `${mantissa}e${exponent}`;

  return formattedNumber;
}
