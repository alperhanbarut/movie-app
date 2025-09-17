export function isEmail(value) {
  var re = /\S+@\S+\.\S+/;
  return re.test(value);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLenght) {
  return value.trim().length >= minLenght;
}

export function isEqual(value, valueToCompare) {
  return value === valueToCompare;
}
