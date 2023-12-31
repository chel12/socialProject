export const required = (values) => {
  if (values) return undefined;

  return "Field is required";
};

export const maxLengthCreator = (maxLength) => (values) => {
  if (values.length > maxLength) return `Max lenght is ${maxLength} symbols`;
  return undefined;
};
