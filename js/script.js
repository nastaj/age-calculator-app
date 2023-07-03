"use strict";

// Form for submitting the values
const form = document.querySelector(".form");

// Input fields
const inputs = document.querySelectorAll(".input");
const inputDay = document.querySelector(".input-day");
const inputMonth = document.querySelector(".input-month");
const inputYear = document.querySelector(".input-year");

// DOM Elements for setting the text content
const yearsEl = document.querySelector(".years");
const monthsEl = document.querySelector(".months");
const daysEl = document.querySelector(".days");

// Dates
const today = new Date();
const currentYear = today.getFullYear();

// Set max value for year input to prevent setting the future year
// Further validated in checkInputs function
inputYear.setAttribute("max", currentYear);

const renderError = function (message, target, targetError) {
  target.parentElement.querySelector("label").style.color = "hsl(0, 100%, 67%)";
  target.style.borderColor = "hsl(0, 100%, 67%)";
  targetError.classList.remove("hidden");
  targetError.textContent = message;
};

const checkInputs = function () {
  let errorTarget;
  let currentTarget;

  inputs.forEach((input) => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();

      currentTarget = e.target;
      errorTarget = e.target.parentElement.querySelector(".error-msg");

      if (input.value === "") {
        renderError("This field is required", currentTarget, errorTarget);
      }

      if (currentTarget.classList.contains("input-day") && input.value > 31) {
        renderError("Must be a valid day", currentTarget, errorTarget);
      }

      if (currentTarget.classList.contains("input-month") && input.value > 12) {
        renderError("Must be a valid month", currentTarget, errorTarget);
      }

      if (
        currentTarget.classList.contains("input-year") &&
        input.value > currentYear
      ) {
        renderError("Must be in the past", currentTarget, errorTarget);
      }
    });

    input.addEventListener("focus", (e) => {
      currentTarget = e.target;

      currentTarget.parentElement.querySelector("label").style.color = "";
      currentTarget.parentElement
        .querySelector(".error-msg")
        .classList.add("hidden");
      input.style.borderColor = "";
    });
  });
};
checkInputs();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve values passed by user
  const year = +inputYear.value;
  const month = +inputMonth.value - 1;
  const day = +inputDay.value;

  // Set new Date object
  const birthDate = new Date(year, month, day);

  // Calculate ages
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust for negative ageMonths
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths = 12 - birthDate.getMonth() + today.getMonth() - 1;
    ageDays = today.getDate() - birthDate.getDate();
  }

  // Adjust for negative ageDays
  if (ageDays < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays = lastMonth.getDate() - birthDate.getDate() + today.getDate();
  }

  // Render age
  yearsEl.textContent = ageYears;
  monthsEl.textContent = ageMonths;
  daysEl.textContent = ageDays;
});
