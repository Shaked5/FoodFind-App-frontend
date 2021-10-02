export const emailValid = (email) => {
    const regEx = /^[a-zA-Z0-9._$!%^]{3,}@{1}[a-zA-Z]{2,20}[.]{1,}[a-zA-Z]{2,10}$/;
    return email.match(regEx);
  };
  
  export const passValid = (password) => {
    try {
      return password.trim().length > 7 && password.trim().length < 25;
    } catch (error) {
      console.log(error);
    }
  };