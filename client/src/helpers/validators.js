const FIRST_NAME = /^[a-zA-Z]+(([', -][a-zA-Z ])?[a-zA-Z]*)*$/;
const LAST_NAME = /^[a-zA-Z]+(([', -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate = (input, pattern) => pattern.test(input);

export const firstNameError = firstName => !firstName || validate(firstName, FIRST_NAME)
  ? ''
  : 'Enter valid first name';

export const lastNameError = lastName => !lastName || validate(lastName, LAST_NAME)
  ? ''
  : 'Enter valid last name';

export const emailError = email => validate(email.toLowerCase(), EMAIL)
  ? ''
  : 'Enter valid email';

export const formErrors = ({
  firstName,
  lastName,
  email,
}) => ({
  firstName: firstNameError(firstName),
  lastName: lastNameError(lastName),
  email: emailError(email),
});

export const noErrors = errors => Object.values(errors).every(error => !error);