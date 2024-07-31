const form = document.querySelector("form");
const toast = document.querySelector(".toast");
const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");
const queryTypeBox = document.querySelector(".queryTypeBox");
const radioButtons = document.getElementsByName("queryType");
// const boxForCheckBox = document.querySelector(".boxForCheck")

/////////browserify//////////
const validator = require("email-validator");
///toast///////
form.addEventListener("invalid", (e) => {
  e.preventDefault();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isFormValid = {};
  if (textArea.value === "") {
    textArea.classList.add("wrongSubmit");
    isFormValid[textArea.name] = false;
  } else {
    textArea.classList.remove("wrongSubmit");
    isFormValid[textArea.name] = true;
  }
  inputs.forEach((input) => {
    if (input.name === "firstName" || input.name === "lastName") {
      if (input.value !== "") {
        input.classList.remove("wrongSubmit");
        isFormValid[input.name] = true;
      } else {
        input.classList.add("wrongSubmit");
        isFormValid[input.name] = false;
      }
    }
    if (input.name === "queryType") {
      const isOneChecked = () => {
        for (let rb of radioButtons) {
          if (rb.checked) return true;
        }
        return false;
      };
      if (isOneChecked()) {
        queryTypeBox.classList.remove("wrongSubmit");
        isFormValid[input.name] = true;
      } else {
        queryTypeBox.classList.add("wrongSubmit");
        isFormValid[input.name] = false;
      }
    }
    if (input.name === "consentCheckbox") {
      if (!input.checked) {
        input.classList.add("wrongSubmit");
        isFormValid[input.name] = false;
      } else {
        input.classList.remove("wrongSubmit");
        isFormValid[input.name] = true;
      }
    }
    if (input.name === "email") {
      console.log(input.value);
      console.log(validator.validate("slldksssfjdfdfsldj@mail.com"));
      if (!validator.validate(input.value)) {
        input.classList.add("wrongSubmit");
        isFormValid[input.name] = false;
      } else {
        input.classList.remove("wrongSubmit");
        isFormValid[input.name] = true;
      }
    }
  });
  console.log(isFormValid);

  ////form valid
  if (Object.values(isFormValid).every((el) => el === true)) {
    console.log("submitted");
    toast.classList.add("toastShow");
    setTimeout(() => {
      toast.classList.remove("toastShow");
    }, 3950);
    textArea.value = "";
    inputs.forEach((input) => {
      input.value = "";
      input.checked = false;
    });
  }
});

/////
// toast.addEventListener("click", () => {
//   form.submit();
// });
