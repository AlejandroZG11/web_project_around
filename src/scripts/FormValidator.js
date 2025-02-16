export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._toggleStateOfButton();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleStateOfButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleStateOfButton();
        this._checkInputValidity(inputElement);
      });
    });
  }

  resetForm() {
    this._inputList.forEach((input) => {
      input.value = "";
      this._hideInputError(input);
    });
    this._toggleStateOfButton();
  }

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      // Verificar si inputElement y errorElement existen antes de limpiar errores
      if (inputElement && errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
      }
    });
  }


  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleStateOfButton() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }
}
