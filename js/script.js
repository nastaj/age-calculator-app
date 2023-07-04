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

// App
class CalculatorApp {
  #errorTarget;
  #currentTarget;
  #today = new Date();
  #currentYear = this.#today.getFullYear();

  constructor() {
    this._setMaxYearAttribute();
    this._checkInputs();
    this._clearErrorStyling();
    form.addEventListener("submit", this._calcAge.bind(this));
  }

  _setMaxYearAttribute() {
    // Set max value for year input to prevent setting the future year
    // Further validated in checkInputs function
    inputYear.setAttribute("max", this.#currentYear);
  }

  // For day validation in calcAge function
  _renderDayError() {
    inputDay.parentElement.querySelector("label").style.color =
      "hsl(0, 100%, 67%)";
    inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    inputDay.parentElement
      .querySelector(".error-msg")
      .classList.remove("hidden");
    inputDay.parentElement.querySelector(".error-msg").textContent =
      "Must be a valid day";
  }

  // For all other error handling
  _renderError(
    message,
    target = this.#currentTarget,
    targetError = this.#errorTarget
  ) {
    target.parentElement.querySelector("label").style.color =
      "hsl(0, 100%, 67%)";
    target.style.borderColor = "hsl(0, 100%, 67%)";
    targetError.classList.remove("hidden");
    targetError.textContent = message;
  }

  _checkInputs() {
    inputs.forEach((input) => {
      input.addEventListener("invalid", (e) => {
        e.preventDefault();

        this.#currentTarget = e.target;
        this.#errorTarget =
          this.#currentTarget.parentElement.querySelector(".error-msg");

        if (input.value === "") {
          this._renderError("This field is required");
        }

        if (
          this.#currentTarget.classList.contains("input-day") &&
          (input.value > 31 || input.value <= 0)
        ) {
          this._renderError("Must be a valid day");
        }

        if (
          this.#currentTarget.classList.contains("input-month") &&
          (input.value > 12 || input.value <= 0)
        ) {
          this._renderError("Must be a valid month");
        }

        if (
          this.#currentTarget.classList.contains("input-year") &&
          input.value > this.#currentYear
        ) {
          this._renderError("Must be in the past");
        }
      });
    });
  }

  _clearErrorStyling() {
    inputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.#currentTarget = e.target;

        this.#currentTarget.parentElement.querySelector("label").style.color =
          "";
        this.#currentTarget.parentElement
          .querySelector(".error-msg")
          .classList.add("hidden");
        input.style.borderColor = "";
      });
    });
  }

  _calcAge(e) {
    e.preventDefault();

    // Retrieve values passed by user
    const year = +inputYear.value;
    const month = +inputMonth.value - 1;
    const day = +inputDay.value;

    // Check if the entered date is a valid day for the selected month
    const maxDay = new Date(year, month + 1, 0).getDate();
    if (day <= 0 || day > maxDay) {
      this._renderDayError();
      return;
    }

    // Set new Date object
    const birthDate = new Date(year, month, day);

    // Calculate ages
    const ageYears = this.#today.getFullYear() - birthDate.getFullYear();
    const ageMonths = this.#today.getMonth() - birthDate.getMonth();
    const ageDays = this.#today.getDate() - birthDate.getDate();

    // Store age variables in one object
    const age = { years: ageYears, months: ageMonths, days: ageDays };

    // Adjust for negative age.months
    if (age.months < 0 || (age.months === 0 && age.days < 0)) {
      age.years--;
      age.months = 12 - birthDate.getMonth() + this.#today.getMonth() - 1;
      age.days = this.#today.getDate() - birthDate.getDate();
    }

    // Adjust for negative age.days
    if (age.days < 0) {
      const lastMonth = new Date(
        this.#today.getFullYear(),
        this.#today.getMonth(),
        0
      );
      age.days =
        lastMonth.getDate() - birthDate.getDate() + this.#today.getDate();
    }

    // Render ages in DOM
    this._renderAge(age);
  }

  _renderAge(age) {
    let counterYears = 0;
    let counterMonths = 0;
    let counterDays = 0;

    const yearsInterval = function () {
      counterYears++;
      yearsEl.textContent = counterYears;
      counterYears === age.years && clearInterval(increaseYears);
    };

    const monthsInterval = function () {
      counterMonths++;
      monthsEl.textContent = counterMonths;
      counterMonths === age.months && clearInterval(increaseMonths);
    };

    const daysInterval = function () {
      counterDays++;
      daysEl.textContent = counterDays;
      counterDays === age.days && clearInterval(increaseDays);
    };

    const increaseYears = setInterval(yearsInterval, 20);
    const increaseMonths = setInterval(monthsInterval, 40);
    const increaseDays = setInterval(daysInterval, 40);
  }
}

const app = new CalculatorApp();
