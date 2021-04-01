import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((e) => {
    if (e?.path) {
      validationErrors[e.path] = e.message;
    }
  });

  return validationErrors;
}
