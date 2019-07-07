const isPhoneValid = phone => {
  const r = /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
  return r.test(phone);
};

const keepNumbers = phone => phone.replace(/[^\d]/g, '');

const validator = {
  check: isPhoneValid,
  clean: keepNumbers
};
export default validator;
