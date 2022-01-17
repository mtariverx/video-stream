export const EmailValidation = email => {
  // const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regx.test(email);
}

export const TelephoneValidation = telephone => {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
  return regex.test(telephone);
}
export const IntegerValidation = number => {
  const regex = /[0-9]d*$/
  return regex.test(number);
}
export const DoubleValidation = number => {
  const regex = /^(-)?[0-9]+\.[0-9]*$/
  return IntegerValidation(number) || regex.test(number);
}
export const WebUrlValidation = url => {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
  return regex.test(url);
}

export const isEmpty = (...str) => {
  for (let s of str) {
    if (!s) return true;
  }
  return false;
}

export const compareElements = (sample, other) => sample === other