"use strict";

const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".input");
const inputDay = document.querySelector(".input-day");
const inputMonth = document.querySelector(".input-month");
const inputYear = document.querySelector(".input-year");
const btnSubmit = document.querySelector(".btn-submit");
const yearsEl = document.querySelector(".years");
const monthsEl = document.querySelector(".months");
const daysEl = document.querySelector(".days");

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDay();

inputYear.setAttribute("max", currentYear);

const renderError = function (message, target, targetError) {
  target.style.borderColor = "hsl(0, 100%, 67%)";
  targetError.classList.remove("hidden");
  targetError.textContent = message;
};

const checkInputs = function () {
  let errorTarget;
  inputs.forEach((input) => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      errorTarget = e.target.parentElement.querySelector(".error-msg");

      if (input.value === "") {
        renderError("This field is required", e.target, errorTarget);
      }

      if (e.target.classList.contains("input-day") && input.value > 31) {
        renderError("Must be a valid day", e.target, errorTarget);
      }

      if (e.target.classList.contains("input-month") && input.value > 12) {
        renderError("Must be a valid month", e.target, errorTarget);
      }

      if (
        e.target.classList.contains("input-year") &&
        input.value > currentYear
      ) {
        renderError("Must be in the past", e.target, errorTarget);
      }
    });

    input.addEventListener("focus", (e) => {
      errorTarget = e.target.parentElement.querySelector(".error-msg");
      errorTarget.classList.add("hidden");
      input.style.borderColor = "";
    });
  });
};
checkInputs();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const year = +inputYear.value;
  const month = +inputMonth.value - 1;
  const day = +inputDay.value;

  const userDate = parseInt(
    (new Date(year, month, day).getTime() / 1000).toFixed(0)
  );

  console.log(date.valueOf() - userDate);
  //   ^ Convert it later to ISO and store it in variable

  //   Render age
  //   yearsEl.textContent = years;
  //   monthsEl.textContent = months;
  //   daysEl.textContent = Math.max(days, 0);
});
