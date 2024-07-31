(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"email-validator":2}],2:[function(require,module,exports){
"use strict";

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
exports.validate = function(email)
{
	if (!email)
		return false;
		
	if(email.length>254)
		return false;

	var valid = tester.test(email);
	if(!valid)
		return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if(parts[0].length>64)
		return false;

	var domainParts = parts[1].split(".");
	if(domainParts.some(function(part) { return part.length>63; }))
		return false;

	return true;
}
},{}]},{},[1]);
